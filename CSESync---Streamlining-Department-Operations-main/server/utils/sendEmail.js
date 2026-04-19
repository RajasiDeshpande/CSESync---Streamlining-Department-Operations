const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, text }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials missing: EMAIL_USER or EMAIL_PASS not set');
    throw new Error('Email service not configured. Contact administrator.');
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log('Email sent successfully:', info.response);
    return info;
  } catch (emailError) {
    console.error('Email send error:', emailError.message);
    throw new Error(`Email send failed: ${emailError.message}`);
  }
};

module.exports = sendEmail;
