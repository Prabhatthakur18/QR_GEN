const fs = require('fs');
const path = require('path');

const QR_DIR = path.join(__dirname, 'QR_Codes');
const files = fs.readdirSync(QR_DIR).filter(f => f.endsWith('.png'));

console.log(`Found ${files.length} QR code files\n`);
console.log('Store Name | Store Code');
console.log('-----------|------------');

const stores = files.map(file => {
    const name = file.replace('.png', '');
    // Pattern: "STORE NAME-STORECODE" or just "STORE NAME"
    const parts = name.split('-');

    if (parts.length >= 2) {
        const storeCode = parts[parts.length - 1]; // Last part is code
        const storeName = parts.slice(0, -1).join('-'); // Rest is name
        return { storeName, storeCode, file };
    } else {
        return { storeName: name, storeCode: 'UNKNOWN', file };
    }
});

stores.forEach(s => {
    console.log(`${s.storeName} | ${s.storeCode}`);
});

// Save as JSON
fs.writeFileSync('stores-extracted.json', JSON.stringify(stores, null, 2));
console.log('\n\nSaved to stores-extracted.json');
