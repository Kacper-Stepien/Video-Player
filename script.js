'use strict';

const videoSelector = document.getElementById('video-selector');
const videoContainer = document.getElementById('container')
const video = document.getElementById('video');
const menu = document.getElementById('menu');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const timeline = document.getElementById('timeline');
const timestamp = document.getElementById('timestamp');
const volumeBtn = document.getElementById('volume-btn');
const volumeBar = document.getElementById('volume');
const fullScreenBtn = document.getElementById('full-screen-btn');

let loadedVideo = false;    // loadedVideo is false because at the start video tag has no src attribute
let soundLevel = 0.5;       // default sound level - 1 is 100%, 0.5 is 50%

function toggleVideoStatus() {
    if (!loadedVideo)
        return

    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }

    updatePlayIcon();
}

function stopAndRestartVideo() {
    if (!loadedVideo)
        return

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

function loadNewVideo() {
    video.pause();
    setVideoSrcAttribute();
    timeline.value = 0;
    loadedVideo = true;
}

function setVideoSrcAttribute() {
    let movie = videoSelector.files[0];
    let file = movie;
    let url = URL.createObjectURL(file);
    video.src = url;
}

function changeVolume() {
    video.volume = volumeBar.value;
    if (video.volume !== 0) {
        soundLevel = video.volume;
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
    else {
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
}

function toggleFullScreen() {
    const fullscreenElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
    if (fullscreenElement) {
        exitFullscreen();
    } else {
        launchIntoFullscreen(videoContainer);
    }
}

function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else {
        element.classList.toggle('fullscreen');
    }

    video.classList.add('screen-full-size');
    menu.classList.add('menu-full-screen');
    fullScreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }

    video.classList.remove('screen-full-size');
    menu.classList.remove('menu-full-screen');
    fullScreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>'
}

function showMenu() {
    menu.classList.remove('hidden');
    setTimeout(() => {
        menu.classList.add('hidden')
    }, 5000);
}

function toggleSound() {
    if (video.volume === 0) {
        video.volume = soundLevel;
        volumeBar.value = soundLevel;
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
    else {
        video.volume = 0;
        volumeBar.value = 0;
        volumeBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
}

// Event Listeners
videoSelector.addEventListener('click', () => {
    video.pause();
    updatePlayIcon();
});

videoSelector.addEventListener('change', loadNewVideo);

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('timeupdate', () => {
    updateTimeline();
    updateTimestamp();
})

playBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopAndRestartVideo);
timeline.addEventListener('change', setVideoProgress);

volumeBtn.addEventListener('click', toggleSound);
volumeBar.addEventListener('change', changeVolume);
fullScreenBtn.addEventListener('click', toggleFullScreen);

videoContainer.addEventListener('mousemove', showMenu);
videoContainer.addEventListener('click', showMenu);