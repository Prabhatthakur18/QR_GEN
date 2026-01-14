const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('Copy of MAHARASHTRA (Mr. SUBRAT BISOYI)(1).xls');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

console.log(`Found ${data.length} rows\n`);

// Print all data nicely
data.forEach((row, i) => {
    console.log(`\n--- Store ${i + 1} ---`);
    Object.entries(row).forEach(([key, val]) => {
        console.log(`  ${key}: ${val}`);
    });
});

// Save as JSON
fs.writeFileSync('excel-data.json', JSON.stringify(data, null, 2));
console.log('\n\nSaved to excel-data.json');
