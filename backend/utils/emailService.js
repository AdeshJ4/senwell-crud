const nodemailer = require('nodemailer');

const emailService = {
  sendEmail: async (to, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vidlymoviesapplication@gmail.com',
          pass: 'paop zyiv iila wqty',
        },
      });

      const mailOptions = {
        from: 'vidlymoviesapplication@gmail.com',
        to,
        subject,
        text,
      };

      const result = await transporter.sendMail(mailOptions);

      console.log('Email sent:', result);

    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },
};

module.exports = emailService;


  


