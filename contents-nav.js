(() => {
  const chapters = [
    { id: "overview", label: "Overview", number: "01" },
    { id: "robota-embed", label: "Robota-Embed", number: "02" },
    { id: "benchmark", label: "Robota-Embed-Bench", number: "03" },
    { id: "embed2icl", label: "Embed2ICL", number: "04" },
    { id: "real-robot", label: "Real robot", number: "04.1", nested: true },
    { id: "libero-demo", label: "LIBERO", number: "04.2", nested: true },
    { id: "droid-diagnostic", label: "DROID-Sim", number: "04.3", nested: true },
    { id: "embed2evolve", label: "Embed2Evolve", number: "05" },
    { id: "paper", label: "Technical report", number: "06" },
  ].map((chapter) => ({ ...chapter, element: document.getElementById(chapter.id) }))
    .filter((chapter) => chapter.element);

  if (!chapters.length || document.querySelector(".contents-nav")) return;

  const container = document.createElement("div");
  container.className = "contents-nav";
  container.innerHTML = `
    <button class="contents-nav__toggle" type="button" aria-expanded="false" aria-controls="page-contents-panel" aria-label="Open page contents">
      <span class="contents-nav__icon" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>Contents</span>
    </button>
    <nav class="contents-nav__panel" id="page-contents-panel" aria-labelledby="page-contents-heading" hidden>
      <p class="contents-nav__heading"><span id="page-contents-heading">On this page</span><span class="contents-nav__position" aria-hidden="true"></span></p>
      <ol class="contents-nav__list">${chapters.map((chapter) => `
        <li class="contents-nav__item${chapter.nested ? " contents-nav__item--nested" : ""}">
          <a class="contents-nav__link" href="#${chapter.id}"><span class="contents-nav__number" aria-hidden="true">${chapter.number}</span><span>${chapter.label}</span></a>
        </li>`).join("")}
      </ol>
    </nav>`;
  document.body.append(container);

  const toggle = container.querySelector(".contents-nav__toggle");
  const panel = container.querySelector(".contents-nav__panel");
  const position = container.querySelector(".contents-nav__position");
  const links = [...panel.querySelectorAll("a")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentIndex = -1;
  let scheduled = false;

  function setOpen(open, restoreFocus = false) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", `${open ? "Close" : "Open"} page contents`);
    panel.hidden = !open;
    if (restoreFocus) toggle.focus({ preventScroll: true });
    if (open) {
      const activeLink = links[currentIndex];
      if (activeLink) panel.scrollTop = Math.max(0, activeLink.offsetTop - panel.clientHeight / 2);
    }
  }

  function updateActive() {
    // Read document positions rather than visibility ratios: nested evidence blocks
    // can be taller than the viewport and contain media with late-loading dimensions.
    const readingLine = Math.min(window.innerHeight * 0.28, 200);
    let index = 0;
    chapters.forEach((chapter, candidate) => {
      if (chapter.element.getBoundingClientRect().top <= readingLine) index = candidate;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) index = chapters.length - 1;
    if (index === currentIndex) return;
    currentIndex = index;
    links.forEach((link, candidate) => {
      if (candidate === index) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    position.textContent = `${String(index + 1).padStart(2, "0")} / ${chapters.length}`;
    toggle.title = `Page contents · ${chapters[index].label}`;
  }

  function avoidVideoControls() {
    // Narrow layouts use a bottom-corner control. Raise it only when that corner
    // intersects a visible video's native control strip.
    container.style.setProperty("--contents-lift", "0px");
    if (window.innerWidth >= 1440 || !panel.hidden) return;
    const button = toggle.getBoundingClientRect();
    let lift = 0;
    document.querySelectorAll("video[controls]").forEach((video) => {
      if (!video.getClientRects().length) return;
      const rect = video.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
      const controlsTop = Math.max(rect.top, rect.bottom - 56);
      const intersects = button.right > rect.left && button.left < rect.right
        && button.bottom > controlsTop && button.top < rect.bottom;
      if (intersects) lift = Math.max(lift, button.bottom - controlsTop + 12);
    });
    // The hero scroll control shares this corner on tablet/small-desktop layouts.
    // Keep both controls reachable instead of placing the floating menu over it.
    document.querySelectorAll(".hero-down").forEach((control) => {
      const rect = control.getBoundingClientRect();
      const intersects = button.right > rect.left && button.left < rect.right
        && button.bottom > rect.top && button.top < rect.bottom;
      if (intersects) lift = Math.max(lift, button.bottom - rect.top + 12);
    });
    if (lift > 0) container.style.setProperty("--contents-lift", `${Math.ceil(lift)}px`);
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateActive();
      avoidVideoControls();
    });
  }

  toggle.addEventListener("click", () => {
    setOpen(panel.hidden);
    avoidVideoControls();
  });
  document.addEventListener("pointerdown", (event) => {
    if (!panel.hidden && !container.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      event.preventDefault();
      setOpen(false, true);
      avoidVideoControls();
    }
  });
  container.addEventListener("focusout", () => {
    // The menu is non-modal: normal Tab navigation can leave it freely.
    window.setTimeout(() => {
      if (!container.contains(document.activeElement)) setOpen(false);
    }, 0);
  });

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const target = chapters[index].element;
      setOpen(false);
      const url = new URL(window.location.href);
      url.hash = target.id;
      if (window.location.hash !== url.hash) history.pushState(null, "", url);
      const focusTarget = target.querySelector("h2, h3") || target;
      const originalTabIndex = focusTarget.getAttribute("tabindex");
      if (originalTabIndex === null) {
        focusTarget.setAttribute("tabindex", "-1");
        focusTarget.addEventListener("blur", () => focusTarget.removeAttribute("tabindex"), { once: true });
      }
      focusTarget.focus({ preventScroll: true });
      window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - 76, behavior: reducedMotion.matches ? "instant" : "smooth" });
      scheduleUpdate();
    });
  });

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("hashchange", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate, { once: true });
  document.addEventListener("loadedmetadata", scheduleUpdate, true);
  if ("ResizeObserver" in window) new ResizeObserver(scheduleUpdate).observe(document.querySelector("main") || document.body);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(scheduleUpdate, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });
    chapters.forEach((chapter) => observer.observe(chapter.element));
  }
  scheduleUpdate();
})();
