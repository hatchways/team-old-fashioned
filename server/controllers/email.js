const asyncHandler = require('express-async-handler');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
