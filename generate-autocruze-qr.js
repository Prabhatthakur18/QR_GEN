const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// AutoCruze stores that use the alternate template
const AUTOCRUZE_STORES = [
    { code: 'FGM168', name: 'G M GALAXY CAR DECOR' },
    { code: 'FSSD204', name: 'SSD CAR' },
    { code: 'FMA086', name: 'MAYUR AUTO WORLD' },
    { code: 'FMG167', name: 'MY GOVINDA CAR PLAZA' }
];

// Base URL for Vercel deployment
const BASE_URL = process.env.BASE_URL || 'https://qr-gen-autoform.vercel.app';

// Output directory
const OUTPUT_DIR = path.join(__dirname, 'QR_Codes_AutoCruze');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateQR(store) {
    // AutoCruze stores use the /alt/ template
    const url = `${BASE_URL}/alt/verify/${store.code}`;
    const outputPath = path.join(OUTPUT_DIR, `${store.name}-${store.code}.png`);

    await QRCode.toFile(outputPath, url, {
        width: 400,
        margin: 2,
        errorCorrectionLevel: 'H'
    });

    console.log(`✅ Generated: ${store.name}`);
    console.log(`   Code: ${store.code}`);
    console.log(`   URL: ${url}`);
    console.log(`   File: ${outputPath}\n`);
}

async function main() {
    console.log('\n🚀 AutoCruze QR Code Generator\n');
    console.log(`Base URL: ${BASE_URL}`);
    console.log(`Template: /alt/ (AutoCruze)\n`);
    console.log('-----------------------------------\n');

    for (const store of AUTOCRUZE_STORES) {
        await generateQR(store);
    }

    console.log(`📁 QR codes saved to: ${OUTPUT_DIR}`);
}

main();
