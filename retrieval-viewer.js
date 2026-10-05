(() => {
  const cases = window.PHYSIS_RETRIEVAL_CASES;
  const root = document.getElementById("retrieval-comparison");
  if (!root || !cases?.length) return;
  const panel = root.querySelector('[role="tabpanel"]');
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  let playbackRevision = 0;
  const pause = () => {
    playbackRevision += 1;
    panel.querySelectorAll("video").forEach((video) => video.pause());
  };
  const relationClass = (relation) => relation === "Exact clip" ? "exact" : relation === "Same episode" ? "episode" : "other";
  const delta = (value) => `${value > 0 ? "+" : ""}${Number(value.toFixed(1))} s`;
  const media = (base, file, name, grouped = true) => `<div class="media-frame"><video ${grouped ? 'data-retrieval-video' : ''} data-manual-play muted playsinline preload="none" controls aria-label="${escape(name)}" poster="${base}/${file}-poster.webp" src="${base}/${file}.mp4"></video></div>`;

  function select(index, focus = false) {
    pause();
    const item = cases[index];
    const base = `assets/retrieval/${item.id}`;
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tabs[index].id);
    const results = item.models.map((model) => {
      const offset = model.top1Relation === "Same episode" && model.top1DeltaSeconds !== null ? `Anchor ${delta(model.top1DeltaSeconds)} from query` : model.top1Relation === "Exact clip" ? "Exact recorded continuation" : "Different episode identity";
      return `<article class="retrieval-result ${model.id === 'physis' ? 'physis-result' : ''}"><header><b>${escape(model.name)}</b><span>Top-1 · ${escape(model.input)}</span></header>${media(base, `${model.id}_top1`, `${item.source}: ${model.name} top-ranked future`)}<div class="retrieval-result-copy"><span class="retrieval-relation ${relationClass(model.top1Relation)}">${escape(model.top1Relation)}</span><strong>Paired clip rank #${model.pairedRank}</strong><small>${escape(offset)}</small></div></article>`;
    }).join("");
    const ranks = item.models.map((model) => `<section><h4>${escape(model.name)}</h4><p>First episode hit: ${model.firstEpisodeRank ?? ">10"}</p><table><thead><tr><th scope="col">Rank</th><th scope="col">Clip ID</th><th scope="col">Relation</th></tr></thead><tbody>${model.top10.map((row) => `<tr data-paired="${row.id === item.queryId}"><td>${row.rank}</td><td><code title="${escape(row.id)}">${escape(row.id.slice(0, 10))}…</code></td><td><span class="retrieval-relation ${relationClass(row.relation)}" title="${escape(row.instruction)}">${escape(row.relation)}</span></td></tr>`).join("")}</tbody></table></section>`).join("");
    const hard = item.hardDistractor ? `<div class="retrieval-hard-example">${media(base, 'hard_distractor', 'LIBERO same-instruction hard distractor', false)}<div><strong>Robota-Embed rank #${item.hardDistractor.rank}: a hard distractor</strong><p>The same instruction, from a different episode. The exact paired clip ranks first; this candidate ranks second.</p><p>“${escape(item.hardDistractor.instruction)}”</p></div></div>` : "";
    panel.innerHTML = `<div class="retrieval-query-row"><div class="retrieval-input-images"><figure><img width="320" height="192" src="${base}/query_original.png" alt="${escape(item.source)} uncropped current query frame"><figcaption><b>Original current frame</b>Gemini / Omni input</figcaption></figure><figure><img width="320" height="192" src="${base}/query_sam3_crop.png" alt="${escape(item.source)} SAM3 crop used by Robota-Embed"><figcaption><b>Recorded SAM3 crop</b>Robota-Embed visual input</figcaption></figure></div><div class="retrieval-query-copy"><p class="panel-label">${escape(item.source)} · current-state query</p><p class="retrieval-instruction">“${escape(item.instruction)}”</p><p class="retrieval-query-meta">Robota-Embed also receives the synchronized ${item.actionDim}D native action.</p><div class="retrieval-action-links"><a href="${base}/query_action.csv" download>Raw action ↗</a><a href="${base}/query_action_model_input.csv" download>Normalized model input ↗</a></div></div></div><div class="retrieval-transport"><span>Top-1 results and the paired future · 4 s each</span><div><button type="button" data-retrieval-play aria-pressed="false">Play all four</button><button type="button" data-retrieval-restart>Restart</button></div></div><div class="retrieval-clips">${results}<article class="retrieval-result truth-result"><header><b>Paired future</b><span>Recorded ground truth</span></header>${media(base, 'paired_future', `${item.source}: exact paired future`)}<div class="retrieval-result-copy"><span class="retrieval-relation exact">Reference target</span><strong>The query’s next window</strong><small>Recorded future, not generated</small></div></article></div><div class="retrieval-insight"><b>${escape(item.category)}</b><p>${escape(item.insight)}</p></div><details class="retrieval-rank-details"><summary>Inspect the raw Top-10 rankings${hard ? ' and hard distractor' : ''}</summary><p>Clip IDs are abbreviated. Green rows identify the paired clip. These are archived rankings, without reranking.</p><div class="retrieval-rank-grid">${ranks}</div>${hard}</details>`;
    const videos = [...panel.querySelectorAll('[data-retrieval-video]')];
    const playButton = panel.querySelector('[data-retrieval-play]');
    const update = () => {
      const playing = videos.some((video) => !video.paused && !video.ended);
      playButton.textContent = playing ? "Pause all" : "Play all four";
      playButton.setAttribute("aria-pressed", String(playing));
    };
    videos.forEach((video) => ["play", "pause", "ended"].forEach((event) => video.addEventListener(event, update)));
    playButton.addEventListener("click", async () => {
      if (videos.some((video) => !video.paused && !video.ended)) { pause(); update(); return; }
      const revision = ++playbackRevision;
      const clock = videos.at(-1);
      const start = clock.ended ? 0 : clock.currentTime;
      videos.forEach((video) => { video.currentTime = start; });
      const outcomes = await Promise.allSettled(videos.map((video) => video.play()));
      if (revision !== playbackRevision) videos.forEach((video) => video.pause());
      if (outcomes.some((outcome) => outcome.status === "rejected") && revision === playbackRevision) {
        videos.forEach((video) => video.pause());
        playButton.textContent = "Use individual video controls";
        playButton.setAttribute("aria-pressed", "false");
      } else update();
    });
    panel.querySelector('[data-retrieval-restart]').addEventListener("click", () => {
      pause(); videos.forEach((video) => { video.currentTime = 0; }); update();
    });
    const rankDetails = panel.querySelector('.retrieval-rank-details');
    rankDetails.addEventListener("toggle", () => {
      if (!rankDetails.open) rankDetails.querySelectorAll("video").forEach((video) => video.pause());
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(index));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); select(next, true);
    });
  });
  document.addEventListener("physis:motionchange", (event) => { if (event.detail.paused) pause(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  select(0);
})();
