const fs = require('fs');

// Load extracted Excel data
const excelData = require('./excel-data.json');

// Helper to convert Excel serial date to readable date
function excelDateToString(serial) {
    if (!serial) return 'N/A';
    if (typeof serial === 'string') return serial;

    // Excel dates start from 1900-01-01
    const utc_days = Math.floor(serial - 25569);
    const date = new Date(utc_days * 86400 * 1000);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
}

// Helper to clean contact number
function cleanContact(contact) {
    if (!contact) return 'N/A';
    // Return first number if multiple
    return String(contact).split('/')[0].split('|')[0].trim();
}

// Transform Excel data to stores.json format
const stores = excelData.map(row => ({
    store_code: row['CODE'],
    store_name: row['STORE NAME'],
    address: (row['ADDRESS'] || 'Address not available').replace(/\n/g, ', ').trim(),
    city: row['CITY'] || 'N/A',
    state: row['STATES'] || 'MAHARASHTRA',
    contact_number: cleanContact(row['CONTACT NO.']),
    since: excelDateToString(row['OPENING DATE'])
}));

// Create final JSON
const output = { stores };

// Write to file
fs.writeFileSync('data/stores.json', JSON.stringify(output, null, 4));

console.log(`✅ Created stores.json with ${stores.length} stores`);
console.log('\nFirst 3 stores preview:');
stores.slice(0, 3).forEach(s => {
    console.log(`\n${s.store_name} (${s.store_code})`);
    console.log(`  📍 ${s.address}`);
    console.log(`  📞 ${s.contact_number}`);
    console.log(`  📅 Since: ${s.since}`);
});
