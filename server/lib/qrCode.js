/*
 * Creates QR codes for users. 
 */
const qrcode = require('qrcode');
const UUID_LEN = 36;
// Creates a qr image when a new user is created. Function returns filepath for image
async function generateQRCode(conjugatedId) {
    
    const userId = conjugatedId.slice(UUID_LEN, conjugatedId.length);
    const filepath = `./files/qrcodes/user${userId}.png`;
    const url = `fastmedinfo.com/first-responder/${conjugatedId}`;
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
