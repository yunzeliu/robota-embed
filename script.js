document.documentElement.classList.add("js");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const saveData = navigator.connection?.saveData === true;
const automaticPauses = new WeakSet();

function motionIsPaused() {
  return document.body.classList.contains("motion-paused");
}

function pauseAutomatically(video) {
  automaticPauses.add(video);
  video.pause();
  window.setTimeout(() => automaticPauses.delete(video), 80);
}

function playAutomatically(video) {
  if (motionIsPaused() || saveData || document.hidden || video.dataset.userPaused === "true") return;
  video.play().catch(() => {});
}

function setupMotionControls() {
  const toggle = document.querySelector("[data-motion-toggle]");
  if (!toggle) return;
  const label = toggle.querySelector("[data-motion-label]");
  const icon = toggle.firstElementChild;

  const setPaused = (paused) => {
    document.body.classList.toggle("motion-paused", paused);
    toggle.setAttribute("aria-pressed", String(paused));
    label.textContent = paused ? "Play motion" : "Pause motion";
    icon.textContent = paused ? "▶" : "Ⅱ";
    if (paused) document.querySelectorAll("video").forEach(pauseAutomatically);
    document.dispatchEvent(new CustomEvent("physis:motionchange", { detail: { paused } }));
  };

  document.querySelectorAll(".media-frame video").forEach((video) => {
    video.addEventListener("pause", () => {
      if (!automaticPauses.has(video) && video.currentTime > 0 && !video.ended) video.dataset.userPaused = "true";
    });
    video.addEventListener("play", () => { delete video.dataset.userPaused; });
  });

  toggle.addEventListener("click", () => setPaused(!motionIsPaused()));
  reducedMotion.addEventListener?.("change", (event) => {
    if (event.matches) setPaused(true);
  });
  setPaused(reducedMotion.matches || saveData);
}

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  const close = () => {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = !links.classList.contains("is-open");
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", close);
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) close();
  });
}

function setupReveal() {
  const elements = [...document.querySelectorAll("[data-reveal]")];
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function setupHeroMedia() {
  const hero = document.querySelector(".hero-video");
  if (!hero) return;

  const update = () => {
    if (motionIsPaused() || saveData || document.hidden) {
      pauseAutomatically(hero);
      return;
    }
    playAutomatically(hero);
  };

  update();
  reducedMotion.addEventListener?.("change", update);
  document.addEventListener("visibilitychange", update);
  document.addEventListener("physis:motionchange", update);
}

function setupVLADiagram() {
  const diagram = document.querySelector("[data-vla-diagram]");
  if (!diagram) return;
  const modalities = [...diagram.querySelectorAll("[data-modality]")];
  if (!modalities.length) return;

  let activeIndex = 0;
  let timer;
  const select = (index) => {
    activeIndex = (index + modalities.length) % modalities.length;
    modalities.forEach((modality, modalityIndex) => {
      modality.classList.toggle("is-active", modalityIndex === activeIndex);
    });
  };
  const start = () => {
    window.clearInterval(timer);
    if (motionIsPaused() || document.hidden) return;
    timer = window.setInterval(() => select(activeIndex + 1), 1600);
  };

  document.addEventListener("visibilitychange", start);
  reducedMotion.addEventListener?.("change", start);
  document.addEventListener("physis:motionchange", start);
  select(0);
  start();
}

function setupTabs() {
  const list = document.querySelector("[data-tabs]");
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

  const activate = (index, moveFocus = false) => {
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[tabIndex].hidden = !selected;
      if (!selected) panels[tabIndex].querySelectorAll("video").forEach(pauseAutomatically);
    });
    if (moveFocus) tabs[index].focus();
    observeVisibleVideos();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(index));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      activate(next, true);
    });
  });
}

function setupEvolveTasks() {
  const list = document.querySelector("[data-evolve-tabs]");
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

  const activate = (index, moveFocus = false) => {
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (panels[tabIndex]) {
        panels[tabIndex].hidden = !selected;
        if (!selected) panels[tabIndex].querySelectorAll("video").forEach(pauseAutomatically);
      }
    });
    if (moveFocus) tabs[index].focus();
    observeVisibleVideos();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(index));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      activate(next, true);
    });
  });
}

let mediaObserver;
function setupMediaPlayback() {
  // Evidence rollouts are user-started. Only explicitly opted-in media auto-play.
  const videos = [...document.querySelectorAll(".media-frame video[data-autoplay]")];
  if (!videos.length) return;

  if (saveData || !("IntersectionObserver" in window)) {
    videos.forEach(pauseAutomatically);
    return;
  }

  mediaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const visiblePanel = !video.closest("[hidden]");
      if (entry.isIntersecting && visiblePanel && !document.hidden && !motionIsPaused()) {
        playAutomatically(video);
      } else {
        pauseAutomatically(video);
      }
    });
  }, { threshold: 0.55 });
  videos.forEach((video) => mediaObserver.observe(video));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) videos.forEach(pauseAutomatically);
    else observeVisibleVideos();
  });
  document.addEventListener("physis:motionchange", (event) => {
    if (event.detail.paused) videos.forEach(pauseAutomatically);
    else observeVisibleVideos();
  });
}

function observeVisibleVideos() {
  if (!mediaObserver || motionIsPaused() || saveData) return;
  document.querySelectorAll(".media-frame video[data-autoplay]").forEach((video) => {
    mediaObserver.unobserve(video);
    mediaObserver.observe(video);
  });
}

function setupCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    carousel.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const card = carousel.querySelector(".media-card");
      const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 16;
      const distance = (card?.getBoundingClientRect().width || carousel.clientWidth * 0.8) + gap;
      carousel.scrollBy({ left: event.key === "ArrowRight" ? distance : -distance, behavior: reducedMotion.matches ? "auto" : "smooth" });
    });
  });
}

function setupCounters() {
  const counters = [...document.querySelectorAll("[data-count]")];
  if (!counters.length || reducedMotion.matches || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number.parseFloat(counter.dataset.count);
      const decimals = counter.dataset.count.includes(".") ? counter.dataset.count.split(".")[1].length : 0;
      const start = performance.now();
      const duration = 720;
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = (target * eased).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      observer.unobserve(counter);
    });
  }, { threshold: 0.7 });
  counters.forEach((counter) => observer.observe(counter));
}

setupNavigation();
setupReveal();
setupMotionControls();
setupHeroMedia();
setupVLADiagram();
setupTabs();
setupEvolveTasks();
setupMediaPlayback();
setupCarousels();
setupCounters();
