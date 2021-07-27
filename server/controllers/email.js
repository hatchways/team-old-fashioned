const asyncHandler = require('express-async-handler');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = asyncHandler(async (req, res, next) => {
  const { to, subject, html } = req.body;
  const msg = {
    to,
    from: 'eric.silva.hatchways@gmail.com',
    subject,
    html,
  };
  try {
    const email = await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json(error);
  }
});
