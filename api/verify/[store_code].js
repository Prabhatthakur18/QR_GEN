// Vercel Serverless API - Dynamic JSON Store Verification
import { readFileSync } from 'fs';
import { join } from 'path';

// Read stores from JSON file
function getStores() {
    const filePath = join(process.cwd(), 'data', 'stores.json');
    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    return data.stores;
}

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { store_code } = req.query;

    if (!store_code) {
        return res.status(400).json({
            verified: false,
            message: 'Store code is required'
        });
    }

    try {
        const stores = getStores();
        const store = stores.find(s =>
            s.store_code.toUpperCase() === store_code.toUpperCase()
        );

        if (!store) {
            return res.status(404).json({
                verified: false,
                message: 'This store is NOT an authorized Autoform India Pvt Ltd franchise'
            });
        }

        return res.status(200).json({
            verified: true,
            store_name: store.store_name,
            address: store.address,
            city: store.city,
            state: store.state,
            contact_number: store.contact_number,
            since: store.since
        });
    } catch (error) {
        return res.status(500).json({
            verified: false,
            message: 'Server error. Please try again.'
        });
    }
}
