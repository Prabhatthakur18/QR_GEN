// Get store code from URL
const storeCode = window.location.pathname.split('/').pop();

// DOM elements
const loading = document.getElementById('loading');
const verified = document.getElementById('verified');
const notFound = document.getElementById('not-found');

function showState(state) {
    [loading, verified, notFound].forEach(el => el.classList.add('hidden'));
    state.classList.remove('hidden');
}

async function verifyStore() {
    if (!storeCode) {
        document.getElementById('error-msg').textContent = 'No store code provided';
        showState(notFound);
        return;
    }

    try {
        const res = await fetch(`/api/verify/${storeCode}`);
        const data = await res.json();

        if (data.verified) {
            // Store found in database = Verified franchise
            document.getElementById('store-name').textContent = data.store_name;
            document.getElementById('store-address').textContent =
                `${data.address}, ${data.city}, ${data.state}`;
            document.getElementById('store-contact').textContent = data.contact_number;
            document.getElementById('store-contact').href = `tel:${data.contact_number}`;
            document.getElementById('store-since').textContent = data.since;
            document.getElementById('store-since-2').textContent = data.since;
            showState(verified);
        } else {
            // Store NOT found = Not authorized
            document.getElementById('error-msg').textContent = data.message;
            showState(notFound);
        }
    } catch (err) {
        document.getElementById('error-msg').textContent = 'Connection error. Please try again.';
        showState(notFound);
    }
}

// Start verification after animation completes
setTimeout(verifyStore, 2000);
