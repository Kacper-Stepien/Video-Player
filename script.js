const video = document.getElementById('video');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const timeline = document.getElementById('timeline');
const timestamp = document.getElementById('timestamp');

function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }

    updatePlayIcon();
}

function stopAndRestartVideo() {
    video.currentTime = 0;
    video.play();
    updatePlayIcon();
}

function updatePlayIcon() {
    if (video.paused) {
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
    else {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
    }
}

function updateTimeline() {
    timeline.value = (video.currentTime / video.duration) * 100;
}

function updateTimestamp() {
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
        minutes = '0' + String(minutes);
    }

    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + String(seconds);
    }

    timestamp.innerHTML = `${minutes}:${seconds}`;
}

function setVideoProgress() {
    video.currentTime = (+timeline.value * video.duration) / 100;
}

// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('timeupdate', () => {
    updateTimeline();
    updateTimestamp();
})

playBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopAndRestartVideo);
timeline.addEventListener('change', setVideoProgress);