const loadingText = document.getElementById("loadingText");
const equalizer = document.getElementById("equalizer");
const btn = document.getElementById("playBtn");

const sound = new Howl({
  src: ['https://centova.gr-net.gr/proxy/mustardseed/stream'],
  html5: true,
  volume: 1.0
});

btn.addEventListener("click", () => {
  if (sound.playing()) {
    sound.pause();
    btn.textContent = "▶ Πάτα να γίνει χαμός!";
    equalizer.style.visibility = "hidden";
    loadingText.style.display = "none";
  } else {
    loadingText.style.display = "block";
    btn.textContent = "⏸ Παύση";
    sound.play();
  }
});

sound.on('play', () => {
  loadingText.style.display = "none";
  equalizer.style.visibility = "visible";
  btn.textContent = "⏸ Παύση";
});

sound.on('loaderror', () => {
  loadingText.textContent = "⚠ «Δεν ήταν γραφτό. Πάτα ξανά.»";
  btn.textContent = "▶ «Δεν ήταν γραφτό. Πάτα ξανά.»";
});

sound.on('end', () => {
  equalizer.style.visibility = "hidden";
  btn.textContent = "▶ Πάτα να γίνει χαμός!";
});

const toggleDescBtn = document.getElementById("toggleDesc");
const description = document.querySelector(".description");

toggleDescBtn.addEventListener("click", () => {
  description.classList.toggle("open");

  toggleDescBtn.textContent = description.classList.contains("open")
    ? "❌ Κλείσε την περιγραφή"
    : "ℹ️ Τι είναι το Mustard Seed Radio;";
});
