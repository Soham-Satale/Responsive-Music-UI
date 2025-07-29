$(document).ready(function () {
  const audio = $("#audio")[0];
  const playPauseBtn = $("#playPause");
  const progress = $("#progress");
  const volume = $("#volume");
  const $cover = $("#cover");
  const $container = $(".bg-gray-950, .bg-white.shadow-xl");
  const $body = $("#body");

  let isPlaying = false;
  let darkMode = true;
  let currentIndex = 0;

  // 🎵 Playlist directly in JS
  const songs = [
    { title: "song1", src: "assets/audio/song1.mp3", cover: "assets/img/cover1.jpg" },
    { title: "song2", src: "assets/audio/song2.mp3", cover: "assets/img/cover2.jpg" },
    { title: "song3", src: "assets/audio/song3.mp3", cover: "assets/img/cover3.jpg" },
    { title: "song4", src: "assets/audio/song4.mp3", cover: "assets/img/cover4.jpg" },
    { title: "song5", src: "assets/audio/song5.mp3", cover: "assets/img/cover5.jpg" },
    { title: "song6", src: "assets/audio/song6.mp3", cover: "assets/img/cover6.jpg" }
  ];

  // 🧠 Load song
  function loadSong(index) {
    const song = songs[index];
    $("#title").text(song.title);
    $("#artist").text("Auto Mode");
    $cover.attr("src", song.cover);
    $("#audio").attr("src", song.src);
    audio.load();
    progress.val(0);
    isPlaying = false;
    playPauseBtn.html(playIcon);
  }

  // ▶️ / ⏸️ icons
  const playIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6 4l12 6-12 6V4z" />
    </svg>`;

  const pauseIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6 4h4v12H6V4zm6 0h4v12h-4V4z" />
    </svg>`;

  // ▶️/⏸️ toggle
  playPauseBtn.click(function () {
    if (isPlaying) {
      audio.pause();
      playPauseBtn.html(playIcon);
    } else {
      audio.play();
      playPauseBtn.html(pauseIcon);
    }
    isPlaying = !isPlaying;
  });

  // ⏭️ Next
  $("#next").click(function () {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
  });

  // ⏮️ Prev
  $("#prev").click(function () {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
  });

  // 🔉 Volume
  volume.on("input", function () {
    audio.volume = this.value;
  });

  // ⏱ Update progress
  audio.ontimeupdate = function () {
    if (!isPlaying || !audio.duration) return;
    progress.val((audio.currentTime / audio.duration) * 100);
  };

  // 🎚 Scrub
  progress.on("input", function () {
    if (audio.duration) {
      audio.currentTime = (this.value * audio.duration) / 100;
    }
  });

  // 🌙 Dark/Light mode
  $("#toggleMode").click(function () {
    darkMode = !darkMode;

    if (darkMode) {
      $body.removeClass("bg-white text-black").addClass("bg-gray-900 text-white");
      $container.removeClass("bg-white text-black shadow-xl").addClass("bg-gray-950 text-white shadow-2xl");
      $(this).removeClass("bg-black text-white").addClass("bg-white text-black");
    } else {
      $body.removeClass("bg-gray-900 text-white").addClass("bg-white text-black");
      $container.removeClass("bg-gray-950 text-white shadow-2xl").addClass("bg-white text-black shadow-xl");
      $(this).removeClass("bg-white text-black").addClass("bg-black text-white");
    }
  });

  // 🚀 Init
  loadSong(currentIndex);
});
