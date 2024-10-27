// emailSender.js
const nodemailer = require('nodemailer');

/**
 * Sends an email using Gmail SMTP
 * @param {string} sender - Sender email address
 * @param {string} receiver - Receiver email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content
 * @returns {Promise} - Returns promise that resolves with the transporter
 */
const sendMail = async ( sender2 , receiver, subject, text, html) => {
  // Input validation
  let sender = "WEBHELP"
  console.log(
    receiver, subject, text, html
  );
  if (!receiver || !subject || (!text)) {
    throw new Error('Missing required parameters');
  }

  // Verify environment variables
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Missing Gmail credentials in environment variables');
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email message configuration
    const message = {
      from: sender,
      to: Array.isArray(receiver) ? receiver : [receiver],
      subject: subject,
      text: text,
      html: html,
    };

    // Send email
    const info = await transporter.sendMail(message);
    console.log('Email sent successfully:', info.messageId);
    return info;

  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw to handle it in the calling function
  }
};

module.exports = sendMail;