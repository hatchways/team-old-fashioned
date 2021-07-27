const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Contest = require('../models/Contest');

// Create parameters used for API testing purposes only
exports.test = asyncHandler(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'cad',
    payment_method_types: ['card'],
  });
  if (paymentIntent) {
    res.status(201).json(paymentIntent);
  } else {
    res.status(500);
    throw new Error('unable to create payment intent');
  }
});

exports.getPublicKey = (req, res) => {
  res.json({ public_key: process.env.STRIPE_PUBLIC_KEY });
};

exports.setupUserForPayments = asyncHandler(async (req, res, next) => {
  const customer = await stripe.customers.create();

  const intent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ['card'],
  });
  if (intent) {
    const user = await User.findByIdAndUpdate(req.user.id, { stripe_id: customer.id, stripe_intent_id: intent.id });
    res.status(201).json({ customer_id: intent.customer, intent_id: intent.id, client_secret: intent.client_secret });
  } else {
    res.status(500);
    throw new Error('unable to set up payment intent');
  }
});

exports.getSecret = asyncHandler(async (req, res, next) => {
  const intent_id = await User.findById(req.user.id).then((user) => {
    return user.stripe_intent_id;
  });
  const intent = await stripe.setupIntents.retrieve(intent_id);
  if (intent) {
    res.status(201).json({ client_secret: intent.client_secret });
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
    res.status(201).json(paymentMethods.data);
  } else {
    res.status(500);
    throw new Error('unable to retrieve list of payment methods');
  }
});

exports.chargeCard = asyncHandler(async (req, res, next) => {
  const customerId = await User.findById(req.user.id).then((user) => {
    return user.stripe_id;
  });
  console.log(customerId);
  const { contestId, cardId } = req.body;
  const prizeAmount = await Contest.findById(contestId).then((contest) => {
    return contest.prizeAmount;
  });
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customerId,
    amount: prizeAmount,
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
    console.log('PI retrieved: ', paymentIntentRetrieved.id);
  }
});
