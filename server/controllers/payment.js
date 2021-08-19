const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Contest = require('../models/Contest');

const stripeCustomerId = async (userId) => {
  return await User.findById(userId)
    .then((user) => {
      if (user.stripe_id) {
        return user.stripe_id;
      } else {
        return null;
      }
    })
    // check validity of stripe_id from the model
    .then(async (stripe_id) => {
      try {
        const customer = await stripe.customers.retrieve(stripe_id);
        return customer.deleted ? null : stripe_id;
      } catch (err) {
        return null;
      }
    });
};

const createCustomerForPayments = async (userId) => {
  const stripe_id = await stripeCustomerId(userId);
  if (stripe_id) {
    return stripe_id;
  } else {
    const customer = await stripe.customers.create();
    if (customer) {
      const user = await User.findByIdAndUpdate(userId, { stripe_id: customer.id }, { new: true });
      return user.stripe_id;
    } else {
      throw new Error('unable to set up payment intent');
      return null;
    }
  }
};

const createSetupIntent = async (customerId, userId) => {
  const intent = await stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ['card'],
  });
  const user = await User.findByIdAndUpdate(userId, { stripe_intent_id: intent.id }, { new: true });
  return intent;
};

// Checks for setup intent in user document and checks whether it can accept a new payment method
// Creates a setupIntent if none / not usable
const getSetupIntent = async (userId, customerId) => {
  return await User.findById(userId).then(async (user) => {
    if (user.stripe_intent_id) {
      const intent = await stripe.setupIntents.retrieve(user.stripe_intent_id);
      return intent.status === 'requires_payment_method' ? intent : await createSetupIntent(customerId, userId);
    } else {
      return await createSetupIntent(customerId, userId);
    }
  });
};

exports.getSecret = asyncHandler(async (req, res, next) => {
  const customerId = await createCustomerForPayments(req.user.id);
  const intent = await getSetupIntent(req.user.id, customerId);
  if (intent) {
    res.status(200).json({ client_secret: intent.client_secret });
  } else {
    res.status(500);
    throw new Error('unable to retrieve secret');
  }
});

exports.listPaymentMethods = asyncHandler(async (req, res, next) => {
  const customerId = await User.findById(req.user.id).then((user) => {
    return user.stripe_id;
  });
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: 'card',
  });
  if (paymentMethods) {
    res.status(200).json(paymentMethods.data);
  } else {
    res.status(500);
    throw new Error('unable to retrieve list of payment methods');
  }
});

exports.chargeCard = asyncHandler(async (req, res, next) => {
  const customerId = await User.findById(req.user.id).then((user) => {
    return user.stripe_id;
  });
  const { contestId, cardId } = req.body;
  const prizeAmount = await Contest.findById(contestId).then((contest) => {
    return contest.prizeAmount;
  });
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customerId,
    // Stripe unit for USD is in cents
    amount: prizeAmount * 100,
    currency: 'usd',
    payment_method: cardId,
    confirm: true,
  });
  if (paymentIntent) {
    res.status(201).json(paymentIntent);
  } else {
    res.status(500);
    throw new Error('unable to create payment intent');
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
  }
});
