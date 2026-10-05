(() => {
  const viewer = document.querySelector("[data-droid-diagnostic]");
  if (!viewer) return;
  const tabs = [...viewer.querySelectorAll('[data-droid-tabs] [role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
  const pauseVideo = (video) => {
    if (typeof pauseAutomatically === "function") pauseAutomatically(video);
    else video.pause();
  };
  const controllers = panels.map((panel) => {
    const videos = [...panel.querySelectorAll("[data-droid-rollout]")];
    const playButton = panel.querySelector("[data-droid-play]");
    const restartButton = panel.querySelector("[data-droid-restart]");
    const status = panel.querySelector("[data-droid-status]");
    let linked = false;
    let request = 0;
    let version = 0;

    const stop = (message = "Paused · aligned playback") => {
      linked = false;
      version += 1;
      cancelAnimationFrame(request);
      videos.forEach(pauseVideo);
      playButton.textContent = "Play pair";
      status.textContent = message;
    };
    const align = (source = videos[0]) => {
      videos.forEach((video) => {
        if (video !== source && Math.abs(video.currentTime - source.currentTime) > .12) video.currentTime = source.currentTime;
      });
    };
    const tick = () => {
      if (!linked) return;
      if (videos.some((video) => video.ended)) {
        stop("Complete · 30-second rollouts");
        return;
      }
      if (videos.every((video) => !video.paused && !video.seeking && video.readyState >= 3)) align();
      request = requestAnimationFrame(tick);
    };
    playButton.addEventListener("click", async () => {
      if (linked) { stop(); return; }
      if (videos.some((video) => video.ended)) videos.forEach((video) => { video.currentTime = 0; });
      align();
      videos.forEach((video) => { video.playbackRate = 1; });
      linked = true;
      const startedVersion = ++version;
      playButton.textContent = "Pause pair";
      status.textContent = "Playing together · 1× speed";
      const results = await Promise.allSettled(videos.map((video) => video.play()));
      if (startedVersion !== version || panel.hidden || document.hidden) {
        videos.forEach(pauseVideo);
        return;
      }
      if (results.some((result) => result.status === "rejected")) {
        stop("Playback unavailable · use the individual controls to retry");
        return;
      }
      tick();
    });
    restartButton.addEventListener("click", () => {
      stop("Restarted · ready at 0:00");
      videos.forEach((video) => { video.currentTime = 0; });
    });
    videos.forEach((video) => {
      video.addEventListener("pause", () => { if (linked) stop(video.ended ? "Complete · 30-second rollouts" : undefined); });
      video.addEventListener("ended", () => { if (linked) stop("Complete · 30-second rollouts"); });
      video.addEventListener("seeking", () => { if (linked) align(video); });
      video.addEventListener("ratechange", () => {
        if (!linked) return;
        videos.forEach((other) => { if (other.playbackRate !== video.playbackRate) other.playbackRate = video.playbackRate; });
        status.textContent = `Playing together · ${video.playbackRate}× speed`;
      });
    });
    const cameraStrips = [...panel.querySelectorAll(".droid-camera-scroll")];
    cameraStrips.forEach((strip) => {
      strip.addEventListener("scroll", () => {
        cameraStrips.forEach((other) => {
          if (other !== strip && Math.abs(other.scrollLeft - strip.scrollLeft) > 1) other.scrollLeft = strip.scrollLeft;
        });
      }, { passive: true });
    });
    return { stop };
  });

  const select = (index, focus = false) => {
    tabs.forEach((tab, current) => {
      const active = current === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[current].hidden = !active;
      if (!active) {
        controllers[current].stop();
        panels[current].querySelectorAll("video").forEach(pauseVideo);
      }
    });
    if (focus) tabs[index].focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(index));
    tab.addEventListener("keydown", (event) => {
      const keys = { ArrowLeft: (index + tabs.length - 1) % tabs.length, ArrowRight: (index + 1) % tabs.length, Home: 0, End: tabs.length - 1 };
      if (!(event.key in keys)) return;
      event.preventDefault();
      select(keys[event.key], true);
    });
  });
  const stopAll = () => {
    controllers.forEach((controller) => controller.stop());
    viewer.querySelectorAll("video").forEach(pauseVideo);
  };
  document.addEventListener("physis:motionchange", (event) => { if (event.detail.paused) stopAll(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopAll(); });
})();
