const fs = require('fs');
const storesData = require('./data/stores.json');

const autoCruzeCodes = ['FGM168', 'FSSD204', 'FMA086', 'FMG167'];

let mdContent = '# Generated QR Codes List\n\n';
mdContent += '| Name | Code | Store (Brand) | Link |\n';
mdContent += '| :--- | :--- | :--- | :--- |\n';

storesData.stores.forEach(store => {
    const isAutoCruze = autoCruzeCodes.includes(store.store_code);
    const brand = isAutoCruze ? 'AutoCruze' : 'Autoform';

    // AutoCruze uses the new domain, Autoform uses the original domain
    // Both use the clean /verify/ path now
    const domain = isAutoCruze
        ? 'https://qr-gen-autocruze.vercel.app'
        : 'https://qr-gen-autoform.vercel.app';

    const link = isAutoCruze
        ? `${domain}/alt/verify/${store.store_code}`
        : `${domain}/verify/${store.store_code}`;

    mdContent += `| ${store.store_name} | ${store.store_code} | ${brand} | [Link](${link}) |\n`;
});

fs.writeFileSync('qr_codes_list.md', mdContent);
console.log('✅ Generated qr_codes_list.md');
