/* ──────────────────────────────────────────────────────────────────
   Wanaka · Plan Studio — a faithful copy of what shipped.

   Measured off studio.dev.wanaka.app at 1920×936 and rebuilt here so
   the two can be compared side by side and changed one stage at a
   time. Numbers taken from the live DOM:

     page            #1D1D26
     section card    #232427, radius 10
     header divider  #2E3033, header row 10px 12px, 13px/500
     select          #1C1D1F on #2E3033, radius 6, 268×32
     option card     #232427, radius 8, padding 12
     ring            box-shadow 0 0 0 1px  #2E3033 → #A9ABB3 when chosen
     rail            336px wide, padding 0 16px 12px, 1px left divider
     left pane       starts x=11, y=61
     footer          Close 66×34, radius 10, Next 160×34
     stage label     8px, rgba(255,255,255,.28)

   Nothing here is a proposal. ?after loads the reworked version.
   ────────────────────────────────────────────────────────────────── */

const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ── The project, as the live plan has it ──────────────────────────
const P = {
  title: 'Tiny Explorer: The Wooden Toy House',
  genre: 'Adventure',
  promise: 'A tiny toy-sized girl explores a giant wooden dollhouse to collect scattered puzzle pieces and complete the story puzzle.',
  fantasy: 'Feel small and curious, discovering hidden treasures inside a cozy, oversized toy world',
  cover: 'assets/cover-girl.jpg',
  // the genre decides what game this is, so it is a picture decision
  genres: [
    ['adventure', 'Adventure', 'Explore a world and find your way through', true],
    ['platformer', 'Platformer', 'Jump, land, and time your moves'],
    ['puzzle', 'Puzzle', 'Work out the answer, then pull it off'],
    ['collect', 'Collectathon', 'Sweep a place clean of things worth having'],
    ['racing', 'Racing', 'Get there first, or beat the clock'],
    ['action', 'Action', 'React fast, keep yourself alive'],
  ],
  // each scope says what you get, not just how large it is
  scopes: [
    ['slice', 'Slice', 'One room, one puzzle — a demo that proves the feel.',
     '1 room · 3 assets', '180–260 credits · ~6 min'],
    ['standard', 'Standard', 'The whole course, from the first step to the goal.',
     '4 rooms · 6 assets', '320–560 credits · ~12 min', true],
    ['ambitious', 'Ambitious', 'Extra rooms, optional paths, and a polish pass.',
     '7 rooms · 11 assets', '640–980 credits · ~25 min'],
  ],
  styles: [
    ['default', 'Default'], ['realistic', 'Realistic'], ['toon', 'Stylized Toon', true],
    ['graphic-ink', 'Graphic Ink'], ['ink-wash', 'Ink Wash'], ['pixel', 'Pixel Screen'],
    ['crosshatch', 'Crosshatch'], ['one-bit', 'One-Bit'], ['phosphor', 'Phosphor'],
    ['retro-warm', 'Retro Warm'], ['horror', 'Horror'],
  ],
  quality: [['Performance'], ['Balanced', true], ['Fidelity']],
  slots: [
    ['01', '3d', 'Hero asset', 'The object the player identifies with immediately.',
     'A readable hero with a strong silhouette', '3D', 'character', ['Wanaka', 'Poly Haven', 'Sketchfab']],
    ['02', '3d', 'World kit', 'Reusable landmarks that define the route',
     'Reusable landmarks that define the route', '3D', 'environment', ['Wanaka', 'Poly Haven', 'Sketchfab']],
    ['03', 'audio', 'Theme audio', 'A short loop that matches the session length',
     'A short loop that matches the session length', 'Audio', 'music loop', ['Wanaka', 'Freesound']],
  ],
  knobs: [
    ['Jump forgiveness', 42, 'Strict', 'Generous'],
    ['Hazard density', 55, 'Sparse', 'Gauntlet'],
    ['Collectibles', 8, 'None', 'Packed', true],
    ['Camera lead', 60, 'Locked', 'Anticipating'],
  ],
  feelStatement: 'Warm, whimsical wonder of being tiny inside a giant cozy toy world',
  personality: [
    ['Camera feel', 'How the player reads motion and space.', [
      ['Dynamic', 'Responsive movement with cinematic accents.', true],
      ['Grounded', 'Stable framing with restrained motion.'],
      ['Tactical', 'A wider view that prioritizes readability.']]],
    ['Emotional tone', 'The feeling each play session should leave behind.', [
      ['Energetic', 'Bright feedback and immediate momentum.', true],
      ['Atmospheric', 'World mood and anticipation lead the experience.'],
      ['Playful', 'Expressive motion and low-friction experimentation.']]],
  ],
  stretch: [
    ['Hidden room behind a breakable wall'],
    ['A companion that marks missing pickups'],
  ],
  stages: [
    ['01', 'Playable foundation', 'Core player loop, Readable game state, Start, fail, and retry', 'Plan stage',
     ['Core player loop', 'Readable game state', 'Start, fail, and retry'],
     ['A player can enter play, traverse the representative course, reach the goal, and restart.']],
    ['02', 'World and visual language', 'Hero character, Course sections, Goal presentation', 'Visual stage',
     ['Hero character', 'Course sections', 'Goal presentation'],
     ['Failure and recovery stay on the intended route without a stuck state.']],
    ['03', 'Game systems', 'Checkpoints, Hazard recovery, Pickup rules', 'Build stage',
     ['Checkpoints', 'Hazard recovery', 'Pickup rules'],
     ['Visible and collision boundaries match from the gameplay camera.']],
    ['04', 'Playtest and review', 'Runtime playtest, Issue fixes, Full acceptance suite', 'Review stage',
     ['Runtime playtest', 'Issue fixes', 'Full acceptance suite'],
     ['A player can enter play, traverse the representative course, reach the goal, and restart.',
      'Failure and recovery stay on the intended route without a stuck state.',
      'Visible and collision boundaries match from the gameplay camera.',
      'Optional collectibles and hazards are tested only when the course uses them.']],
  ],
};

