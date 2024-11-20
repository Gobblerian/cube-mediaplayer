const audioPlayer = new Audio();
const whooshEffect = document.getElementById('whooshEffect');
const trackList = document.getElementById('trackList');
const fileInput = document.getElementById('fileInput');
const currentTrack = document.getElementById('currentTrack');
const progressBar = document.getElementById('progress');
const progressBarContainer = document.getElementById('progressBar');
const playPauseBtn = document.getElementById('playPauseBtn');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const dropZone = document.getElementById('dropZone');
const londonClock = document.getElementById('londonClock');

let tracks = [];
let playQueue = [];
let currentTrackIndex = null;
let isPlaying = false;
let fadeDuration = 250;
let whooshDuration = 500;

// Update London Clock
function updateClock() {
    const now = new Date();
    const options = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formatter = new Intl.DateTimeFormat([], options);
    londonClock.textContent = formatter.format(now);
}
setInterval(updateClock, 1000);
updateClock();

// Add Tracks
fileInput.addEventListener('change', () => addTracks(fileInput.files));

function addTracks(files) {
    for (let file of files) {
        const url = URL.createObjectURL(file);
        const track = { name: file.name, url };
        tracks.push(track);
    }
    updateTrackList();
}

function updateTrackList() {
    trackList.innerHTML = '';
    tracks.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('track');

        const trackInfo = document.createElement('h4');
        trackInfo.textContent = track.name;

        const playNextButton = document.createElement('button');
        playNextButton.textContent = 'Play Next';
        playNextButton.addEventListener('click', () => addToQueue(index));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeTrack(index));

        const playFadeButton = document.createElement('button');
        playFadeButton.textContent = 'Fade Play';
        playFadeButton.addEventListener('click', () => playTrackWith
