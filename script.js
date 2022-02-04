const musicImg = document.querySelector("img");
const musicTitle = document.getElementById("title");
const musicArtist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progressCurrentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("perv");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// my music

let currentSongIndex = 0;

let totalTime = 0;

const songs = [
  {
    name: "song-1",
    displayName: "Hinata vs Neji",
    artist: "Naruto",
  },
  {
    name: "song-2",
    displayName: "Grief And Sorrow",
    artist: "Naruto",
  },
  {
    name: "song-3",
    displayName: "Darkness",
    artist: "Naruto",
  },
  {
    name: "jacinto-3",
    displayName: "Electronic Chill Machine",
    artist: "jacinto",
  },
];

let isPlaying = false;

function pauseMusic() {
  music.pause();
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
}

function playMusic() {
  music.play();
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

function loadSong(song) {
  musicTitle.textContent = song.displayName;
  musicImg.src = `img/${song.name}.jpg`;
  music.src = `music/${song.name}.mp4`;
  musicArtist.textContent = song.artist;
}

// on load

loadSong(songs[currentSongIndex]);

// play next

function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  isPlaying ? music.play() : music.pause();
}

nextBtn.addEventListener("click", () => {
  playNext();
});

// play last

function playPrev() {
  currentSongIndex = currentSongIndex - 1;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(songs[currentSongIndex]);
  isPlaying ? music.play() : music.pause();
}

prevBtn.addEventListener("click", () => {
  playPrev();
});

// progress

function updateProgressBar(event) {
  if (isPlaying) {
    const currentTime = event.srcElement.currentTime;
    totalTime = event.srcElement.duration;
    if (currentTime && totalTime) {
      const timePercent = (currentTime / totalTime) * 100;
      progress.style.width = `${timePercent}%`;
      const currentTimeSec =
        (currentTime % 60 < 10 ? "0" : "") + `${Math.floor(currentTime % 60)}`;
      const currentTimeMin = Math.floor(currentTime / 60);
      progressCurrentTime.textContent = `${currentTimeMin}:${currentTimeSec}`;
      const durationSec =
        (totalTime % 60 < 10 ? "0" : "") + `${Math.floor(totalTime % 60)}`;
      const durationMin = Math.floor(totalTime / 60);
      duration.textContent = `${durationMin}:${durationSec}`;
    }
  }
}

music.addEventListener("timeupdate", updateProgressBar);

// progress bar moving the song forward and backward

function setProgressBar(e) {
  const width = this.clientWidth;
  const position = e.offsetX;
  let percent = position / width;
  music.currentTime = percent * totalTime;
}

progressContainer.addEventListener("click", setProgressBar);

// go to next song

music.addEventListener("ended", playNext);