// Small marks, so a genre or a scope reads before the words do.
const ICON = {
  adventure: sv('<path d="M3 15l4-9 4 6 3-4 3 7z"/><circle cx="13.5" cy="4.5" r="1.6"/>'),
  platformer: sv('<rect x="1.5" y="12.5" width="6" height="2.2" rx="1.1"/><rect x="10.5" y="8.5" width="6" height="2.2" rx="1.1"/><circle cx="4.5" cy="8.5" r="2.2"/>'),
  puzzle: sv('<path d="M3 3h5v2.2a1.6 1.6 0 103.2 0V3H15v5h-2.2a1.6 1.6 0 100 3.2H15V15h-5v-2.2a1.6 1.6 0 10-3.2 0V15H3z"/>'),
  collect: sv('<circle cx="5" cy="5.5" r="2.3"/><circle cx="12.5" cy="7" r="2.3"/><circle cx="7.5" cy="12.5" r="2.3"/><circle cx="13.5" cy="13" r="1.6"/>'),
  racing: sv('<path d="M2 11.5h14M4.5 11.5a2 2 0 104 0M10 11.5a2 2 0 104 0"/><path d="M3.5 11.5l2-4h7l2 4"/>'),
  action: sv('<path d="M9.5 1.5L4 10h4l-1.5 6.5L14 8h-4z"/>'),
  slice: sv('<rect x="2.5" y="5.5" width="6" height="7" rx="1.4"/>'),
  standard: sv('<rect x="1.5" y="5.5" width="5" height="7" rx="1.4"/><rect x="7.5" y="5.5" width="5" height="7" rx="1.4"/><rect x="13.5" y="5.5" width="3" height="7" rx="1.4"/>'),
  ambitious: sv('<rect x="1.5" y="7.5" width="4" height="5" rx="1.2"/><rect x="6.5" y="4.5" width="4" height="8" rx="1.2"/><rect x="11.5" y="6" width="4" height="6.5" rx="1.2"/><path d="M13.2 1l.7 1.6 1.7.2-1.3 1.2.4 1.7-1.5-.9-1.5.9.4-1.7-1.3-1.2 1.7-.2z"/>'),
};
function sv(inner) {
  return '<svg class="ic" viewBox="0 0 18 18" fill="none" stroke="currentColor" ' +
         'stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">' + inner + '</svg>';
}

