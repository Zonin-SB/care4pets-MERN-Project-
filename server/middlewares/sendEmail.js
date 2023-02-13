const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_EMAIL_TEST_PAS,
  },
  tls: { rejectUnauthorized: false },
});

module.exports = {
  SendOTP: (otp, tomail, name) => {
    return new Promise((resolve, reject) => {
      try {
        const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: tomail,
          subject: 'care4pets login -OTP',
          html: `<h2>Hello ${name} ,<h2/>  <p><h3>Greetings from care4pets</h3> </p><h4><p>
                    Your 4 digit One Time Password is<h2> <b>${otp} </b></h2>This code <b> expires in 1 hour</b>.. Don't share this OTP. 
                    </p> </h4>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            // console.log(`Email sent: ${info.response}`);
            resolve(info.response);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
