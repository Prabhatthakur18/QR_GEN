// Get store code from URL
const storeCode = window.location.pathname.split('/').pop();

// DOM elements
const loading = document.getElementById('loading');
const verified = document.getElementById('verified');
const notVerified = document.getElementById('not-verified');
const error = document.getElementById('error');

function showState(state) {
    [loading, verified, notVerified, error].forEach(el => el.classList.add('hidden'));
    state.classList.remove('hidden');
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
}

async function verifyStore() {
    if (!storeCode) {
        document.getElementById('error-msg').textContent = 'No store code provided';
        showState(error);
        return;
    }

    try {
        const res = await fetch(`/api/verify/${storeCode}`);
        const data = await res.json();

        if (!data.found) {
            document.getElementById('error-msg').textContent = data.message;
            showState(error);
        } else if (!data.verified) {
            document.getElementById('warning-msg').textContent = data.message;
            showState(notVerified);
        } else {
            document.getElementById('store-name').textContent = data.store_name;
            document.getElementById('store-address').textContent =
                `${data.address}, ${data.city}, ${data.state}`;
            document.getElementById('store-contact').textContent = data.contact_number;
            document.getElementById('store-contact').href = `tel:${data.contact_number}`;
            document.getElementById('store-updated').textContent = formatDate(data.updated_at);
            showState(verified);
        }
    } catch (err) {
        document.getElementById('error-msg').textContent = 'Connection error. Please try again.';
        showState(error);
    }
}

// Start verification after brief delay
setTimeout(verifyStore, 800);
