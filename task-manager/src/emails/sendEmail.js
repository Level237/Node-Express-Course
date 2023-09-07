const transport=require('./config/nodemailer')

const sendMessage=(email,name)=>{
    const mailOptions = {
        from: 'bramslevel@gmail.com',
        to: email,
        subject: 'Thanks to have join us',
        text: `Welcome ${name} to my website`,
      };

      sendEmail(mailOptions)
}

const sendEmail=(mailOption)=>{
    transport.sendMail(mailOption, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent successfully!');
        }
      });
}

module.exports={
    sendMessage
}