const STEPS = [['01', 'Overview'], ['02', 'Game vision'], ['03', 'World & assets'],
               ['04', 'Player feel'], ['05', 'Review']];
const CREW = ['planner', 'artist', 'developer', 'tester', 'marketing'];

let step = 0;

// ── Shell ─────────────────────────────────────────────────────────
function mount() {
  const w = el('div', 'ws');
  w.innerHTML = `
    <header class="ws__top">
      <span class="ws__brand"><img src="assets/crew-planner.webp" alt=""><b>Plan Studio</b></span>
      <nav class="ws__steps" id="steps">
        ${STEPS.map(([n, t], i) => `
          <button class="st" data-i="${i}"><i></i><em>${n}</em><span>${t}</span></button>`).join('')}
      </nav>
      <span class="ws__faces">${CREW.map((k) => `<img src="assets/crew-${k}.webp" alt="">`).join('')}</span>
      <button class="ws__x" title="Close">✕</button>
    </header>
    <div class="ws__main" id="main"></div>
    <footer class="ws__foot">
      <span class="ws__stage" id="stagelbl"></span>
      <span class="ws__acts" id="acts"></span>
    </footer>`;
  document.getElementById('stage').appendChild(w);
  w.querySelectorAll('.st').forEach((b) => { b.onclick = () => go(+b.dataset.i); });
  go(0);
}

function go(i) {
  step = Math.max(0, Math.min(4, i));
  document.querySelectorAll('.st').forEach((b, k) => b.classList.toggle('is-on', k === step));
  document.getElementById('main').innerHTML =
    [stOverview, stVision, stAssets, stFeel, stReview][step]();
  document.getElementById('main').scrollTop = 0;
  document.getElementById('stagelbl').textContent = `Stage ${step + 1} of 5`;
  document.getElementById('acts').innerHTML = step === 0
    ? `<button class="b b--sec">Close</button><button class="b b--go">Next<i>↗</i></button>`
    : step === 4
      ? `<button class="b b--sec" data-back>Back</button>
         <button class="b b--sec">Regenerate with Agent</button>
         <button class="b b--go">Approve plan &amp; start build<i>↗</i></button>`
      : `<button class="b b--sec" data-back>Back</button><button class="b b--go">Next<i>↗</i></button>`;
  const acts = document.getElementById('acts');
  const back = acts.querySelector('[data-back]');
  if (back) back.onclick = () => go(step - 1);
  const nxt = acts.querySelector('.b--go');
  if (nxt && step < 4) nxt.onclick = () => go(step + 1);
  wire();
}

// ── 01 · Overview ─────────────────────────────────────────────────
function stOverview() {
  return `
    <div class="split">
      <section class="pane">
        <figure class="shot shot--art">
          <img src="${P.cover}" alt="">
          <button class="shot__retry">Retry cover</button>
        </figure>
      </section>
      <aside class="rail">
        ${card('GAME INFORMATION', `
          <label class="lbl">Game title</label>
          <input class="inp" value="${esc(P.title)}">
          <label class="lbl">Genre</label>
          ${genreField()}
          <label class="lbl">Core gameplay</label>
          <textarea class="ta ta--tall">${esc(P.promise)}</textarea>
          <label class="lbl">Player experience</label>
          <textarea class="ta">${esc(P.fantasy)}</textarea>`)}
        ${card('BUILD SCOPE', P.scopes.map(([k, n, d, what, cost, on]) => `
            <button class="scope${on ? ' is-on' : ''}" data-k="${k}">
              <span class="scope__hd">${ICON[k]}<b>${n}</b></span>
              <span class="scope__more"><span>${d}</span>
                <em>${what}<i>${cost}</i></em></span>
            </button>`).join(''))}
      </aside>
    </div>`;
}

