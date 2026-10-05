/*
 * Task-linked Embed2Evolve results. Aggregate evidence, never video telemetry.
 * Success counts: results/physis-evolve/formal-main.csv (20 test rollouts).
 * Mean total policy tokens: results/physis-evolve/token-cost.csv; population
 * and precision: results/physis-evolve/token-cost.md. Both outcomes included;
 * development excluded. Legacy "Physis-Evolve" maps to current Embed2Evolve.
 * Random-history token means were not provided. Omni-Embed-Nemotron-3B has
 * only a five-task token aggregate (omni-token-comparison.csv), so neither
 * condition is assigned a per-task token value here. The seed-40 videos are
 * qualitative examples, not the source of these 20-rollout measurements.
 */
(() => {
  "use strict";

  const tasks = [
    { panel: "panel-two-robot", name: "Two-Robot Stack Cube", sourceTask: "TwoRobotStackCube-v1", direct: 5, random: 3, evolve: 17, directTokens: 1110007.75, evolveTokens: 719408.05 },
    { panel: "panel-poke", name: "Poke Cube", sourceTask: "PokeCube-v1", direct: 9, random: 3, evolve: 16, directTokens: 709785.55, evolveTokens: 388663.00 },
    { panel: "panel-stack", name: "Stack Cube", sourceTask: "StackCube-v1", direct: 2, random: 4, evolve: 12, directTokens: 953487.35, evolveTokens: 675130.70 },
    { panel: "panel-lift", name: "Lift Peg Upright", sourceTask: "LiftPegUpright-v1", direct: 6, random: 8, evolve: 13, directTokens: 855931.20, evolveTokens: 393317.60 },
    { panel: "panel-pull", name: "Pull Cube with Tool", sourceTask: "PullCubeTool-v1", direct: 2, random: 2, evolve: 10, directTokens: 975686.95, evolveTokens: 414561.40 },
  ];
  const rolloutCount = 20;
  // Identical axes in every task: success 0–100%; tokens 0–1.2 million.
  const tokenAxisMax = 1200000;
  const exactTokens = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function metricRow(label, display, detail, ratio, featured, rawValue) {
    const row = element("div", `evolve-task-metric-row${featured ? " is-featured" : ""}`);
    row.dataset.value = String(rawValue);
    row.append(element("dt", "", label));
    const value = element("dd");
    value.append(element("strong", "", display));
    if (detail) value.append(element("small", "", detail));
    row.append(value);
    const track = element("div", "evolve-task-metric-track");
    track.setAttribute("aria-hidden", "true");
    const fill = element("span");
    fill.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    track.append(fill);
    row.append(track);
    return row;
  }

  function metricCard(title, change, positive, rows, axis) {
    const card = element("section", "evolve-task-metric-card");
    const heading = element("header");
    heading.append(element("h4", "", title));
    heading.append(element("span", `evolve-task-metric-delta${positive ? " is-positive" : ""}`, change));
    card.append(heading);
    const values = element("dl");
    rows.forEach((row) => values.append(row));
    card.append(values);
    card.append(element("p", "evolve-task-metric-axis", axis));
    return card;
  }

  function renderTask(task) {
    const panel = document.getElementById(task.panel);
    if (!panel || panel.querySelector(".evolve-task-metrics")) return;

    const block = element("section", "evolve-task-metrics");
    block.dataset.task = task.sourceTask;
    block.setAttribute("aria-labelledby", `${task.panel}-metrics-title`);
    const heading = element("div", "evolve-task-metrics-heading");
    const title = element("h3", "", task.name);
    title.id = `${task.panel}-metrics-title`;
    heading.append(title, element("span", "", "Task-level test results"));
    block.append(heading);

    const directSuccess = task.direct / rolloutCount * 100;
    const evolveSuccess = task.evolve / rolloutCount * 100;
    const gain = evolveSuccess - directSuccess;
    const tokenReduction = (1 - task.evolveTokens / task.directTokens) * 100;
    const tokenChange = `${Math.abs(tokenReduction).toFixed(1)}% ${tokenReduction >= 0 ? "fewer" : "more"} vs. Direct`;
    const cards = element("div", "evolve-task-metric-grid");
    cards.append(metricCard(
      "Success rate ↑",
      `${gain >= 0 ? "+" : ""}${gain.toFixed(0)} pp vs. Direct`,
      gain > 0,
      [
        metricRow("Direct", `${directSuccess.toFixed(0)}%`, `${task.direct} / ${rolloutCount}`, directSuccess / 100, false, directSuccess),
        metricRow("Embed2Evolve", `${evolveSuccess.toFixed(0)}%`, `${task.evolve} / ${rolloutCount}`, evolveSuccess / 100, true, evolveSuccess),
      ],
      "Higher is better · scale 0–100%",
    ));
    const tokenRows = [
      metricRow("Direct", `${(task.directTokens / 1000000).toFixed(3)}M`, "", task.directTokens / tokenAxisMax, false, task.directTokens),
      metricRow("Embed2Evolve", `${(task.evolveTokens / 1000000).toFixed(3)}M`, "", task.evolveTokens / tokenAxisMax, true, task.evolveTokens),
    ];
    tokenRows.forEach((row, index) => {
      const value = index === 0 ? task.directTokens : task.evolveTokens;
      row.querySelector("dd").setAttribute("aria-label", `${exactTokens.format(value)} mean total policy tokens per test rollout`);
      row.querySelector("dd").title = `${exactTokens.format(value)} tokens per test rollout`;
    });
    cards.append(metricCard("Policy tokens / rollout ↓", tokenChange, tokenReduction > 0, tokenRows, "Lower is better · scale 0–1.2M tokens"));
    block.append(cards);

    const scope = element("p", "evolve-task-metrics-scope", "20 test rollouts per condition, including failures. Token counts are task averages, not measurements for the seed-40 clips below.");
    block.append(scope);
    const randomPercent = task.random / rolloutCount * 100;
    block.append(element("p", "evolve-task-metrics-control", `Random RGB-only history: ${randomPercent.toFixed(0)}% success (${task.random} / ${rolloutCount}).`));

    const fallback = panel.querySelector(".task-rate-strip");
    if (fallback) {
      fallback.after(block);
      fallback.hidden = true;
    } else {
      panel.prepend(block);
    }
  }

  function initialize() {
    tasks.forEach(renderTask);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
