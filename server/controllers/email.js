const asyncHandler = require('express-async-handler');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

exports.sendEmail = asyncHandler(async (req, res, next) => {
  const { to, subject, text, html } = req.body;
  const msg = {
    to,
    from: process.env.SENDGRID_VERIFIED_EMAIL,
    subject,
    text,
    html,
    isMultiple: Array.isArray(to),
  };
  try {
    const email = await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

exports.sendResetLink = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = generateToken(user._id);
      const link = `${req.protocol}://${req.hostname}:3000/email/reset-password/${token}`;

      const data = {
        to: email, // Change to your recipient
        from: process.env.SENDGRID_VERIFIED_EMAIL, // Change to your verified sender
        subject: 'Best To Do password reset',
        html: `<div>Click the link below to reset your password</div><br/><div>${link}</div>`,
      };

      sgMail
        .send(data)
        .then(() => {
          return res
            .status(200)
            .json({ success: { message: 'password reset link has been send to your email address.', token: token } });
        })
        .catch((error) => {
          res.status(500).json(error);
        });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
