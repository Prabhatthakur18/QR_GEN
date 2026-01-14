const Jimp = require('jimp');
const QrCode = require('qrcode-reader');
const fs = require('fs');
const path = require('path');

const QR_DIR = path.join(__dirname, 'QR_Codes');

async function decodeQR(imagePath) {
    try {
        const image = await Jimp.read(imagePath);
        const qr = new QrCode();
        
        return new Promise((resolve) => {
            qr.callback = (err, value) => {
                if (err || !value) {
                    resolve({ file: path.basename(imagePath), url: 'DECODE_ERROR' });
                } else {
                    resolve({ file: path.basename(imagePath), url: value.result });
                }
            };
            qr.decode(image.bitmap);
        });
    } catch (e) {
        return { file: path.basename(imagePath), url: 'READ_ERROR' };
    }
}

async function main() {
    const files = fs.readdirSync(QR_DIR).filter(f => f.endsWith('.png'));
    console.log(`Found ${files.length} QR codes\n`);
    
    const results = [];
    for (const file of files) {
        const result = await decodeQR(path.join(QR_DIR, file));
        console.log(`${result.file} → ${result.url}`);
        results.push(result);
    }
    
    // Save results
    fs.writeFileSync('qr-urls.json', JSON.stringify(results, null, 2));
    console.log('\nSaved to qr-urls.json');
}

main();
