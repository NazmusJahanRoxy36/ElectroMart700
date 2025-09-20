
const dotenv = require('dotenv');
dotenv.config();



const nodemailer = require('nodemailer');





const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Your Gmail from .env
        pass: process.env.EMAIL_PASS,  // Your Gmail App Password from .env
      },
    });

    const mailOptions = {
      from: `"ElectroMart700" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to:', to);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    
  }
};

module.exports = sendEmail;
