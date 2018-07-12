const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.gmail,
      pass: process.env.gmailPass
    }
  });

exports.sendWelcomeMail = (user)=>{
    const data = {
        from: 'Kiubo? 👻 <fixtergeek@gmail.com>',
        to: user.email, 
        subject: 'Probando esta', 
        text: `Hola ${user.username} Bienvenido a nuestra ironApp`,
        //html: '<b>Awesome Message</b>'
      }
    transporter.sendMail(data)
      .then(info => console.log(info))
      .catch(error => console.log(error))
}