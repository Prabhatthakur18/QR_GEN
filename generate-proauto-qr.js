const QRCode = require('qrcode');
const path = require('path');

// PROAUTO SOLUTIONS - new code
const store = {
    code: 'FPAS365',
    name: 'PROAUTO SOLUTIONS'
};

const BASE_URL = 'https://qr-gen-autoform.vercel.app';
const url = `${BASE_URL}/verify/${store.code}`;
const outputPath = path.join(__dirname, 'QR_Codes', `${store.name}-${store.code}.png`);

async function generate() {
    await QRCode.toFile(outputPath, url, {
        width: 400,
        margin: 2,
        errorCorrectionLevel: 'H'
    });

    console.log('\n✅ PROAUTO SOLUTIONS QR Generated!');
    console.log(`   Store: ${store.name}`);
    console.log(`   Code: ${store.code}`);
    console.log(`   URL: ${url}`);
    console.log(`   File: ${outputPath}\n`);
}

generate();
