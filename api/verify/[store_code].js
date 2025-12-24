// Vercel Serverless API - Store Verification
const stores = [
    {
        "store_code": "RP-EBO",
        "store_name": "RP Auto World",
        "address": "Plot No.13, Near Shantigopal Hospital, Judges Enclave, Ahinsa Khand 2, Indrapuram, Ghaziabad",
        "city": "Ghaziabad",
        "state": "Uttar Pradesh",
        "contact_number": "8800354354",
        "since": "31-May-2016"
    },
    {
        "store_code": "AG001",
        "store_name": "Autoform India - Karol Bagh",
        "address": "Shop No. 15, Gaffar Market, Karol Bagh",
        "city": "New Delhi",
        "state": "Delhi",
        "contact_number": "9876543210",
        "since": "2024"
    },
    {
        "store_code": "AG002",
        "store_name": "Autoform India - Bandra",
        "address": "101, Linking Road, Bandra West",
        "city": "Mumbai",
        "state": "Maharashtra",
        "contact_number": "9123456789",
        "since": "2024"
    }
];

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { store_code } = req.query;

    if (!store_code) {
        return res.status(400).json({ verified: false, message: 'Store code required' });
    }

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
}
