// Blooper clips: one plays at a time, the button shows Play / Stop and a progress bar runs on the monitor.
(function () {
  "use strict";
  var current = null;

  function stop(card) {
    var audio = card.querySelector("audio");
    var btn = card.querySelector(".play");
    audio.pause();
    audio.currentTime = 0;
    btn.setAttribute("aria-pressed", "false");
    btn.querySelector(".lbl").textContent = "Play";
    btn.querySelector(".ico").textContent = "▶";
    card.querySelector(".bar i").style.width = "0";
    if (current === card) current = null;
  }

  document.querySelectorAll(".blooper").forEach(function (card) {
    var audio = card.querySelector("audio");
    var btn = card.querySelector(".play");
    var bar = card.querySelector(".bar i");
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", function () {
      if (current === card) { stop(card); return; }
      if (current) stop(current);
      current = card;
      btn.setAttribute("aria-pressed", "true");
      btn.querySelector(".lbl").textContent = "Stop";
      btn.querySelector(".ico").textContent = "■";
      audio.play().catch(function () { stop(card); });
    });
    audio.addEventListener("timeupdate", function () {
      if (audio.duration) bar.style.width = (100 * audio.currentTime / audio.duration) + "%";
    });
    audio.addEventListener("ended", function () { stop(card); });
  });
})();
