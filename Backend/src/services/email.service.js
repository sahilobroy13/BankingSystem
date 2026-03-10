require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Generic email sender
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Registration Email
async function sendRegistrationEmail(userEmail, name) {

  const subject = "Welcome to Backend Ledger! 🎉";

  const text = `Hello ${name},

Thank you for registering at Backend Ledger.
We're excited to have you on board!

Best Regards,
Backend Ledger Team
`;

  const html = `
  <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
    <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
      
      <h2 style="color:#333;">Welcome to Backend Ledger 🚀</h2>
      
      <p>Hello <b>${name}</b>,</p>
      
      <p>
        Thank you for registering with <b>Backend Ledger</b>. 
        We are excited to have you as part of our community.
      </p>
      
      <p>
        You can now start using our platform to manage and track your backend operations efficiently.
      </p>

      <hr>

      <p style="color:gray; font-size:14px;">
        Best Regards,<br>
        <b>The Backend Ledger Team</b>
      </p>

    </div>
  </div>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendEmail,
  sendRegistrationEmail
};