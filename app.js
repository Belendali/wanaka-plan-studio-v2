/* ──────────────────────────────────────────────────────────────────
   Wanaka · Plan Studio v2 — all five stages.

   What this proposes, against what shipped:

   · One frame for every stage. Today 01/02 are "big preview + rail"
     and 03/04/05 are full-width text, so the panel changes shape three
     times while you page through it. Here the left pane always shows
     the thing being decided and the right pane always holds the
     controls for it.
   · Stage names match their contents: what is called Overview holds
     the game vision, and what is called Game vision is a visual style
     picker. They swap.
   · One selection language. Shipped uses a white border, a blue glow
     and a lime dot for the same idea in three places.
   · A cover that fails says so, in its own frame, with the retry
     attached — instead of an alt-text string on a black rectangle and
     an error sentence set as body copy.
   · Every choice that spends credits or time says so before you make
     it: build scope, render quality, the stage list.
   · Review opens collapsed. Four stages of deliverables and gates all
     expanded is an audit, and this stage is meant to be the moment you
     feel safe pressing the button.

   Sizes are CSS variables driven by the Layout panel, so the numbers
   can be settled by moving sliders.
   ────────────────────────────────────────────────────────────────── */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ── The plan (the live project's own content) ─────────────────────
const PLAN = {
  title: 'Tiny Explorer: The Wooden Toy House',
  genre: 'Adventure',
  promise: 'A tiny toy-sized girl explores a giant wooden dollhouse to collect scattered puzzle pieces and complete the story puzzle.',
  fantasy: 'Feel small and curious, discovering hidden treasures inside a cozy, oversized toy world.',
  revision: 'R1',
  cover: 'assets/cover-toyhouse.jpg',
  reference: {
    note: 'Traverse a readable 3D course, recover from falls, and reach a goal.',
    options: [
      { key: 'precision', name: 'Precision course', on: true,
        beats: ['Jump, land, recover on a linear course', 'Moving platforms with a readable timing window',
                'Hazards reset to the last safe checkpoint', 'A goal that locks a result and offers restart'] },
      { key: 'collect', name: 'Collectathon course', on: false,
        beats: ['Open rooms', 'Shiny pickups', 'A required tally'] },
    ],
  },
  scope: [
    { key: 'slice', name: 'Slice', blurb: 'One room, one puzzle. Proves the feel.',
      stages: 2, assets: 3, credits: '180–260', time: '~6 min' },
    { key: 'standard', name: 'Standard', blurb: 'The full course, start to goal.', on: true,
      stages: 4, assets: 6, credits: '320–560', time: '~12 min' },
    { key: 'ambitious', name: 'Ambitious', blurb: 'Extra rooms, stretch goals, polish pass.',
      stages: 6, assets: 11, credits: '640–980', time: '~25 min' },
  ],
  styles: [
    ['default', 'Default', 'Engine defaults, nothing applied'],
    ['realistic', 'Realistic', 'Soft light, shallow depth, bloom'],
    ['toon', 'Stylized Toon', 'Cel shading, ink outlines', true],
    ['graphic-ink', 'Graphic Ink', 'Flat paper, heavy line'],
    ['ink-wash', 'Ink Wash', 'Grey wash under a soft line'],
    ['pixel', 'Pixel Screen', 'Low resolution, few colours'],
    ['crosshatch', 'Crosshatch', 'Hatching stands in for shade'],
    ['one-bit', 'One-Bit', 'Two colours, dithered'],
    ['phosphor', 'Phosphor', 'Green CRT with scanlines'],
    ['retro-warm', 'Retro Warm', 'Faded amber film'],
    ['horror', 'Horror', 'Cold, crushed, heavy vignette'],
  ],
  quality: [
    { key: 'draft', name: 'Draft', blurb: 'Fastest. Good enough to judge shape.', cost: '×1' },
    { key: 'balanced', name: 'Balanced', blurb: 'What most builds ship with.', on: true, cost: '×1.4' },
    { key: 'high', name: 'High', blurb: 'Slower, for the final pass.', cost: '×2.2' },
  ],
  slots: [
    { key: 'hero', n: '01', kind: '3D', name: 'Hero asset', need: 'The object the player identifies with immediately.',
      brief: 'A readable hero with a strong silhouette', query: 'toy-sized girl explorer',
      sources: ['Wanaka', 'Poly Haven', 'Sketchfab'],
      results: [
        { th: 'ast-hero-a', name: 'Explorer girl · toon', meta: 'Wanaka · 4.2k tris · rigged', on: true },
        { th: 'ast-hero-b', name: 'Small adventurer', meta: 'Sketchfab · 6.8k tris · rigged' },
      ] },
    { key: 'kit', n: '02', kind: '3D', name: 'World kit', need: 'Reusable landmarks that define the route.',
      brief: 'Wooden dollhouse rooms and stairs', query: 'dollhouse room kit',
      sources: ['Wanaka', 'Poly Haven', 'Sketchfab'],
      results: [
        { th: 'ast-kit-a', name: 'Wooden room kit', meta: 'Wanaka · 12 pieces · modular' },
        { th: 'ast-kit-b', name: 'Toy blocks set', meta: 'Poly Haven · 8 pieces' },
      ] },
    { key: 'prop', n: '03', kind: '3D', name: 'Pickup', need: 'The thing the player is collecting.',
      brief: 'Puzzle piece, readable at distance', query: 'puzzle piece pickup',
      sources: ['Wanaka', 'Poly Haven', 'Sketchfab'],
      results: [
        { th: 'ast-prop-a', name: 'Puzzle piece · glow', meta: 'Wanaka · 320 tris', on: true },
        { th: 'ast-prop-b', name: 'Wooden token', meta: 'Sketchfab · 480 tris' },
      ] },
    { key: 'audio', n: '04', kind: 'Audio', name: 'Theme audio', need: 'A short loop that matches the session length.',
      brief: 'Warm music box, unhurried', query: 'music box loop',
      sources: ['Wanaka', 'Freesound'],
      results: [
        { th: 'ast-audio-a', name: 'Music box · 0:48', meta: 'Wanaka · loop' },
        { th: 'ast-audio-b', name: 'Toy piano bed · 1:10', meta: 'Freesound · loop' },
      ] },
  ],
  feel: [
    { key: 'forgive', label: 'Jump forgiveness', value: 42, low: 'Strict', high: 'Generous',
      note: 'How much coyote time and edge grace the player gets.' },
    { key: 'hazard', label: 'Hazard density', value: 55, low: 'Sparse', high: 'Gauntlet',
      note: 'How often something can end the run.' },
    { key: 'collect', label: 'Collectibles', value: 40, low: 'None', high: 'Packed', unit: 8,
      note: 'How many puzzle pieces are scattered on the route.' },
    { key: 'camera', label: 'Camera lead', value: 60, low: 'Locked', high: 'Anticipating',
      note: 'How far ahead the camera looks when the player moves.' },
  ],
  statement: 'Warm, whimsical wonder of being tiny inside a giant cozy toy world.',
  personality: [
    { key: 'cam', title: 'Camera feel', note: 'How the player reads motion and space.',
      options: [['Dynamic', 'Responsive movement with cinematic accents.', true],
                ['Grounded', 'Stable framing with restrained motion.'],
                ['Tactical', 'A wider view that prioritises readability.']] },
    { key: 'tone', title: 'Emotional tone', note: 'The feeling each play session should leave behind.',
      options: [['Energetic', 'Bright feedback and immediate momentum.', true],
                ['Atmospheric', 'World mood and anticipation lead.'],
                ['Playful', 'Expressive motion, low-friction experimentation.']] },
  ],
  stages: [
    { n: '01', name: 'Playable foundation', kind: 'Plan stage', crew: 'developer', on: true,
      deliver: ['Core player loop', 'Readable game state', 'Start, fail, and retry'],
      gates: ['A player can enter play, traverse the course, reach the goal, and restart.'] },
    { n: '02', name: 'World and visual language', kind: 'Visual stage', crew: 'artist', on: true,
      deliver: ['Hero character', 'Course sections', 'Goal presentation'],
      gates: ['Failure and recovery stay on the intended route without a stuck state.'] },
    { n: '03', name: 'Game systems', kind: 'Build stage', crew: 'developer', on: true,
      deliver: ['Checkpoints', 'Hazard recovery', 'Pickup rules'],
      gates: ['Visible and collision boundaries match from the gameplay camera.'] },
    { n: '04', name: 'Playtest and review', kind: 'Review stage', crew: 'tester', on: true,
      deliver: ['Runtime playtest', 'Issue fixes', 'Full acceptance suite'],
      gates: ['A player can enter play, traverse the course, reach the goal, and restart.',
              'Optional collectibles and hazards are tested only when the course uses them.'] },
  ],
  stretch: [
    { name: 'Wall jump on one late section', crew: 'developer', on: true },
    { name: 'Optional collectible path above the safe line', crew: 'developer', on: true },
  ],
};

const STEPS = [
  ['vision', '01', 'Game vision'],
  ['style', '02', 'Visual style'],
  ['assets', '03', 'World & assets'],
  ['feel', '04', 'Player feel'],
  ['review', '05', 'Review'],
];
const CREW = ['planner', 'artist', 'developer', 'tester', 'marketing'];
const CREW_NAME = { planner: 'Planner', artist: 'Artist', developer: 'Developer',
                    tester: 'Tester', marketing: 'Publisher' };

// ── Layout knobs ──────────────────────────────────────────────────
const KNOBS = {
  topH:    ['Top bar height', 44, 88, 2, 56, 'px'],
  split:   ['Left pane width', 34, 72, 1, 52, '%'],
  pad:     ['Pane padding', 8, 44, 2, 20, 'px'],
  gap:     ['Gap between blocks', 8, 40, 1, 16, 'px'],
  radius:  ['Corner radius', 4, 26, 1, 14, 'px'],
  title:   ['Title size', 15, 34, 1, 22, 'px'],
  fld:     ['Field text size', 11, 18, .5, 13.5, 'px'],
  secGap:  ['Section spacing', 10, 44, 1, 22, 'px'],
};
const TOGGLES = {
  coverFail: ['Cover failed (show error state)', false],
  showCost:  ['Cost and time on every choice', true],
  showCrew:  ['Crew faces in the top bar', true],
  openAll:   ['Review opens expanded', false],
};

const state = load();
let step = 0;
let scope = 'standard';
let style = 'toon';
let quality = 'balanced';
const picked = {};          // slot key → result index
PLAN.slots.forEach((s) => { const i = s.results.findIndex((r) => r.on); if (i >= 0) picked[s.key] = i; });
const feelVals = {};
PLAN.feel.forEach((f) => { feelVals[f.key] = f.value; });
const personality = { cam: 0, tone: 0 };
const stageOn = {};
PLAN.stages.forEach((s) => { stageOn[s.n] = s.on; });
PLAN.stretch.forEach((s, i) => { stageOn['x' + i] = s.on; });

function load() {
  const s = {};
  Object.entries(KNOBS).forEach(([k, v]) => { s[k] = v[4]; });
  Object.entries(TOGGLES).forEach(([k, v]) => { s[k] = v[1]; });
  try { Object.assign(s, JSON.parse(localStorage.getItem('ps2-layout') || '{}')); } catch (e) {}
  return s;
}
const save = () => { try { localStorage.setItem('ps2-layout', JSON.stringify(state)); } catch (e) {} };

function apply() {
  const r = document.documentElement.style;
  Object.entries(KNOBS).forEach(([k, v]) => r.setProperty('--' + k, state[k] + v[5]));
  const ps = document.querySelector('.ps');
  if (!ps) return;
  ps.classList.toggle('no-cost', !state.showCost);
  ps.classList.toggle('no-crew', !state.showCrew);
}

// ── Shell ─────────────────────────────────────────────────────────
function mount() {
  const wrap = el('div', 'ps');
  wrap.innerHTML = `
    <header class="top">
      <span class="brand"><img src="assets/crew-planner.webp" alt=""><b>Plan Studio</b></span>
      <ol class="steps" id="steps">
        ${STEPS.map(([k, n, t], i) => `
          <li class="step" data-s="${i}"><i></i><span><em>${n}</em>${t}</span></li>`).join('')}
      </ol>
      <span class="faces">${CREW.map((k) =>
        `<img src="assets/crew-${k}.webp" alt="${CREW_NAME[k]}" title="${CREW_NAME[k]} Wana">`).join('')}</span>
      <button class="x" id="close" aria-label="Close">✕</button>
    </header>

    <div class="body">
      <section class="show" id="show"></section>
      <main class="ctl" id="ctl"></main>
    </div>

    <footer class="bar">
      <span class="bar__l" id="bar-l"></span>
      <span class="bar__r">
        <button class="btn" id="back">Back</button>
        <button class="btn btn--go" id="next">Next</button>
      </span>
    </footer>`;
  document.getElementById('stage').appendChild(wrap);
  document.getElementById('stage').appendChild(knobPanel());
  wrap.querySelectorAll('.step').forEach((s) => { s.onclick = () => go(+s.dataset.s); });
  document.getElementById('back').onclick = () => go(step - 1);
  document.getElementById('next').onclick = () => {
    if (step === STEPS.length - 1) return flash('Approved — the crew starts building.');
    go(step + 1);
  };
  document.getElementById('close').onclick = () => flash('Closed. The plan stays in the project.');
  apply();
  go(0);
}

function go(i) {
  step = Math.max(0, Math.min(STEPS.length - 1, i));
  document.querySelectorAll('.step').forEach((s, k) => {
    s.classList.toggle('is-on', k === step);
    s.classList.toggle('is-done', k < step);
  });
  const show = document.getElementById('show');
  const ctl = document.getElementById('ctl');
  const view = [viewVision, viewStyle, viewAssets, viewFeel, viewReview][step]();
  show.innerHTML = view.show;
  ctl.innerHTML = view.ctl;
  ctl.scrollTop = 0;
  document.getElementById('bar-l').innerHTML =
    `Stage <b>${step + 1}</b> of ${STEPS.length}<i class="bar__sep"></i>${view.note}`;
  document.getElementById('back').disabled = step === 0;
  document.getElementById('next').textContent =
    step === STEPS.length - 1 ? 'Approve plan & start build →' : `Next · ${STEPS[step + 1][2]} →`;
  document.getElementById('next').classList.toggle('btn--wide', step === STEPS.length - 1);
  view.wire && view.wire();
}

// ── 01 · Game vision ──────────────────────────────────────────────
// The cover is the left pane, and when it fails it says so in the same
// frame instead of leaving alt text on a black rectangle.
function viewVision() {
  const sc = PLAN.scope.find((s) => s.key === scope);
  return {
    note: `${sc.name} scope · ${sc.credits} credits · playable in ${sc.time}`,
    show: state.coverFail ? `
      <div class="cover cover--fail">
        <span class="fail">
          <b>The cover did not come back</b>
          <em>Everything else in the plan is fine — the art can be retried on its own.</em>
          <button class="btn btn--go" id="retry">↻ Retry cover</button>
        </span>
      </div>`
      : `
      <figure class="cover">
        <img src="${PLAN.cover}" alt="Cover for ${esc(PLAN.title)}">
        <button class="ghost" id="retry">↻ Retry cover</button>
      </figure>`,
    ctl: `
      ${sec('Game information', `
        ${fld('Game title', `<input class="in in--title" value="${esc(PLAN.title)}">`)}
        ${fld('Genre', `<div class="pick" id="genre">
          ${['Adventure', 'Platformer', 'Puzzle', 'Collectathon'].map((g) =>
            `<button class="${g === PLAN.genre ? 'is-on' : ''}">${g}</button>`).join('')}
        </div>`)}
        ${fld('Playable promise', `<textarea class="in" rows="3">${esc(PLAN.promise)}</textarea>`)}
        ${fld('Player fantasy', `<textarea class="in" rows="2">${esc(PLAN.fantasy)}</textarea>`)}
      `)}

      ${sec('Reference', `
        <p class="hint">${PLAN.reference.note}</p>
        <div class="opts" id="ref">
          ${PLAN.reference.options.map((o) => `
            <button class="opt${o.on ? ' is-on' : ''}" data-k="${o.key}">
              <b>${o.name}</b>
              <ul>${o.beats.map((x) => `<li>${x}</li>`).join('')}</ul>
              <i class="tick"></i>
            </button>`).join('')}
        </div>`)}

      ${sec('Build scope', `
        <p class="hint">How much gets built before you see it running.</p>
        <div class="opts" id="scope">
          ${PLAN.scope.map((s) => `
            <button class="opt opt--row${s.key === scope ? ' is-on' : ''}" data-k="${s.key}">
              <span class="opt__t"><b>${s.name}</b><em>${s.blurb}</em></span>
              <span class="cost">${s.stages} stages · ${s.assets} assets<br><b>${s.credits} credits</b> · ${s.time}</span>
              <i class="tick"></i>
            </button>`).join('')}
        </div>`)}`,
    wire() {
      pickOne('#genre button', () => {});
      pickOne('#ref .opt', () => {});
      pickOne('#scope .opt', (b) => { scope = b.dataset.k; go(step); });
      const r = document.getElementById('retry');
      if (r) r.onclick = () => flash('Asking Artist Wana for another cover…');
    },
  };
}

// ── 02 · Visual style ─────────────────────────────────────────────
// The preview is the left pane and it is the same scene every time, so
// the eleven profiles compare like for like.
function viewStyle() {
  const cur = PLAN.styles.find((s) => s[0] === style) || PLAN.styles[0];
  const q = PLAN.quality.find((x) => x.key === quality);
  return {
    note: `${cur[1]} · ${q.name} quality · render ${q.cost}`,
    show: `
      <figure class="cover cover--pad">
        <img src="assets/style-${cur[0]}.jpg" alt="" id="style-shot">
        <figcaption class="shot__cap"><b>${cur[1]}</b><em>${cur[2]}</em></figcaption>
      </figure>`,
    ctl: `
      ${sec('Visual style', `
        <p class="hint">The profile applies to the whole build. The preview follows your pick.</p>
        <div class="tiles" id="styles">
          ${PLAN.styles.map((s) => `
            <button class="tile${s[0] === style ? ' is-on' : ''}" data-k="${s[0]}">
              <img src="assets/style-${s[0]}.jpg" alt="">
              <span>${s[1]}</span>
              <i class="tick"></i>
            </button>`).join('')}
        </div>`)}
      ${sec('Render quality', `
        <p class="hint">Fine-tuning stays in Project settings.</p>
        <div class="opts" id="quality">
          ${PLAN.quality.map((x) => `
            <button class="opt opt--row${x.key === quality ? ' is-on' : ''}" data-k="${x.key}">
              <span class="opt__t"><b>${x.name}</b><em>${x.blurb}</em></span>
              <span class="cost">render time<br><b>${x.cost}</b></span>
              <i class="tick"></i>
            </button>`).join('')}
        </div>`)}`,
    wire() {
      pickOne('#styles .tile', (b) => { style = b.dataset.k; go(step); });
      pickOne('#quality .opt', (b) => { quality = b.dataset.k; go(step); });
    },
  };
}

// ── 03 · World & assets ───────────────────────────────────────────
// Left: what the game will actually contain. Right: the slots you fill.
// Searching has a real skeleton and a count, so it never looks stalled.
function viewAssets() {
  const done = PLAN.slots.filter((s) => picked[s.key] != null).length;
  return {
    note: `${done} of ${PLAN.slots.length} slots locked`,
    show: `
      <div class="board">
        <header class="board__h"><b>What the build will contain</b><em>${done}/${PLAN.slots.length} locked</em></header>
        <div class="board__g">
          ${PLAN.slots.map((s) => {
            const r = picked[s.key] != null ? s.results[picked[s.key]] : null;
            return `
            <article class="slot${r ? ' is-set' : ''}">
              <div class="slot__th"${r ? ` style="background-image:url('assets/${r.th}.jpg')"` : ''}>
                ${r ? '' : '<span class="slot__empty">not chosen</span>'}
              </div>
              <b>${r ? r.name : s.name}</b>
              <em>${r ? r.meta : s.kind + ' · waiting'}</em>
            </article>`;
          }).join('')}
        </div>
      </div>`,
    ctl: PLAN.slots.map((s) => sec(`${s.n} · ${s.kind} · ${s.name}`, `
        <p class="hint">${s.need}</p>
        <div class="srcs">${s.sources.map((x, i) =>
          `<button class="src${i === 0 ? ' is-on' : ''}">${x}</button>`).join('')}</div>
        <div class="search">
          <input class="in in--q" value="${esc(s.query)}" data-slot="${s.key}">
          <span class="search__n" id="n-${s.key}">${s.results.length} results</span>
        </div>
        <div class="res" id="res-${s.key}">
          ${s.results.map((r, i) => `
            <button class="rez${picked[s.key] === i ? ' is-on' : ''}" data-slot="${s.key}" data-i="${i}">
              <span class="rez__th" style="background-image:url('assets/${r.th}.jpg')"></span>
              <span class="rez__t"><b>${r.name}</b><em>${r.meta}</em></span>
              <i class="tick"></i>
            </button>`).join('')}
        </div>`, s.key)).join(''),
    wire() {
      document.querySelectorAll('.rez').forEach((b) => {
        b.onclick = () => { picked[b.dataset.slot] = +b.dataset.i; go(step); };
      });
      document.querySelectorAll('.in--q').forEach((q) => {
        q.addEventListener('input', () => {
          const k = q.dataset.slot;
          const box = document.getElementById('res-' + k);
          const n = document.getElementById('n-' + k);
          n.textContent = 'searching…';
          box.classList.add('is-busy');
          box.innerHTML = '<span class="skel"></span><span class="skel"></span>';
          clearTimeout(q._t);
          q._t = setTimeout(() => go(step), 900);
        });
      });
    },
  };
}

// ── 04 · Player feel ──────────────────────────────────────────────
// The left pane draws what the numbers mean: a course whose spacing,
// hazards and pickups move with the sliders.
function viewFeel() {
  return {
    note: 'These values are sent to the build as constraints',
    show: `<div class="feelviz">${courseSVG()}</div>`,
    ctl: `
      ${sec('Tuning', `
        <p class="hint">Four numbers the build treats as hard constraints.</p>
        <div class="feels">
          ${PLAN.feel.map((f) => `
            <label class="feel">
              <span class="feel__k">${f.label}
                <b id="fv-${f.key}">${f.unit ? Math.round(feelVals[f.key] / 100 * 20) : feelVals[f.key] + '%'}</b></span>
              <input type="range" min="0" max="100" value="${feelVals[f.key]}" data-f="${f.key}">
              <span class="feel__e"><em>${f.low}</em><em>${f.high}</em></span>
              <span class="feel__n">${f.note}</span>
            </label>`).join('')}
        </div>`)}
      ${sec('Feel statement', `
        <p class="hint">Prose, not a constraint. It guides taste where numbers cannot.</p>
        <textarea class="in" rows="2">${esc(PLAN.statement)}</textarea>`)}
      ${PLAN.personality.map((p) => sec(p.title, `
        <p class="hint">${p.note}</p>
        <div class="opts" data-p="${p.key}">
          ${p.options.map((o, i) => `
            <button class="opt opt--row${personality[p.key] === i ? ' is-on' : ''}" data-i="${i}">
              <span class="opt__t"><b>${o[0]}</b><em>${o[1]}</em></span>
              <i class="tick"></i>
            </button>`).join('')}
        </div>`)).join('')}`,
    wire() {
      document.querySelectorAll('.feel input').forEach((r) => {
        r.addEventListener('input', () => {
          const f = PLAN.feel.find((x) => x.key === r.dataset.f);
          feelVals[f.key] = +r.value;
          document.getElementById('fv-' + f.key).textContent =
            f.unit ? Math.round(r.value / 100 * 20) : r.value + '%';
          document.querySelector('.feelviz').innerHTML = courseSVG();
        });
      });
      document.querySelectorAll('[data-p]').forEach((g) => {
        g.querySelectorAll('.opt').forEach((b) => {
          b.onclick = () => {
            g.querySelectorAll('.opt').forEach((o) => o.classList.remove('is-on'));
            b.classList.add('is-on');
            personality[g.dataset.p] = +b.dataset.i;
          };
        });
      });
    },
  };
}

// A course drawn from the four numbers: gaps widen as forgiveness drops,
// hazards multiply with density, pickups follow the collectible count.
function courseSVG() {
  const W = 900, H = 520;
  const forgive = feelVals.forgive, hazard = feelVals.hazard;
  const pickups = Math.round(feelVals.collect / 100 * 20);
  const lead = feelVals.camera;
  const gap = 34 + (100 - forgive) * 0.42;
  const plats = [];
  let x = 60;
  for (let i = 0; i < 7 && x < W - 120; i++) {
    const w = 90 + ((i * 37) % 60);
    const y = 300 + Math.sin(i * 1.1) * 62;
    plats.push([x, y, w]);
    x += w + gap;
  }
  const haz = [];
  const hazCount = Math.round(hazard / 100 * 9);
  for (let i = 0; i < hazCount; i++) {
    const p = plats[(i * 2 + 1) % plats.length];
    haz.push([p[0] + p[2] * 0.5 + (i % 2 ? 18 : -18), p[1] - 16]);
  }
  const picks = [];
  for (let i = 0; i < pickups; i++) {
    const p = plats[i % plats.length];
    picks.push([p[0] + 18 + (i * 29) % Math.max(30, p[2] - 30), p[1] - 42 - (i % 3) * 16]);
  }
  return `
  <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#171B24"/><stop offset="1" stop-color="#0E1017"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    <g opacity=".14">
      ${Array.from({ length: 9 }, (_, i) =>
        `<line x1="0" y1="${60 + i * 52}" x2="${W}" y2="${60 + i * 52}" stroke="#fff" stroke-width="1"/>`).join('')}
    </g>
    <rect x="${40 + lead * 1.6}" y="70" width="360" height="380" rx="16"
          fill="none" stroke="rgba(111,227,190,.42)" stroke-dasharray="6 6"/>
    <text x="${52 + lead * 1.6}" y="94" fill="rgba(111,227,190,.75)"
          font-family="ui-monospace,monospace" font-size="13">camera lead</text>
    ${plats.map(([px, py, pw]) => `
      <rect x="${px}" y="${py}" width="${pw}" height="16" rx="8" fill="#6E7A92"/>
      <rect x="${px}" y="${py}" width="${pw}" height="5" rx="3" fill="#93A0B8"/>`).join('')}
    ${haz.map(([hx, hy]) => `
      <path d="M${hx} ${hy - 14} L${hx + 12} ${hy + 8} L${hx - 12} ${hy + 8} Z" fill="#FF6B5E"/>`).join('')}
    ${picks.map(([cx, cy]) => `
      <circle cx="${cx}" cy="${cy}" r="7" fill="#F4D35E"/>
      <circle cx="${cx}" cy="${cy}" r="12" fill="none" stroke="rgba(244,211,94,.35)"/>`).join('')}
    <g transform="translate(${plats[0][0] + 26} ${plats[0][1] - 46})">
      <circle cx="0" cy="-14" r="11" fill="#EFE1D4"/>
      <rect x="-11" y="-2" width="22" height="30" rx="10" fill="#D0585C"/>
    </g>
    <g transform="translate(${plats[plats.length - 1][0] + plats[plats.length - 1][2] / 2} ${plats[plats.length - 1][1] - 72})">
      <rect x="-3" y="0" width="6" height="72" fill="#8A93A6"/>
      <path d="M3 4 L54 20 L3 36 Z" fill="#6FE3BE"/>
    </g>
  </svg>`;
}

// ── 05 · Review ───────────────────────────────────────────────────
// Collapsed by default: the summary answers "what am I approving", and
// the detail is one click away for anyone who wants to audit it.
function viewReview() {
  const sc = PLAN.scope.find((s) => s.key === scope);
  const on = PLAN.stages.filter((s) => stageOn[s.n]).length;
  const gates = PLAN.stages.filter((s) => stageOn[s.n]).reduce((a, s) => a + s.gates.length, 0);
  const assets = Object.keys(picked).length;
  const cur = PLAN.styles.find((s) => s[0] === style);
  return {
    note: `${sc.credits} credits · playable in ${sc.time}`,
    show: `
      <div class="summary">
        <figure class="summary__art">
          ${state.coverFail
            ? `<span class="fail fail--sm"><b>Cover pending</b><em>The build does not wait for it.</em></span>`
            : `<img src="${PLAN.cover}" alt="">`}
        </figure>
        <h2>${esc(PLAN.title)}</h2>
        <p>${esc(PLAN.promise)}</p>
        <div class="summary__g">
          <span><em>Scope</em>${sc.name}</span>
          <span><em>Style</em>${cur[1]}</span>
          <span><em>Assets locked</em>${assets} of ${PLAN.slots.length}</span>
          <span><em>Stages</em>${on}</span>
          <span><em>Review gates</em>${gates}</span>
          <span><em>Cost</em>${sc.credits}</span>
        </div>
        <p class="summary__n">You will be asked to weigh in whenever a Wana needs a decision. Nothing ships without you.</p>
      </div>`,
    ctl: `
      ${sec('Build stages', `
        <p class="hint">Turn one off and it is not sent. Open one to read what it delivers.</p>
        <div class="rows">
          ${PLAN.stages.map((s) => row(s.n, s.name, s.kind, s.crew, stageOn[s.n], s)).join('')}
        </div>`)}
      ${sec('Optional stretch', `
        <p class="hint">Included only when the scope can carry them.</p>
        <div class="rows">
          ${PLAN.stretch.map((s, i) => row('x' + i, s.name, 'Stretch', s.crew, stageOn['x' + i])).join('')}
        </div>`)}`,
    wire() {
      document.querySelectorAll('.row__head').forEach((h) => {
        h.onclick = (e) => {
          if (e.target.closest('.sw')) return;
          h.closest('.row').classList.toggle('is-open');
        };
      });
      document.querySelectorAll('.sw').forEach((s) => {
        s.onclick = (e) => {
          e.stopPropagation();
          const k = s.dataset.k;
          stageOn[k] = !stageOn[k];
          go(step);
        };
      });
      if (state.openAll) document.querySelectorAll('.row').forEach((r) => r.classList.add('is-open'));
    },
  };
}

function row(k, name, kind, crew, on, full) {
  return `
    <article class="row${on ? '' : ' is-off'}${full ? '' : ' row--flat'}">
      <header class="row__head">
        ${full ? '<i class="caret"></i>' : '<i class="caret caret--none"></i>'}
        <span class="row__n">${k.startsWith('x') ? '' : k}</span>
        <span class="row__t"><b>${name}</b><em>${kind}</em></span>
        <img class="row__who" src="assets/crew-${crew}.webp" alt="${CREW_NAME[crew]}" title="${CREW_NAME[crew]} Wana">
        <button class="sw${on ? ' is-on' : ''}" data-k="${k}" aria-label="Include"><i></i></button>
      </header>
      ${full ? `
      <div class="row__body">
        <div>
          <span class="row__k">Delivers</span>
          <ul>${full.deliver.map((d) => `<li>${d}</li>`).join('')}</ul>
        </div>
        <div>
          <span class="row__k">Passes when</span>
          <ul>${full.gates.map((g) => `<li>${g}</li>`).join('')}</ul>
        </div>
      </div>` : ''}
    </article>`;
}

// ── Bits ──────────────────────────────────────────────────────────
function sec(title, inner) {
  return `<section class="sec"><h3>${title}</h3>${inner}</section>`;
}
function fld(label, input) {
  return `<label class="f"><span class="f__k">${label}</span>${input}</label>`;
}
function pickOne(sel, after) {
  const nodes = document.querySelectorAll(sel);
  nodes.forEach((b) => {
    b.onclick = () => {
      nodes.forEach((o) => o.classList.remove('is-on'));
      b.classList.add('is-on');
      after && after(b);
    };
  });
}

// ── Layout panel ──────────────────────────────────────────────────
function knobPanel() {
  const p = el('aside', 'knobs');
  p.id = 'knobs';
  p.innerHTML = `
    <header class="knobs__top">
      <b>Layout</b>
      <span>
        <button class="knobs__x" id="k-reset">Reset</button>
        <button class="knobs__x" id="k-copy">Copy</button>
        <button class="knobs__x knobs__x--go" id="k-save">Save</button>
        <button class="knobs__x" id="k-hide">–</button>
      </span>
    </header>
    <div class="knobs__body">
      ${Object.entries(KNOBS).map(([k, [lab, min, max, st]]) => `
        <label class="knob">
          <span>${lab}<b id="kv-${k}">${state[k]}</b></span>
          <input type="range" id="kk-${k}" min="${min}" max="${max}" step="${st}" value="${state[k]}">
        </label>`).join('')}
      <div class="knobs__rule"></div>
      ${Object.entries(TOGGLES).map(([k, [lab]]) => `
        <label class="knob knob--t">
          <input type="checkbox" id="kk-${k}" ${state[k] ? 'checked' : ''}><span>${lab}</span>
        </label>`).join('')}
    </div>`;
  setTimeout(() => {
    Object.keys(KNOBS).forEach((k) => {
      const r = document.getElementById('kk-' + k);
      r.addEventListener('input', () => {
        state[k] = parseFloat(r.value);
        document.getElementById('kv-' + k).textContent = state[k];
        apply(); save();
      });
    });
    Object.keys(TOGGLES).forEach((k) => {
      const c = document.getElementById('kk-' + k);
      c.addEventListener('change', () => { state[k] = c.checked; apply(); save(); go(step); });
    });
    const kn = document.getElementById('knobs');
    document.getElementById('k-hide').onclick = () => kn.classList.toggle('is-min');
    document.getElementById('k-reset').onclick = () => {
      Object.entries(KNOBS).forEach(([k, v]) => { state[k] = v[4]; });
      Object.entries(TOGGLES).forEach(([k, v]) => { state[k] = v[1]; });
      save(); location.reload();
    };
    const asCss = () => ['/* Plan Studio v2 — settled layout */', ':root{',
      ...Object.entries(KNOBS).map(([k, v]) => `  --${k}: ${state[k]}${v[5]};   /* ${v[0]} */`), '}',
      ...Object.entries(TOGGLES).map(([k, v]) => `/* ${v[0]}: ${state[k] ? 'on' : 'off'} */`)].join('\n');
    document.getElementById('k-copy').onclick = () =>
      navigator.clipboard.writeText(asCss()).then(() => flash('Values copied.'), () => flash('Copy blocked — use Save.'));
    document.getElementById('k-save').onclick = () => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([asCss()], { type: 'text/css' }));
      a.download = 'plan-studio-v2-layout.css';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      flash('Saved · plan-studio-v2-layout.css');
    };
    const top = kn.querySelector('.knobs__top');
    let drag = null;
    top.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      const r = kn.getBoundingClientRect();
      drag = { dx: e.clientX - r.left, dy: e.clientY - r.top };
      kn.style.right = 'auto'; kn.style.bottom = 'auto';
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!drag) return;
      kn.style.left = Math.max(6, Math.min(innerWidth - 60, e.clientX - drag.dx)) + 'px';
      kn.style.top = Math.max(6, Math.min(innerHeight - 40, e.clientY - drag.dy)) + 'px';
    });
    window.addEventListener('mouseup', () => { drag = null; });
  }, 0);
  return p;
}

function flash(msg) {
  const t = el('div', 'toast', msg);
  document.getElementById('stage').appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

mount();
