const playBtn = document.getElementById("playBtn");
const loadingText = document.getElementById("loadingText");
const equalizer = document.getElementById("equalizer");
const nowPlaying = document.getElementById("nowPlaying");
const volumeSlider = document.getElementById("volumeSlider");

const sound = new Howl({
  src: ['https://centova.gr-net.gr/proxy/mustardseed/stream'],
  html5: true,
  volume: 1,
  format: ['mp3']
});

playBtn.addEventListener("click", () => {
  if (sound.playing()) {
    sound.pause();
    playBtn.textContent = "▶ Play Live Radio";
    equalizer.style.visibility = "hidden";
    loadingText.style.display = "none";
  } else {
    loadingText.style.display = "block";
    playBtn.textContent = "⏸ Connecting...";
    sound.play();
  }
});

volumeSlider.addEventListener("input", (e) => {
  sound.volume(e.target.value);
});

sound.on("play", () => {
  loadingText.style.display = "none";
  equalizer.style.visibility = "visible";
  playBtn.textContent = "⏸ Pause";
});

sound.on("loaderror", () => {
  loadingText.textContent = "⚠ Stream error. Try again.";
  playBtn.textContent = "▶ Retry";
});

sound.on("end", () => {
  equalizer.style.visibility = "hidden";
  playBtn.textContent = "▶ Play Live Radio";
});

/* NOW PLAYING METADATA */
sound._sounds[0]._node.addEventListener("loadedmetadata", () => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Mustard Seed Radio",
      artist: "Live Stream"
    });
  }
});

setInterval(() => {
  if (sound._sounds.length > 0) {
    const node = sound._sounds[0]._node;
    const title = node?.icy?.StreamTitle;
    if (title) {
      nowPlaying.textContent = "🎵 Now Playing: " + title;
    }
  }
}, 5000);
