const nodemailer=require('nodemailer')
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "97c99a8197aa4d",
      pass: "6855a0bc7d1103"
    }
  });

module.exports=transport