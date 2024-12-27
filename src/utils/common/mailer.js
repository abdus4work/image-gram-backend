import nodemailer from 'nodemailer';

import configs from '../../configs/serverConfig.js';

// Create a reusable transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: configs.EMAIL_USER,
    pass: configs.EMAIL_PASS
  }
});

const sendMail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: configs.EMAIL_USER,
      to,
      subject,
      text,
      ...(html && { html })
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendMail;
