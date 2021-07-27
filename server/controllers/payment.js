const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

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
  res.json(process.env.STRIPE_PUBLIC_KEY);
};

// Possibly triggered when client first creates a contest
// TODO: Add intentID to user model
exports.setupPaymentIntent = asyncHandler(async (req, res, next) => {
  const customer = await stripe.customers.create();
  const user = await User.findOneAndUpdate({ _id: req.user.id }, { stripe_id: customer.id });
  const intent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ['card'],
  });
  if (intent) {
    res.status(201).json({ customer_id: intent.customer, intent_id: intent.id, client_secret: intent.client_secret });
  } else {
    res.status(500);
    throw new Error('unable to set up payment intent');
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
  const customerId = await User.findOne(_id === req.user.id).then((user) => {
    return user.stripe_customer_id;
  });
  const { prizeAmount, cardId } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customerId,
    amount: prizeAmount,
    currency: 'usd',
    payment_method: cardId,
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
