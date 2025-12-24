const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load stores data
const getStores = () => {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'stores.json'), 'utf8');
    return JSON.parse(data).stores;
};

// API: Verify store
// Logic: If store code exists in database = Verified franchise
//        If store code NOT found = Not authorized
app.get('/api/verify/:store_code', (req, res) => {
    const { store_code } = req.params;
    const stores = getStores();

    const store = stores.find(s =>
        s.store_code.toUpperCase() === store_code.toUpperCase()
    );

    if (!store) {
        // Store code not in our database = NOT an authorized franchise
        return res.status(404).json({
            verified: false,
            message: 'This store is NOT an authorized Autoform India Pvt Ltd franchise'
        });
    }

    // Store found in database = Verified franchise
    return res.status(200).json({
        verified: true,
        store_name: store.store_name,
        address: store.address,
        city: store.city,
        state: store.state,
        contact_number: store.contact_number,
        since: store.since
    });
});

// Serve verification page
app.get('/verify/:store_code', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📱 Test: http://localhost:${PORT}/verify/RP-EBO`);
});
