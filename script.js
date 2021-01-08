const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const durationEle = document.getElementById('duration');
const currentTimeEle = document.getElementById('current-time');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Front Row (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
];

let isPlaying = false;

function playMusic() {
    isPlaying = true;
    audio.play();
    playBtn.setAttribute('title', 'Pause');
    playBtn.classList.replace('fa-play', 'fa-pause');
}

function pauseMucsic() {
    isPlaying = false;
    audio.pause();
    playBtn.setAttribute('title', 'Play');
    playBtn.classList.replace('fa-pause', 'fa-play');

}

let currentIndex = 0;

function nextSong() {
    currentIndex++;
    if (currentIndex > songs.length - 1) {
        currentIndex = 0;
    }
    loadSong(songs[currentIndex]);
    playMusic();
}

function prevSong() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = songs.length - 1;
    }
    loadSong(songs[currentIndex]);
    playMusic();
}

function updateProgressbar(e) {
    if (isPlaying) {
        const { currentTime, duration } = e.target;
        const progressPercent = currentTime / duration * 100;
        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        if (durationSeconds) {
            durationEle.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }

        if (currentTimeSeconds) {
            currentTimeEle.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
        }

    }
}


function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audio;
    audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
    isPlaying ? pauseMucsic() : playMusic()
});

nextBtn.addEventListener('click', nextSong);

prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgressbar);
audio.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgressBar);

function loadSong(song) {
    title.innerText = song.displayName;
    artist.textContent = song.artist;
    audio.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`
}

loadSong(songs[currentIndex]);