// ── 02 · Game vision ──────────────────────────────────────────────
function stVision() {
  const cur = P.styles.find((s) => s[2]) || P.styles[0];
  return `
    <div class="split">
      <section class="pane">
        <div class="preview">
          <img src="assets/style-${cur[0]}.jpg" alt="" id="pv">
          <div class="tip" id="tip">
            <b>${cur[1]}</b>
            <em>${cur[1]} (cel shading, ink outlines)</em>
            <em>Palette applies in build</em>
          </div>
        </div>
      </section>
      <aside class="rail">
        ${card('VISUAL STYLE', `
          <p class="note">Pick a registered Visual Profile. The preview follows the selection.</p>
          <div class="grid2" id="styles">
            ${P.styles.map(([k, n, on]) => `
              <button class="sty${on ? ' is-on' : ''}" data-k="${k}" data-n="${esc(n)}">
                <img src="assets/style-${k}.jpg" alt=""><span>${n}</span>
              </button>`).join('')}
          </div>`)}
        ${card('RENDER QUALITY', `
          <p class="note">Choose a quality tier. Fine-tuning stays in Project Settings.</p>
          ${P.quality.map(([n, on]) =>
            `<button class="pickcard pickcard--row${on ? ' is-on' : ''}"><b>${n}</b></button>`).join('')}`)}
      </aside>
    </div>`;
}

// ── 03 · World & assets ───────────────────────────────────────────
function stAssets() {
  return `
    <div class="wide">
      ${band('ASSET CONTRACT · Pick the ingredients before the build',
             'Search the live catalog and lock real alternatives into the plan.')}
      ${P.slots.map(([n, kind, name, need, brief, kindLabel, query, srcs]) => `
        <section class="blk">
          <header class="blk__h"><i class="h"></i>${n} · ${kind} · ${name}</header>
          <p class="blk__p">${need}</p>
          <div class="chips">${srcs.map((s, i) =>
            `<button class="chip${i === 0 ? ' is-on' : ''}">${s}</button>`).join('')}</div>
          <div class="choose">Choose</div>
          <p class="blk__b">${brief}</p>
          <p class="blk__k">${kindLabel}</p>
          <p class="blk__s"><i class="spin"></i>Searching Wanaka and external catalogs...</p>
          <div class="qrow">
            <input class="inp inp--q" value="${query}">
            <span class="qstate">Searching...</span>
          </div>
        </section>`).join('')}
    </div>`;
}

// ── 04 · Player feel ──────────────────────────────────────────────
function stFeel() {
  return `
    <div class="wide">
      ${band('PLAYER FEEL · Tune the game before code hardens',
             'These values are sent as explicit implementation constraints.')}
      <div class="knobs4">
        ${P.knobs.map(([n, v, lo, hi, plain]) => `
          <div class="knob">
            <span class="knob__t">${n}<b>${plain ? v : v + '%'}</b></span>
            <input type="range" min="0" max="100" value="${plain ? v * 8 : v}">
            <span class="knob__e"><em>${lo}</em><em>${hi}</em></span>
          </div>`).join('')}
      </div>
      ${band('FEELING · Design prose, not a typed assertion',
             'Tone, camera, and session length guide taste. They are not numeric constraints.')}
      <div class="blk blk--flat">
        <label class="lbl">Feel statement</label>
        <textarea class="ta ta--wide">${esc(P.feelStatement)}</textarea>
      </div>
      ${band('PERSONALITY · Make the experience yours', '')}
      ${P.personality.map(([t, note, opts]) => `
        <section class="blk">
          <header class="blk__h"><i class="h"></i>${t}</header>
          <p class="blk__p">${note}</p>
          <div class="grid3">
            ${opts.map(([n, d, on]) => `
              <button class="pickcard${on ? ' is-on' : ''}"><b>${n}</b><span>${d}</span></button>`).join('')}
          </div>
        </section>`).join('')}
    </div>`;
}

