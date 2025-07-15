// Define the playlist. Array of song objects
const songs = [
    { title: "Memories of dawn", src: "songs/dawn.mp3" },
    { title: "Love is in the air", src: "songs/love.mp3" },
    { title: "Roses and thorns", src: "songs/roses.mp3" },
    { title: "Zen and present", src: "songs/zen.mp3" },
];

// Select the playlist container
const playlistElement = document.getElementById("playlist");

// Loop through songs and add each as a list item to the playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");  // Create list element
  li.textContent = song.title;               // Set the text inside 
  li.setAttribute("data-index", index);     // Store index as attribute 
  playlistElement.appendChild(li);           // Add <li> to the playlist <ul>
});

// constants that will make the music player actually play the music
// also we need to make sure that by clicking the title the song starts playing.

const audioPlayer = document.getElementById("audioPlayer");
const songTitle = document.getElementById("songTitle");

// starting at 0 it tracks which song is loaded or playing

let currentSongIndex = 0;

// I created a function that will update the changes in audio source and the title display

function loadSong(index){ 
  const song = songs[index];
  audioPlayer.src = song.src;          // fixed typo here from scr to src
  songTitle.textContent = song.title;  // fixed from songTitle to song.title
}

// Load the first song when the page loads
loadSong(currentSongIndex);

const playPauseBtn = document.getElementById("playPauseBtn");

function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "Play";
  }
}

playPauseBtn.addEventListener("click", togglePlayPause);

// getting by id each I create the functions. I check if the audio is paused. We add the "click" as well

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function playNextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;  // Loop back to first song
  }
  loadSong(currentSongIndex);
  audioPlayer.play();
  playPauseBtn.textContent = "Pause";
}

function playPrevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;  // Loop to last song
  }
  loadSong(currentSongIndex);
  audioPlayer.play();
  playPauseBtn.textContent = "Pause";
}

nextBtn.addEventListener("click", playNextSong);
prevBtn.addEventListener("click", playPrevSong);

// event for clicking the titles.

playlistElement.addEventListener("click", (event) => {
  if (event.target && event.target.nodeName === "LI") {
    const index = Number(event.target.getAttribute("data-index"));
    currentSongIndex = index;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
  }
});



// xtra

function updateActiveSong() {
    const items = playlistElement.querySelectorAll("li");
    items.forEach((item, i) => {
      if (i === currentSongIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
  
  // Call after loading a song
  function loadSong(index){ 
    const song = songs[index];
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    updateActiveSong();
  }
  