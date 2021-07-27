const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// To can be a string or string[]
// string[] will seperate emails to each recipient
const sendEmail = async ({ to, subject, text, html }) => {
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
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = sendEmail;
