const nodeMailer = require('nodemailer');
exports.sendEmail = async (options) => {
    
    // const transporter = nodeMailer.createTransport({

    //     host: process.env.SMPT_HOST,
    //     port: process.env.SMPT_PORT,
    //     auth: {
    //         user: process.env.SMPT_MAIL,
    //         pass: process.env.SMPT_PASSWORD,
    //     },
    //     service: process.env.SMPT_SERVICE,
    // });

    const transporter = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "843d55d2f40e8d",
          pass: "cf85dbc37eda7f"
        }
      });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message, 
    }

    await transporter.sendMail(mailOptions);
}