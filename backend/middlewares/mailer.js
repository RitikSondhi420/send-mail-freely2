const nodemailer = require('nodemailer');

const sendMail = async (sender, receiver, subject, text, html) => {
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.NODEMAILERUSER,
              pass: process.env.NODEMAILERPASS,
            },
          });

          var message = {
            from: sender,
            to: [receiver],
            subject: subject,
            // text: text,
            html: html,
          };

        await transporter.sendMail(message, (error, info) => {
          if (error) {
            console.error("Error sending email: ", error);
          } else {
            console.log("Email sent: ", info.response);
          }
        });
        return transporter;
    }catch(err){
        console.error(err)
    }
}

module.exports = sendMail;