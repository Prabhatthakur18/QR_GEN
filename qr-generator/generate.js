const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, 'output');

// Load stores
const storesData = require('../data/stores.json');
const stores = storesData.stores;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateQR(storeCode) {
    const store = stores.find(s => s.store_code.toUpperCase() === storeCode.toUpperCase());

    if (!store) {
        console.log(`❌ Store not found: ${storeCode}`);
        return false;
    }

    const url = `${BASE_URL}/verify/${store.store_code}`;
    const outputPath = path.join(OUTPUT_DIR, `${store.store_code}.png`);

    await QRCode.toFile(outputPath, url, {
        width: 400,
        margin: 2,
        errorCorrectionLevel: 'H'
    });

    console.log(`✅ ${store.store_code}.png → ${store.store_name}`);
    console.log(`   URL: ${url}\n`);
    return true;
}

async function main() {
    console.log(`\n🚀 Antigravity QR Generator`);
    console.log(`Base URL: ${BASE_URL}\n`);

    const args = process.argv.slice(2);

    if (args.length > 0) {
        for (const code of args) await generateQR(code);
    } else {
        for (const store of stores) await generateQR(store.store_code);
    }

    console.log(`📁 Output: ${OUTPUT_DIR}`);
}

main();