// ── 05 · Review ───────────────────────────────────────────────────
function stReview() {
  const rowOf = (n, name, sum, kind, deliver, gates) => `
    <section class="blk">
      <header class="blk__h"><i class="h"></i>${n ? n + ' · ' : ''}${name}</header>
      <p class="blk__p">${sum}</p>
      <p class="blk__k">${kind}</p>
      <label class="inc"><input type="checkbox" checked><span>Included</span></label>
      <div class="cols">
        <div><span class="colk">DELIVERABLES</span>
          <ul>${deliver.map((d) => `<li>${d}</li>`).join('')}</ul></div>
        <div><span class="colk">REVIEW GATE</span>
          <ul>${gates.map((g) => `<li>${g}</li>`).join('')}</ul></div>
      </div>
    </section>`;
  return `
    <div class="wide">
      ${band('READY FOR YOUR CHECKPOINT · ' + esc(P.title), '')}
      <p class="blk__p blk__p--top">${esc(P.promise)}</p>
      <p class="blk__p">4 build stages · 5 asset decisions · 5 unresolved slots · 6 success checks</p>
      <button class="wideb">Auto-fill unresolved with top result</button>
      <div class="shot shot--flat">
        <span class="shot__alt">${esc(P.title)} review cover</span>
      </div>
      <button class="wideb">Retry AI cover</button>
      <p class="blk__p">Could not generate the cover. Please retry.</p>

      ${band('BUILD STAGES', 'Stretch items stay optional. Disabled stages are not sent.')}
      ${P.stretch.map(([n]) => rowOf('', n, 'Included when the build scope can carry it.',
        'Optional stretch', [], [])).join('')}
      ${P.stages.map(([n, name, sum, kind, d, g]) => rowOf(n, name, sum, kind, d, g)).join('')}
      ${band('KNOBS AND FEEL', '')}
    </div>`;
}

// ── Bits ──────────────────────────────────────────────────────────
// Genre sits where it shipped — second in Game information — but it opens
// into six marked options, and each explains itself only on hover.
function genreField() {
  const cur = P.genres.find((g) => g[3]) || P.genres[0];
  return `
    <div class="gpick" id="gpick">
      <button class="gpick__now" id="gpick-now">
        ${ICON[cur[0]]}<b>${cur[1]}</b><i class="chev"></i>
      </button>
      <div class="gpick__list">
        ${P.genres.map(([k, n, d, on]) => `
          <button class="gen${on ? ' is-on' : ''}" data-k="${k}" data-n="${n}">
            <span class="gen__hd">${ICON[k]}<b>${n}</b></span>
            <span class="gen__more">${d}</span>
          </button>`).join('')}
      </div>
    </div>`;
}

function card(title, inner) {
  return `<section class="sect">
    <header class="sect__h"><i class="h"></i>${title}</header>
    <div class="sect__b">${inner}</div>
  </section>`;
}
function band(title, note) {
  return `<div class="band"><header class="band__h"><i class="h"></i>${title}</header>${
    note ? `<p class="band__p">${note}</p>` : ''}</div>`;
}

function wire() {
  document.querySelectorAll('.pickcard').forEach((b) => {
    b.onclick = () => {
      const grp = b.parentElement;
      grp.querySelectorAll('.pickcard').forEach((o) => o.classList.remove('is-on'));
      b.classList.add('is-on');
    };
  });
  const styles = document.getElementById('styles');
  if (styles) {
    styles.querySelectorAll('.sty').forEach((b) => {
      b.onclick = () => {
        styles.querySelectorAll('.sty').forEach((o) => o.classList.remove('is-on'));
        b.classList.add('is-on');
        document.getElementById('pv').src = `assets/style-${b.dataset.k}.jpg`;
        const tip = document.getElementById('tip');
        tip.querySelector('b').textContent = b.dataset.n;
        tip.querySelectorAll('em')[0].textContent = b.dataset.n + ' (cel shading, ink outlines)';
      };
    });
  }
  const gp = document.getElementById('gpick');
  if (gp) {
    document.getElementById('gpick-now').onclick = () => gp.classList.toggle('is-open');
    gp.querySelectorAll('.gen').forEach((b) => {
      b.onclick = () => {
        gp.querySelectorAll('.gen').forEach((o) => o.classList.remove('is-on'));
        b.classList.add('is-on');
        const now = document.getElementById('gpick-now');
        now.innerHTML = b.querySelector('.gen__hd').innerHTML + '<i class="chev"></i>';
        gp.classList.remove('is-open');
      };
    });
  }
  document.querySelectorAll('.scope').forEach((b) => {
    b.onclick = () => {
      b.parentElement.querySelectorAll('.scope').forEach((o) => o.classList.remove('is-on'));
      b.classList.add('is-on');
    };
  });
  document.querySelectorAll('.chip').forEach((c) => {
    c.onclick = () => {
      c.parentElement.querySelectorAll('.chip').forEach((o) => o.classList.remove('is-on'));
      c.classList.add('is-on');
    };
  });
}

mount();
