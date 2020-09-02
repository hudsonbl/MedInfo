const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { encryptHash, decryptHash } = require('./replaceChar');

async function forgottenPasswordEmail(email) {
    const key = email.split('@');
    let encryption = await bcrypt.hash(
        key[1],
        3
    );
  
    encryption = encryptHash(encryption);
    // Create transporter ob
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
      console.log("Key:", key[1]);
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"FastMedInfo 👻" <BlakeHudsonApps@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "FastMedInfo Reset Password ✔", // Subject line
        html: `Verification Code: ${encryption}`,
      });
  
      console.log("Sending Email: ", info);
}
exports.forgottenPasswordEmail = forgottenPasswordEmail;

async function verifyResetCode(code, email){
  const key = email.split('@');
  let decryption = decryptHash(code);
 
  const verifiedUser = await bcrypt.compare(key[1], decryption);
  return verifiedUser;
}
exports.verifyResetCode = verifyResetCode;