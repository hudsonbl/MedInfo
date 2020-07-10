/*
 * Creates QR codes for users. 
 */
const qrcode = require('qrcode');

function generateQRCode(userId) {
    const filepath = `./files/qrcodes/user${userId}.png`;
    const url = `http://192.168.1.12:3000/first-responder/${userId}`;
    qrcode.toFile(filepath, url, {
        color: {
			dark: '#000',
			light: '#FFF'
		}
	}, function (err) {
		if (err) {console.log('done: ', err); throw err}
	    
    });
    
    return filepath;
}
exports.generateQRCode = generateQRCode;