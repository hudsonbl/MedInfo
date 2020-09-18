const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { encryptHash } = require('./replaceChar');

async function sendVerificationEmail(body) {
    const key = body.email.split('@');
    let encryption = await bcrypt.hash(
        key[0],
        10
    );
    console.log("Encrypt Len: ", encryption);
    let newencryption = encryptHash(encryption)
    console.log("Encrypt Len: ", newencryption);
    const url = `fastmedinfo.com/login/confirmation/${newencryption}`;
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER, // generated ethereal user
        pass: process.env.GMAIL_PASS,
      },
    });
    console.log("Key:", key[0]);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fast MedInfo 👻" <BlakeHudsonApps@gmail.com>', // sender address
      to: `${body.email}`, // list of receivers
      subject: "FastMedInfo Verification Email ✔", // Subject line
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    });

    console.log("Sending Email: ", info);
}

exports.sendVerificationEmail = sendVerificationEmail;