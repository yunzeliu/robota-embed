/*
 * Paper-backed benchmark display, 2026-10-05.
 * Authority: results/retrieval/roborag-bench-v1/benchmark-results.json
 * Main comparison: tables/roborag-bench-main.tex.
 * Every pair below is [clip R@1, episode R@1], in percent.
 * Preserve reported macro values: do not average rounded source-level values.
 * PAI-Embedding is the archival ID for the current Robota-Embed paper row.
 * InternVideo2 has aggregate results only; missing source-level values are null.
 */
(() => {
  'use strict';

  const domains = [
    { id: 'all', label: 'All sources', title: 'Four-domain average' },
    { id: 'EgoDex', label: 'EgoDex', title: 'EgoDex' },
    { id: 'DROID', label: 'DROID', title: 'DROID' },
    { id: 'LIBERO', label: 'LIBERO', title: 'LIBERO' },
    { id: 'RoboMIND-Franka-Dual', label: 'RoboMIND-FD', title: 'RoboMIND–Franka-dual' }
  ];
  const models = [
    {
      name: 'Robota-Embed', source: 'paper_primary', group: 'Unified VLA', featured: true,
      results: {
        all: [47.33, 81.77], EgoDex: [36.70, 87.06], DROID: [74.10, 99.88],
        LIBERO: [38.50, 67.62], 'RoboMIND-Franka-Dual': [40.00, 72.50]
      }
    },
    {
      name: 'Gemini Embedding 2', source: 'Gemini Embedding 2', group: 'Unified VL', featured: true,
      results: {
        all: [25.24, 48.30], EgoDex: [34.54, 84.19], DROID: [62.54, 98.99],
        LIBERO: [3.40, 9.06], 'RoboMIND-Franka-Dual': [0.50, 0.94]
      }
    },
    {
      name: 'Omni-Embed-Nemotron-3B', source: 'Omni-Embed-Nemotron-3B', group: 'Unified VL', featured: true,
      results: {
        all: [24.48, 48.59], EgoDex: [34.30, 83.44], DROID: [58.60, 99.13],
        LIBERO: [4.70, 10.75], 'RoboMIND-Franka-Dual': [0.30, 1.06]
      }
    },
    {
      name: 'WeMM-Embedding-2B', source: 'WeMM-Embedding-2B', group: 'Unified VL',
      results: {
        all: [24.13, 45.06], EgoDex: [30.80, 70.31], DROID: [61.10, 99.69],
        LIBERO: [4.30, 9.00], 'RoboMIND-Franka-Dual': [0.30, 1.25]
      }
    },
    {
      name: 'VLM2Vec-V2', source: 'VLM2Vec-V2', group: 'Unified VL',
      results: {
        all: [24.05, 47.31], EgoDex: [32.40, 78.13], DROID: [58.70, 99.19],
        LIBERO: [4.70, 10.75], 'RoboMIND-Franka-Dual': [0.40, 1.19]
      }
    },
    {
      name: 'Qwen3-VL-Embedding-2B', source: 'Qwen3-VL-Embedding-2B', group: 'Unified VL',
      results: {
        all: [23.30, 45.09], EgoDex: [29.10, 72.81], DROID: [60.20, 99.44],
        LIBERO: [3.20, 6.75], 'RoboMIND-Franka-Dual': [0.70, 1.38]
      }
    },
    {
      name: 'Perception Encoder B16', source: 'Perception Encoder B16', group: 'Text–video',
      results: {
        all: [2.03, 4.97], EgoDex: [6.40, 16.63], DROID: [1.50, 2.75],
        LIBERO: [0.20, 0.50], 'RoboMIND-Franka-Dual': [0.00, 0.00]
      }
    },
    {
      name: 'InternVideo2', source: 'InternVideo2', group: 'Text–video',
      results: {
        all: [1.63, 4.06], EgoDex: null, DROID: null,
        LIBERO: null, 'RoboMIND-Franka-Dual': null
      }
    },
    {
      name: 'CLIP ViT-L/14', source: 'OpenCLIP ViT-L/14', group: 'Text–video',
      results: {
        all: [1.23, 3.22], EgoDex: [3.70, 9.75], DROID: [1.10, 2.63],
        LIBERO: [0.10, 0.50], 'RoboMIND-Franka-Dual': [0.00, 0.00]
      }
    }
  ];

  // A small, read-only inspection hook keeps the display auditable without a fetch
  // dependency, so opening the website directly from disk also works.
  const deepFreeze = value => {
    Object.values(value).forEach(item => {
      if (item && typeof item === 'object') deepFreeze(item);
    });
    return Object.freeze(value);
  };
  window.PhysisBenchmarkResults = deepFreeze({ domains, models });

  const root = document.getElementById('benchmark-comparison');
  if (!root) return;
  root.classList.add('benchmark-comparison');
  root.setAttribute('aria-labelledby', 'benchmark-comparison-title');
  root.innerHTML = `
    <header class="bcmp-heading">
      <div><p class="panel-label">Quantitative comparison</p><h3 id="benchmark-comparison-title">Find the episode. Locate the continuation.</h3></div>
      <p>Compare exact clip retrieval and episode retrieval, then explore where the gains come from.</p>
    </header>
    <div class="bcmp-filters" role="group" aria-label="Choose benchmark query source">
      ${domains.map(domain => `<button type="button" data-benchmark-domain="${domain.id}" aria-pressed="${domain.id === 'all'}">${domain.label}</button>`).join('')}
    </div>
    <p class="bcmp-selection" id="benchmark-comparison-selection"></p>
    <div class="bcmp-chart-wrap">
      <table class="bcmp-chart" aria-describedby="benchmark-comparison-selection benchmark-comparison-scale">
        <caption class="sr-only" id="benchmark-comparison-caption"></caption>
        <colgroup><col class="bcmp-model-col"><col><col></colgroup>
        <thead><tr><th scope="col">Embedding model</th><th scope="col">Clip R@1 <span>Exact paired window</span></th><th scope="col">Episode R@1 <span>Source episode</span></th></tr></thead>
        <tbody id="benchmark-comparison-rows"></tbody>
      </table>
    </div>
    <div class="bcmp-bottom-line"><p id="benchmark-comparison-insight" class="bcmp-insight"></p><p id="benchmark-comparison-scale" class="bcmp-scale">Bars share a 0–100% scale.<br>Higher is better.</p></div>
    <details class="bcmp-details">
      <summary>Compare all nine embedding models</summary>
      <table class="bcmp-full-table">
        <caption id="benchmark-full-caption"></caption>
        <colgroup><col class="bcmp-model-col"><col><col></colgroup>
        <thead><tr><th scope="col">Embedding model</th><th scope="col">Clip R@1</th><th scope="col">Episode R@1</th></tr></thead>
        <tbody id="benchmark-full-rows"></tbody>
      </table>
      <p class="bcmp-missing" id="benchmark-comparison-missing" hidden>Not reported: source-level InternVideo2 results are not available in the paper’s result record. Its aggregate result is shown under All sources.</p>
      <p class="bcmp-protocol">All sources uses the reported equal-weight mean of the four domains. Each domain contains 1,000 queries and 800 source-scoped episodes; episode metrics aggregate within episodes before averaging equally across episodes and domains. Source filters select queries, not a smaller search gallery.</p>
      <p class="bcmp-protocol">Baselines use their supported action-free interfaces: text–video or unified vision–language. Robota-Embed uses unified vision–language–action with retrieval training. This is a cross-model comparison, not a matched-training action ablation. <a href="assets/robota-embed-technical-report.pdf">See the technical report ↗</a></p>
    </details>
    <p class="sr-only" aria-live="polite" aria-atomic="true" id="benchmark-comparison-status"></p>
  `;

  const percent = value => `${value.toFixed(2)}%`;
  const modelName = model => model.name.replace(/-/g, '-<wbr>');
  const metricCell = (value, column) => `<td data-metric="${column}"><strong>${percent(value)}</strong><span class="bcmp-bar" aria-hidden="true"><i style="width:${value}%"></i></span></td>`;

  const render = (domainId, announce = false) => {
    const domain = domains.find(item => item.id === domainId);
    if (!domain) return;
    root.dataset.selectedDomain = domain.id;
    root.querySelectorAll('[data-benchmark-domain]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.benchmarkDomain === domain.id));
    });
    root.querySelector('#benchmark-comparison-selection').textContent = domain.id === 'all'
      ? 'Four-domain average · 4,000 queries · shared-gallery evaluation'
      : `${domain.title} queries · 1,000 queries · shared-gallery evaluation`;
    root.querySelector('#benchmark-comparison-caption').textContent = `${domain.title}: Robota-Embed and the two strongest aggregate R@1 baselines. All values are percentages.`;
    root.querySelector('#benchmark-comparison-rows').innerHTML = models.filter(model => model.featured).map(model => {
      const values = model.results[domain.id];
      return `<tr class="${model.source === 'paper_primary' ? 'bcmp-ours' : ''}" data-benchmark-model="${model.source}"><th scope="row">${modelName(model)}<small>${model.group}${model.source === 'paper_primary' ? ' · ours' : ''}</small></th>${values.map((value, index) => metricCell(value, index === 0 ? 'clip' : 'episode')).join('')}</tr>`;
    }).join('');
    root.querySelector('#benchmark-full-caption').textContent = `${domain.title} · all R@1 values in percent`;
    root.querySelector('#benchmark-full-rows').innerHTML = models.map(model => {
      const values = model.results[domain.id];
      return `<tr class="${model.source === 'paper_primary' ? 'bcmp-ours' : ''}" data-benchmark-model="${model.source}"><th scope="row">${modelName(model)}<small>${model.group}</small></th>${values ? values.map(value => `<td>${percent(value)}</td>`).join('') : '<td colspan="2" class="bcmp-not-reported">Not reported</td>'}</tr>`;
    }).join('');
    root.querySelector('#benchmark-comparison-missing').hidden = domain.id === 'all';
    const notes = {
      all: '<strong>+22.09 pp clip R@1 · +33.18 pp episode R@1</strong><span>Over the strongest baseline for each metric: Gemini Embedding 2 and Omni-Embed-Nemotron-3B, respectively.</span>',
      EgoDex: '<strong>Episode retrieval is not temporal localization.</strong><span>Robota-Embed finds the source episode at 87.06% R@1; locating its exact paired continuation reaches 36.70%.</span>',
      DROID: '<strong>Strong episode retrieval, a harder clip-level test.</strong><span>Robota-Embed reaches 99.88% episode R@1 and 74.10% exact clip R@1.</span>',
      LIBERO: '<strong>Stronger discrimination between recorded continuations.</strong><span>Robota-Embed reaches 38.50% clip R@1, versus a best reported unified VL baseline of 4.70%.</span>',
      'RoboMIND-Franka-Dual': '<strong>Retrieval gains extend to dual-arm experience.</strong><span>Robota-Embed reaches 40.00% clip R@1, versus a best reported unified VL baseline of 0.70%.</span>'
    };
    root.querySelector('#benchmark-comparison-insight').innerHTML = notes[domain.id];
    if (announce) {
      const values = models[0].results[domain.id];
      root.querySelector('#benchmark-comparison-status').textContent = `${domain.title} selected. Robota-Embed clip R@1 ${percent(values[0])}; episode R@1 ${percent(values[1])}.`;
    }
  };

  root.querySelectorAll('[data-benchmark-domain]').forEach((button, index, buttons) => {
    button.addEventListener('click', () => render(button.dataset.benchmarkDomain, true));
    button.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') target = (index + buttons.length - 1) % buttons.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = buttons.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      buttons[target].focus();
      render(buttons[target].dataset.benchmarkDomain, true);
    });
  });
  render('all');
})();
