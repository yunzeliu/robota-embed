(() => {
  // Make deep links to technical detail blocks work both on entry and in-page.
  function openHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    let detail = target.closest("details");
    while (detail) { detail.open = true; detail = detail.parentElement?.closest("details"); }
  }
  window.addEventListener("hashchange", openHash);
  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", () => {
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (target?.matches("details")) target.open = true;
  }));
  document.querySelectorAll(".technical-details").forEach((detail) => detail.addEventListener("toggle", () => {
    if (!detail.open) detail.querySelectorAll("video").forEach((video) => video.pause());
  }));
  openHash();

  // Group controls start each recorded clip at its own start; they do not imply
  // synchronized real-world clocks, identical resets, or equal clip lengths.
  const groups = [];
  document.querySelectorAll("#real-robot [data-carousel], #yam-demo [data-carousel], #libero-demo [data-carousel], .evolve-task-panel [data-carousel]").forEach((carousel) => {
    const videos = [...carousel.querySelectorAll("video")];
    if (videos.length < 2) return;
    videos.forEach((video) => { video.preload = "none"; video.loop = false; video.setAttribute("data-manual-play", ""); });
    const toolbar = document.createElement("div");
    toolbar.className = "group-transport";
    toolbar.innerHTML = '<span>Recorded clips · individual controls remain available</span><div><button type="button" aria-pressed="false">Play group</button><button type="button">Restart</button></div>';
    carousel.before(toolbar);
    const [play, restart] = toolbar.querySelectorAll("button");
    const groupName = carousel.getAttribute("aria-label") || "recorded clips";
    restart.setAttribute("aria-label", `Restart ${groupName}`);
    let revision = 0;
    const update = () => {
      const active = videos.some((video) => !video.paused && !video.ended);
      play.textContent = active ? "Pause group" : "Play group";
      play.setAttribute("aria-label", `${active ? "Pause" : "Play"} ${groupName}`);
      play.setAttribute("aria-pressed", String(active));
    };
    const pause = () => { revision += 1; videos.forEach((video) => video.pause()); update(); };
    const reset = () => { pause(); videos.forEach((video) => { video.currentTime = 0; }); };
    play.addEventListener("click", async () => {
      if (videos.some((video) => !video.paused && !video.ended)) { pause(); return; }
      // Reduced motion suppresses automatic playback, not a deliberate Play click.
      if (videos.every((video) => video.ended)) reset();
      const token = ++revision;
      const attempts = await Promise.allSettled(videos.filter((video) => !video.ended).map((video) => video.play()));
      if (token !== revision || attempts.some((attempt) => attempt.status === "rejected")) pause();
      update();
    });
    restart.addEventListener("click", reset);
    videos.forEach((video) => ["play", "pause", "ended"].forEach((event) => video.addEventListener(event, update)));
    const clipNavigation = document.createElement("div");
    clipNavigation.className = "group-clip-nav";
    clipNavigation.setAttribute("role", "group");
    clipNavigation.setAttribute("aria-label", `Choose a clip in ${groupName}`);
    const cards = [...carousel.querySelectorAll(".media-card")];
    const clipButtons = cards.map((card, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = card.querySelector(".media-badge")?.textContent || `Clip ${index + 1}`;
      button.setAttribute("aria-label", `Show ${button.textContent} in ${groupName}`);
      button.addEventListener("click", () => carousel.scrollTo({ left: carousel.scrollLeft + card.getBoundingClientRect().left - carousel.getBoundingClientRect().left, behavior: "instant" }));
      clipNavigation.append(button);
      return button;
    });
    const updateClip = () => {
      const left = carousel.getBoundingClientRect().left;
      let current = 0, distance = Infinity;
      cards.forEach((card, index) => {
        const delta = Math.abs(card.getBoundingClientRect().left - left);
        if (delta < distance) { current = index; distance = delta; }
      });
      clipButtons.forEach((button, index) => button.setAttribute("aria-pressed", String(index === current)));
    };
    carousel.before(clipNavigation);
    carousel.addEventListener("scroll", updateClip, { passive: true });
    window.addEventListener("resize", updateClip);
    updateClip();
    update();
    const panel = carousel.closest('[role="tabpanel"]');
    if (panel) new MutationObserver(() => { if (panel.hidden) pause(); }).observe(panel, { attributes: true, attributeFilter: ["hidden"] });
    groups.push({ pause, play });
  });
  const updateMotion = () => {
    const paused = document.body.classList.contains("motion-paused");
    if (paused) groups.forEach((group) => group.pause());
  };
  document.addEventListener("physis:motionchange", updateMotion);
  document.addEventListener("visibilitychange", () => { if (document.hidden) groups.forEach((group) => group.pause()); });
  updateMotion();
})();
