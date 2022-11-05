// Htmldagi elementlarni chaqirib olamiz
//================ 1 =============
const btnPlay = document.querySelector("#btn-play");
const btnPlayIcon = document.querySelector("#btn-play-icon");
const btnRepeat = document.querySelector("#btn-repeat");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnVolume = document.querySelector("#btn-volume");
const btnVolumeIcon = document.querySelector("#btn-volume i");
const playerVolume = document.querySelector("#player-volume");
const songName = document.querySelector("#song-name");
const songAuthor = document.querySelector("#song-author");
const playerCurrentTime = document.querySelector("#player-current-time");
const playerDuration = document.querySelector("#player-duration");
const playerProgress = document.querySelector("#player-progress");
const audioPlayer = document.querySelector("#audio-player");

let currentSong = 0;
let repeatSong = false;

// data yaratib olamiz
// =========================== 2==========================
const songs = [
    {
        name: "Javaohir Lukmanov",
        author: "Unknown",
        path: "./Audio/Cendere(275.Bölüm).mp3"
    },
    {
        name: "Saydullayev DilmurodjonBek",
        author: "Unknown",
        path: "./Audio/Gökhan_Kırdar_Kurtlar_Vadisi_Pusu.mp3"
    },
    {
        name: "Javaohir Lukmanov",
        author: "Unknown",
        path: "./Audio/KURTLAR VADS PUSU MZK REMX - AZER BASS MUSC ( NE LroOQOw0kXE.m4a"
    },
    {
        name: "Saydullayev DilmurodjonBek",
        author: "Unknown",
        path: "./Audio/Kurtlar Vadisi Pusu – Oldum De Uyandim ( San Rmx 1 ).mp3"
    },
    {
        name: "Javaohir Lukmanov",
        author: "Unknown",
        path: "./Audio/Kurtlar_Vadisi_Pusu_–_Dayan_Kalbim_S.mp3"
    },
    {
        name: "Saydullayev DilmurodjonBek",
        author: "Unknown",
        path: "./Audio/Kurtlar_Vadisi_Pusu_–_Memati_Öldümde_Uya.mp3"
    },
]

// eng oxirgi qilinadiga ishlarimiz
btnPlay.addEventListener("click", () => togglePlaySong());
btnPrev.addEventListener("click", () => changeSong(false));
btnNext.addEventListener("click", () => changeSong());
btnRepeat.addEventListener("click", () => toggleRepeatSong());
playerVolume.addEventListener("input", () => changeVolume());
playerProgress.addEventListener("input", () => changeTime());
audioPlayer.addEventListener("timeupdate", () => timeUpdate());
audioPlayer.addEventListener("ended", () => ended());

// ========================== 3 =======================
const togglePlaySong = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    btnPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
  } else {
    audioPlayer.pause();
    btnPlayIcon.classList.replace("bi-pause-fill", "bi-play-fill");
  }
};
//============================= 4 ===========================
const changeSong = (next = true) => {
  if (next && currentSong < songs.length - 1) {
    currentSong++;
  } else if (!next && currentSong > 0) {
    currentSong--;
  } else {
    return;
  }

  updatePlayer();
  togglePlaySong();
};
//  ================================ 5 =====================
const updatePlayer = () => {
  const song = songs[currentSong];

  songName.innerHTML = song.name;
  songAuthor.innerHTML = song.author;
  audioPlayer.src = song.path;
  playerProgress.value = audioPlayer.currentTime;
};
/// ====================== 6 ==============================
const toggleRepeatSong = () => {
  repeatSong = !repeatSong;
  btnRepeat.classList.toggle("btn-activated");
};
// ======================== 7 ================================
const timeUpdate = () => {
  const { currentTime, duration } = audioPlayer;

  if (isNaN(duration)) return;

  playerDuration.innerHTML = formatSecondsToMinutes(duration);
  playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
  playerProgress.max = duration;
  playerProgress.value = currentTime;
};
// ============================ 8 =============================
const changeVolume = () => {
  const { value } = playerVolume;

  audioPlayer.volume = value;

  if (value == 0) {
    btnVolumeIcon.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
  } else {
    btnVolumeIcon.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
  }
};
//  ============================== 9 ==========================
const changeTime = () => {
  audioPlayer.currentTime = playerProgress.value;
};

const formatSecondsToMinutes = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

const ended = () => {
  repeatSong ? togglePlaySong() : changeSong(true);
};

window.onload = () => {
  updatePlayer();
};
