/**
 * tv-remote-card — Home Assistant Lovelace Custom Card
 *
 * type: custom:tv-remote-card
 *
 * Config options:
 *   card_width:    CSS width  e.g. "100%", "800px"   (default: 100%)
 *   card_height:   CSS height e.g. "auto", "900px"   (default: auto)
 *   extra_buttons:
 *     - label:  "My Scene"
 *       script: "script.my_scene"
 *       color:  "#ff4757"          # optional hex
 *       icon:   "mdi:movie"        # optional MDI name or image URL
 */

const ICON_STORE_KEY = 'tv_remote_custom_icons';

const GEAR_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;

// ─── SVG icons ────────────────────────────────────────────────────────────────
const SVG = {
  power:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2v10M5.64 5.64A9 9 0 1 0 18.36 5.64"/></svg>`,
  volUp:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="19" y1="9" x2="19" y2="15"/><line x1="22" y1="6" x2="22" y2="18"/></svg>`,
  volDown:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="19" y1="9" x2="19" y2="15"/></svg>`,
  mute:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
  chUp:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  chDown:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  dUp:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  dDown:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  dLeft:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  dRight:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  ok:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="9" stroke-dasharray="2 3"/></svg>`,
  thumbUp:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,
  thumbDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>`,
  guide:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  info:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  play:      `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  record:    `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>`,
  pause:     `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  skipBack:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>`,
  skipFwd:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>`,
  enter:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>`,
  rokuBack:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  home:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  playpause: `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 13 12 5 21 5 3"/><rect x="15" y="3" width="4" height="18" rx="1"/></svg>`,
  rew:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><polygon points="10 20 0 12 10 4 10 20"/></svg>`,
  ffd:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><polygon points="14 4 24 12 14 20 14 4"/></svg>`,
  tv:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  globe:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  signal:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  house:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  scifi:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 3-2 5-5 8-3-3-5-5-5-8a5 5 0 0 1 5-5z"/><circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none"/></svg>`,
  prime:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/><line x1="19" y1="12" x2="23" y2="12"/></svg>`,
  plex:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/><line x1="1" y1="3" x2="1" y2="21"/></svg>`,
  jellyfin:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  star:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
};

// Default colour cycle for extra buttons
const EXTRA_PALETTE = [
  '#00d4ff','#2ed573','#ff9f43','#a259ff','#ff4757',
  '#1e90ff','#00cec9','#fd79a8','#6c5ce7','#ff6b81',
];

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? `${parseInt(m[1],16)},${parseInt(m[2],16)},${parseInt(m[3],16)}` : '0,212,255';
}

// ─── HTML helpers ──────────────────────────────────────────────────────────────
function chBtn(cls, script, iconKey, defaultSvg, label, customStyle = '') {
  return `<div class="ch-btn-wrap">
    <button class="ch-btn ${cls}" style="${customStyle}" data-script="${script}">
      <span class="ch-icon btn-icon" data-key="${iconKey}">${defaultSvg}</span>
      <span class="ch-label">${label}</span>
    </button>
    <button class="ch-edit-btn" data-edit="${iconKey}" data-label="${label}">${GEAR_SVG}</button>
  </div>`;
}

function mediaBtn(cls, script, iconKey, defaultSvg, label) {
  return `<div class="btn-media-wrap">
    <button class="btn btn-media ${cls}" data-script="${script}">
      <span class="btn-icon" data-key="${iconKey}">${defaultSvg}</span>${label}
    </button>
    <button class="edit-icon-btn" data-edit="${iconKey}" data-label="${label}">${GEAR_SVG}</button>
  </div>`;
}

function extraBtnHtml(btn, idx) {
  const color  = btn.color || EXTRA_PALETTE[idx % EXTRA_PALETTE.length];
  const rgb    = hexToRgb(color);
  const safeLabel = (btn.label || 'Button').replace(/[<>&"]/g, c =>
    ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
  let iconHtml;
  if (!btn.icon) {
    iconHtml = SVG.star;
  } else if (btn.icon.startsWith('mdi:')) {
    iconHtml = `<ha-icon icon="${btn.icon}" style="--mdc-icon-size:20px;"></ha-icon>`;
  } else {
    iconHtml = `<img src="${btn.icon}" style="width:20px;height:20px;object-fit:contain;" alt="">`;
  }
  return `<button class="btn btn-extra" data-script="${btn.script || ''}"
      data-rgb="${rgb}" style="border-color:rgba(${rgb},0.35);color:${color};">
    ${iconHtml}
    <span style="font-size:10px;letter-spacing:0.3px;">${safeLabel}</span>
  </button>`;
}

// ─── Main card ────────────────────────────────────────────────────────────────
class TvRemoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._hass        = null;
    this._config      = {};
    this._customIcons = {};
    this._editKey     = null;
    this._pendingSrc  = null;
    this._toastTimer  = null;
    try { this._customIcons = JSON.parse(localStorage.getItem(ICON_STORE_KEY) || '{}'); } catch(e) {}
  }

  static getStubConfig() {
    return { card_width: '100%', card_height: 'auto', extra_buttons: [] };
  }

  static getConfigElement() {
    return document.createElement('tv-remote-card-editor');
  }

  setConfig(config) {
    this._config = config || {};
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
  }

  getCardSize() {
    const h = parseInt(this._config.card_height, 10);
    return isNaN(h) ? 14 : Math.ceil(h / 50);
  }

  _render() {
    const w = this._config.card_width  || '100%';
    const h = this._config.card_height || 'auto';
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;700">
      <style>${this._css(w, h)}</style>
      ${this._html()}
    `;
    this._applyAllIcons();
    this._bindEvents();
    this._bindExtraHover();
  }

  _css(w, h) { return `
    :host { display: block; width: ${w}; }
    * { box-sizing: border-box; margin: 0; padding: 0;
        -webkit-tap-highlight-color: transparent; touch-action: manipulation; }

    .wrapper { background: #0d0f14; padding: 16px 12px; border-radius: 16px;
      width: 100%; height: ${h}; overflow: ${h === 'auto' ? 'visible' : 'auto'}; }

    .layout { display: flex; align-items: stretch; gap: 10px; width: 100%; min-width: 0; }

    /* Sidebars */
    .channel-sidebar { display: flex; flex-direction: column; gap: 6px; width: 80px; flex-shrink: 0; min-width: 0; }
    .sidebar-label { font-family: 'Share Tech Mono', monospace; font-size: 8px; color: #5a6380;
      letter-spacing: 2px; text-transform: uppercase; text-align: center;
      padding-bottom: 4px; border-bottom: 1px solid #2a3045; margin-bottom: 2px; }
    .ch-btn-wrap { position: relative; display: flex; flex: 1; }
    .ch-btn { width: 100%; background: #1e2330; border: 1px solid #2a3045;
      border-radius: 8px; color: #e8eaf0; cursor: pointer; font-family: 'Exo 2', sans-serif;
      font-size: 10px; font-weight: 700; letter-spacing: 0.3px; padding: 0;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 4px; transition: all 0.15s ease; user-select: none; overflow: hidden; min-height: 50px; }
    .ch-btn:active, .ch-btn.firing { transform: scale(0.93); }
    .ch-btn:hover  { border-color: rgba(0,212,255,0.35); background: #252d40; }
    .ch-chex { border-color: rgba(255,71,87,0.3);   color: #ff8a94; }
    .ch-chex:hover,  .ch-chex.firing  { background: rgba(255,71,87,0.1);   box-shadow: 0 0 14px rgba(255,71,87,0.15); }
    .ch-tsn  { border-color: rgba(0,180,255,0.3);   color: #55ccff; }
    .ch-tsn:hover,   .ch-tsn.firing   { background: rgba(0,180,255,0.08);  box-shadow: 0 0 14px rgba(0,180,255,0.15); }
    .ch-sn   { border-color: rgba(255,165,0,0.3);   color: #ffb840; }
    .ch-sn:hover,    .ch-sn.firing    { background: rgba(255,165,0,0.08);  box-shadow: 0 0 14px rgba(255,165,0,0.15); }
    .ch-hn   { border-color: rgba(46,213,115,0.3);  color: #2ed573; }
    .ch-hn:hover,    .ch-hn.firing    { background: rgba(46,213,115,0.08); box-shadow: 0 0 14px rgba(46,213,115,0.15); }
    .ch-icon { display: flex; align-items: center; justify-content: center; width: 28px; height: 20px; flex-shrink: 0; }
    .ch-icon svg { width: 18px; height: 18px; }
    .ch-icon img { width: 28px; height: 20px; object-fit: contain; }
    .ch-label { font-size: 9px; font-weight: 800; letter-spacing: 0.5px; line-height: 1; }

    .ch-edit-btn, .edit-icon-btn {
      position: absolute; top: 2px; right: 2px; width: 18px; height: 18px;
      background: #1e2330; border: 1px solid #2a3045; border-radius: 3px;
      display: none; align-items: center; justify-content: center;
      cursor: pointer; z-index: 2; padding: 0; color: #5a6380; }
    .ch-btn-wrap:hover .ch-edit-btn,
    .btn-media-wrap:hover .edit-icon-btn { display: flex; }
    .ch-edit-btn svg, .edit-icon-btn svg { width: 10px; height: 10px; }
    .ch-edit-btn:hover, .edit-icon-btn:hover { color: #00d4ff; }
    @media (hover: none) { .ch-edit-btn, .edit-icon-btn { display: flex !important; } }

    /* Remote body */
    .remote { background: #161a23; border: 1px solid #2a3045; border-radius: 24px;
      padding: 20px 20px 24px; flex: 1; min-width: 0; position: relative; overflow: hidden; }
    .remote::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, #00d4ff, transparent); }

    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .brand  { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #00d4ff; letter-spacing: 2px; text-transform: uppercase; }
    .status { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #5a6380; font-family: 'Share Tech Mono', monospace; }
    .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #2ed573; box-shadow: 0 0 8px #2ed573; animation: pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

    .section-label { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #5a6380;
      letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;
      display: flex; align-items: center; gap: 8px; }
    .section-label::after { content: ''; flex: 1; height: 1px; background: #2a3045; }

    .power-row   { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
    .control-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
    .roku-row    { display: grid; grid-template-columns: repeat(5,1fr); gap: 8px; margin-bottom: 14px; }
    .dpad-grid   { display: grid; grid-template-columns: repeat(3,1fr); gap: 7px; margin-bottom: 14px; }
    .control-group { display: flex; flex-direction: column; gap: 6px; }
    .control-label { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #5a6380; letter-spacing: 1.5px; text-align: center; text-transform: uppercase; }
    .control-btns  { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .media-grid  { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; margin-bottom: 14px; }
    .extra-grid  { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; margin-bottom: 14px; }
    .numpad      { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 8px; }

    .btn { position: relative; border: 1px solid #2a3045; border-radius: 10px;
      background: #1e2330; color: #e8eaf0; cursor: pointer;
      font-family: 'Exo 2', sans-serif; font-size: 12px; font-weight: 600;
      letter-spacing: 0.5px; padding: 12px 8px;
      display: flex; flex-direction: column; align-items: center; gap: 5px;
      transition: all 0.15s ease; user-select: none; overflow: hidden; }
    .btn:active, .btn.firing { transform: scale(0.94); }
    .btn:hover { border-color: rgba(0,212,255,0.3); background: #252d40; }
    .btn svg { width: 18px; height: 18px; }
    .btn-power-on  { border-color: rgba(46,213,115,0.3); color: #2ed573; }
    .btn-power-on:hover,  .btn-power-on.firing  { background: rgba(46,213,115,0.1); box-shadow: 0 0 20px rgba(46,213,115,0.15); }
    .btn-power-off { border-color: rgba(255,71,87,0.3);  color: #ff4757; }
    .btn-power-off:hover, .btn-power-off.firing { background: rgba(255,71,87,0.1);  box-shadow: 0 0 20px rgba(255,71,87,0.15); }
    .btn-mute { border-color: rgba(255,165,0,0.3); color: #ffaa00; }
    .btn-mute:hover, .btn-mute.firing { background: rgba(255,165,0,0.1); box-shadow: 0 0 20px rgba(255,165,0,0.15); }
    .btn-accent:hover, .btn-accent.firing { border-color: rgba(0,212,255,0.4); background: rgba(0,212,255,0.07); box-shadow: 0 0 20px rgba(0,212,255,0.12); }
    .btn-ok { border-color: rgba(0,212,255,0.5); background: rgba(0,212,255,0.07); }
    .btn-ok:hover, .btn-ok.firing { background: rgba(0,212,255,0.15); box-shadow: 0 0 20px rgba(0,212,255,0.2); }
    .btn-record { border-color: rgba(255,71,87,0.4); color: #ff4757; }
    .btn-record:hover, .btn-record.firing { background: rgba(255,71,87,0.12); box-shadow: 0 0 20px rgba(255,71,87,0.18); }
    .btn-play { border-color: rgba(46,213,115,0.4); color: #2ed573; }
    .btn-play:hover, .btn-play.firing { background: rgba(46,213,115,0.12); box-shadow: 0 0 20px rgba(46,213,115,0.18); }
    .btn-guide { border-color: rgba(162,89,255,0.4); color: #a259ff; }
    .btn-guide:hover, .btn-guide.firing { background: rgba(162,89,255,0.12); box-shadow: 0 0 20px rgba(162,89,255,0.18); }
    .btn-info { border-color: rgba(0,212,255,0.4); color: #00d4ff; }
    .btn-info:hover, .btn-info.firing { background: rgba(0,212,255,0.1); box-shadow: 0 0 20px rgba(0,212,255,0.15); }
    .btn-media { padding: 12px 6px; font-size: 10px; letter-spacing: 0.3px; }
    .btn-media svg { width: 20px; height: 20px; }
    .btn-media-wrap { position: relative; }
    .btn-mute-full { width: 100%; margin-bottom: 14px; flex-direction: row; justify-content: center; gap: 8px; }
    .btn-num { padding: 14px 8px; font-size: 18px; font-weight: 700; font-family: 'Share Tech Mono', monospace; }
    .btn-extra { padding: 12px 6px; font-size: 11px; transition: background 0.15s, box-shadow 0.15s, transform 0.1s, border-color 0.15s; }
    .btn-extra svg { width: 20px; height: 20px; }
    .btn-extra:active, .btn-extra.firing { transform: scale(0.94); }

    /* Toast */
    .toast { position: fixed; bottom: 24px; left: 50%;
      transform: translateX(-50%) translateY(60px);
      background: #1e2330; border: 1px solid #00d4ff; color: #00d4ff;
      font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: 1px;
      padding: 8px 20px; border-radius: 100px;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
      pointer-events: none; box-shadow: 0 0 20px rgba(0,212,255,0.25);
      white-space: nowrap; z-index: 9999; }
    .toast.show { transform: translateX(-50%) translateY(0); }

    /* Icon modal */
    .modal-overlay { display: none; position: fixed; inset: 0;
      background: rgba(0,0,0,0.72); backdrop-filter: blur(4px);
      z-index: 10000; align-items: center; justify-content: center; }
    .modal-overlay.open { display: flex; }
    .modal { background: #161a23; border: 1px solid #2a3045; border-radius: 16px;
      padding: 24px; width: 300px; position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
    .modal::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      border-radius: 16px 16px 0 0; background: linear-gradient(90deg, transparent, #a259ff, transparent); }
    .modal h3 { font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #e8eaf0; margin-bottom: 4px; }
    .modal-sub { font-family: 'Share Tech Mono', monospace; font-size: 10px; color: #5a6380; margin-bottom: 18px; }
    .modal-section { margin-bottom: 14px; }
    .modal-label { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #5a6380; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
    .modal input[type="url"] { width: 100%; background: #1e2330; border: 1px solid #2a3045;
      border-radius: 8px; color: #e8eaf0; font-family: 'Share Tech Mono', monospace;
      font-size: 16px; padding: 8px 10px; outline: none; transition: border-color 0.15s; }
    .modal input:focus { border-color: #00d4ff; }
    .drop-zone { border: 2px dashed #2a3045; border-radius: 8px; padding: 16px; text-align: center;
      cursor: pointer; font-family: 'Share Tech Mono', monospace; font-size: 10px;
      color: #5a6380; transition: all 0.2s; position: relative; }
    .drop-zone:hover, .drop-zone.dragover { border-color: #00d4ff; color: #00d4ff; background: rgba(0,212,255,0.04); }
    .drop-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
    .icon-preview { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 12px 0; min-height: 40px; }
    .icon-preview img { width: 32px; height: 32px; object-fit: contain; border-radius: 4px; background: #1e2330; padding: 4px; border: 1px solid #2a3045; }
    .icon-preview span { font-size: 10px; color: #5a6380; font-family: 'Share Tech Mono', monospace; }
    .modal-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 16px; }
    .modal-btn { padding: 9px; border-radius: 8px; font-family: 'Exo 2', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; border: 1px solid #2a3045; transition: all 0.15s; }
    .modal-btn-cancel { background: #1e2330; color: #5a6380; }
    .modal-btn-cancel:hover { color: #e8eaf0; }
    .modal-btn-save { background: rgba(0,212,255,0.1); border-color: rgba(0,212,255,0.4); color: #00d4ff; }
    .modal-btn-save:hover { background: rgba(0,212,255,0.18); }
    .modal-btn-clear { grid-column: 1/-1; background: rgba(255,71,87,0.07); border-color: rgba(255,71,87,0.3); color: #ff4757; margin-top: 4px; }
    .modal-btn-clear:hover { background: rgba(255,71,87,0.14); }

    /* Responsive */
    @media (max-width: 1024px) {
      .channel-sidebar { width: 68px; }
      .remote { padding: 16px 14px 20px; }
      .btn { font-size: 11px; padding: 10px 4px; }
      .btn-media { padding: 10px 4px; font-size: 10px; }
      .btn-num { font-size: 16px; padding: 12px 4px; }
    }
    @media (max-width: 768px) {
      .layout { flex-direction: column; }
      .channel-sidebar { width: 100%; flex-direction: row; flex-wrap: wrap; gap: 5px; }
      .sidebar-label { width: 100%; text-align: left; border-bottom: none; padding: 4px 2px; }
      .ch-btn-wrap { flex: 1 1 52px; min-width: 52px; }
      .ch-btn { height: 50px; font-size: 9px; }
      .remote { padding: 14px 12px 18px; border-radius: 16px; }
      .ch-edit-btn, .edit-icon-btn { display: flex; }
      .power-row, .control-row, .roku-row, .media-grid, .extra-grid, .numpad { gap: 7px; }
    }
    @media (max-width: 600px) {
      .ch-btn-wrap { flex: 1 1 44px; min-width: 44px; }
      .ch-btn { height: 46px; font-size: 8px; }
      .btn { font-size: 10px; padding: 8px 2px; }
      .btn-num { font-size: 15px; padding: 12px 2px; }
      .extra-grid { grid-template-columns: repeat(3,1fr); }
    }
  `; }

  _html() {
    const extras = this._config.extra_buttons || [];
    const extraSection = extras.length
      ? `<div class="section-label">Custom</div>
         <div class="extra-grid">${extras.map((b,i) => extraBtnHtml(b,i)).join('')}</div>`
      : '';
    return `
  <div class="wrapper"><div class="layout">

    <!-- LEFT — Channels -->
    <div class="channel-sidebar">
      <div class="sidebar-label">Channels</div>
      ${chBtn('ch-chex','script.channel_chex',            'ch_chex',  `<img src="/local/pictures/gb1.png" alt="CHEX" style="width:28px;height:20px;object-fit:contain;">`,'CHEX')}
      ${chBtn('ch-tsn', 'script.channel_tsn',             'ch_tsn',   SVG.globe,  'TSN'  )}
      ${chBtn('ch-tsn', 'script.channel_tsn2',            'ch_tsn2',  SVG.globe,  'TSN2' )}
      ${chBtn('ch-tsn', 'script.channel_tsn3',            'ch_tsn3',  SVG.globe,  'TSN3' )}
      ${chBtn('ch-tsn', 'script.channel_tsn4',            'ch_tsn4',  SVG.globe,  'TSN4' )}
      ${chBtn('ch-tsn', 'script.channel_tsn5',            'ch_tsn5',  SVG.globe,  'TSN5' )}
      ${chBtn('ch-sn',  'script.channel_sportsnet2',      'ch_sn1',   SVG.signal, 'SN2'  )}
      ${chBtn('ch-sn',  'script.channel_sportsnet_ontario','ch_sno',  SVG.signal, 'SNO'  )}
      ${chBtn('ch-sn',  'script.channel_sportsnet360',    'ch_sn360', SVG.signal, 'SN360')}
      ${chBtn('ch-hn',  'script.channel_home_network',    'ch_hn',    SVG.house,  'HN'   )}
      ${chBtn('ch-tsn', 'script.channel_cty',             'ch_ctv',   SVG.tv,     'CTV'  )}
      ${chBtn('',       'script.channel_ctvscifi',        'ch_scifi', SVG.scifi,  'SCI-FI','border-color:rgba(162,89,255,0.3);color:#a259ff;')}
      ${chBtn('ch-chex','script.channel_citytv',          'ch_citytv',SVG.tv,     'CITY' )}
      ${chBtn('ch-hn',  'script.channel_cbc',             'ch_cbc',   SVG.globe,  'CBC'  )}
    </div>

    <!-- REMOTE -->
    <div class="remote">
      <div class="header">
        <span class="brand">TV REMOTE</span>
        <span class="status"><span class="status-dot"></span>CONNECTED</span>
      </div>

      <div class="section-label">Power</div>
      <div class="power-row">
        <button class="btn btn-power-on"  data-script="script.turn_the_tv_on">${SVG.power} POWER ON</button>
        <button class="btn btn-power-off" data-script="script.turn_the_tv_off">${SVG.power} POWER OFF</button>
      </div>

      <div class="section-label">Controls</div>
      <div class="control-row">
        <div class="control-group">
          <div class="control-label">Volume</div>
          <div class="control-btns">
            <button class="btn btn-accent" data-script="script.broadlink_volume_up">${SVG.volUp} VOL +</button>
            <button class="btn btn-accent" data-script="script.broadlink_volume_down">${SVG.volDown} VOL -</button>
          </div>
        </div>
        <div class="control-group">
          <div class="control-label">Channel</div>
          <div class="control-btns">
            <button class="btn btn-accent" data-script="script.broadlink_channel_up">${SVG.chUp} CH +</button>
            <button class="btn btn-accent" data-script="script.broadlink_channel_down">${SVG.chDown} CH -</button>
          </div>
        </div>
      </div>
      <button class="btn btn-mute btn-mute-full" data-script="script.broadlink_mute">${SVG.mute} MUTE</button>

      <div class="section-label">Navigation</div>
      <div class="dpad-grid">
        <div></div>
        <button class="btn btn-accent" data-script="script.broadlink_dpad_up"    style="padding:12px 8px;">${SVG.dUp} UP</button>
        <div></div>
        <button class="btn btn-accent" data-script="script.broadlink_dpad_left"  style="padding:12px 8px;">${SVG.dLeft} LEFT</button>
        <button class="btn btn-ok"     data-script="script.broadlink_dpad_ok"    style="padding:12px 8px;">${SVG.ok} OK</button>
        <button class="btn btn-accent" data-script="script.broadlink_dpad_right" style="padding:12px 8px;">${SVG.dRight} RIGHT</button>
        <div></div>
        <button class="btn btn-accent" data-script="script.broadlink_dpad_down"  style="padding:12px 8px;">${SVG.dDown} DOWN</button>
        <div></div>
      </div>

      <div class="control-row" style="margin-bottom:14px;">
        <button class="btn btn-accent" data-script="script.broadlink_thumb_up">${SVG.thumbUp} THUMB UP</button>
        <button class="btn btn-accent" data-script="script.broadlink_thumb_down">${SVG.thumbDown} THUMB DOWN</button>
      </div>

      <div class="section-label">Media</div>
      <div class="media-grid">
        ${mediaBtn('btn-guide',  'script.broadlink_guide',        'guide',        SVG.guide,   'GUIDE')}
        ${mediaBtn('btn-info',   'script.broadlink_info',         'info',         SVG.info,    'INFO')}
        ${mediaBtn('btn-play',   'script.broadlink_play',         'play',         SVG.play,    'PLAY')}
        ${mediaBtn('btn-record', 'script.broadlink_record',       'record',       SVG.record,  'REC')}
        ${mediaBtn('btn-accent', 'script.broadlink_skip_back',    'skip_back',    SVG.skipBack,'⏮ BACK')}
        ${mediaBtn('btn-accent', 'script.broadlink_pause',        'pause',        SVG.pause,   'PAUSE')}
        ${mediaBtn('btn-accent', 'script.broadlink_skip_forward', 'skip_forward', SVG.skipFwd, 'FWD ⏭')}
        ${mediaBtn('btn-accent', 'script.broadlink_enter',        'enter',        SVG.enter,   'ENTER')}
      </div>

      <div class="section-label">Roku</div>
      <div class="roku-row">
        <button class="btn btn-accent" data-script="script.roku_back"         style="padding:10px 4px;font-size:10px;">${SVG.rokuBack} BACK</button>
        <button class="btn btn-accent" data-script="script.roku_home"         style="padding:10px 4px;font-size:10px;">${SVG.home} HOME</button>
        <button class="btn btn-play"   data-script="script.roku_play_pause"   style="padding:10px 4px;font-size:10px;">${SVG.playpause} PLAY/PAUSE</button>
        <button class="btn btn-accent" data-script="script.roku_rewind"       style="padding:10px 4px;font-size:10px;">${SVG.rew} REW</button>
        <button class="btn btn-accent" data-script="script.roku_fast_forward" style="padding:10px 4px;font-size:10px;">${SVG.ffd} FWD</button>
      </div>

      ${extraSection}

      <div class="section-label">Keypad</div>
      <div class="numpad">
        <button class="btn btn-num btn-accent" data-script="script.broadlink_key_1">1</button>
        <button class="btn btn-num btn-accent" data-script="script.broadlink_key_2">2</button>
        <button class="btn btn-num btn-accent" data-script="script.broadlink_key_3">3</button>
        <button class="btn btn-num btn-accent" data-script="script.broadlink_key_4">4</button>
        <button class="btn btn-num btn-accent" data-script="script.broadlink_key_5">5</button>
        <button class="btn btn-num btn-accent" data-script="script.broadlink_key_6">6</button>
        <button class="btn btn-num btn-accent" data-script="script.broadlink_key_7">7</button>
        <button class="btn btn-num btn-accent" data-script="script.broadlink_key_8">8</button>
        <button class="btn btn-num btn-accent" data-script="script.broadlink_key_9">9</button>
        <div></div>
        <button class="btn btn-num btn-accent" data-script="script.zero">0</button>
        <div></div>
      </div>
    </div>

    <!-- RIGHT — Apps -->
    <div class="channel-sidebar">
      <div class="sidebar-label">Apps</div>
      ${chBtn('','script.roku_launch_prime_video','app_prime',   SVG.prime,   'PRIME<br>VIDEO','border-color:rgba(0,168,225,0.4);color:#00a8e1;')}
      ${chBtn('','script.roku_launch_plex',       'app_plex',    SVG.plex,    'PLEX',          'border-color:rgba(229,160,13,0.4);color:#e5a00d;')}
      ${chBtn('','script.roku_launch_jellyfin',   'app_jellyfin',SVG.jellyfin,'JELLY<br>FIN',  'border-color:rgba(82,181,174,0.4);color:#52b5ae;')}
    </div>

  </div></div>
  <div class="toast" id="toast"></div>
  <div class="modal-overlay" id="iconModal">
    <div class="modal">
      <h3>Customize Icon</h3>
      <div class="modal-sub" id="modal-btn-name">BUTTON</div>
      <div class="modal-section">
        <div class="modal-label">Upload Image or SVG</div>
        <div class="drop-zone" id="drop-zone">
          <input type="file" accept="image/*,.svg" id="icon-file-input">
          ↑ Click or drag &amp; drop file
        </div>
        <div class="icon-preview" id="icon-preview" style="display:none">
          <img id="preview-img" src="" alt="preview">
          <span id="preview-name">—</span>
        </div>
      </div>
      <div class="modal-section">
        <div class="modal-label">Or paste image URL</div>
        <input type="url" id="icon-url-input" placeholder="https://example.com/icon.png">
      </div>
      <div class="modal-btns">
        <button class="modal-btn modal-btn-cancel" id="modal-cancel">CANCEL</button>
        <button class="modal-btn modal-btn-save"   id="modal-save">APPLY</button>
        <button class="modal-btn modal-btn-clear"  id="modal-clear">RESET TO DEFAULT</button>
      </div>
    </div>
  </div>`;
  }

  _bindEvents() {
    const root = this.shadowRoot;
    root.querySelectorAll('[data-script]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.script) this._callScript(btn.dataset.script, btn);
      });
    });
    root.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        this._openIconEditor(btn.dataset.edit, btn.dataset.label);
      });
    });
    root.getElementById('modal-cancel').addEventListener('click', () => this._closeIconEditor());
    root.getElementById('modal-save').addEventListener('click',   () => this._saveIcon());
    root.getElementById('modal-clear').addEventListener('click',  () => this._clearIcon());
    root.getElementById('iconModal').addEventListener('click', e => {
      if (e.target === root.getElementById('iconModal')) this._closeIconEditor();
    });
    root.getElementById('icon-file-input').addEventListener('change', e => {
      const f = e.target.files[0]; if (f) this._processFile(f);
    });
    root.getElementById('icon-url-input').addEventListener('input', e => {
      const url = e.target.value.trim();
      if (url) { this._pendingSrc = url; this._showPreview(url, url.split('/').pop()); }
    });
    const dz = root.getElementById('drop-zone');
    dz.addEventListener('dragover',  e => { e.preventDefault(); dz.classList.add('dragover'); });
    dz.addEventListener('dragleave', ()  => dz.classList.remove('dragover'));
    dz.addEventListener('drop', e => {
      e.preventDefault(); dz.classList.remove('dragover');
      const f = e.dataTransfer.files[0]; if (f) this._processFile(f);
    });
  }

  _bindExtraHover() {
    this.shadowRoot.querySelectorAll('.btn-extra').forEach(btn => {
      const rgb = btn.dataset.rgb;
      btn.addEventListener('mouseenter', () => {
        btn.style.background  = `rgba(${rgb},0.1)`;
        btn.style.boxShadow   = `0 0 18px rgba(${rgb},0.2)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background  = '';
        btn.style.boxShadow   = '';
      });
    });
  }

  _callScript(entityId, btnEl) {
    const name = entityId.split('.').pop().replace(/_/g,' ').toUpperCase();
    this._showToast(`⚡ ${name}`);
    this._flash(btnEl);
    if (!this._hass) { this._showToast('⚠ HASS NOT READY', true); return; }
    const [domain] = entityId.split('.');
    this._hass.callService(domain, 'turn_on', { entity_id: entityId })
      .catch(() => this._showToast('✗ ERROR', true));
  }

  _flash(el) {
    el.classList.add('firing');
    setTimeout(() => el.classList.remove('firing'), 200);
  }

  _showToast(msg, err = false) {
    const t = this.shadowRoot.getElementById('toast');
    if (!t) return;
    t.textContent       = msg;
    t.style.borderColor = err ? '#ff4757' : '#00d4ff';
    t.style.color       = err ? '#ff4757' : '#00d4ff';
    t.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  _openIconEditor(key, label) {
    this._editKey = key; this._pendingSrc = null;
    const root = this.shadowRoot;
    root.getElementById('modal-btn-name').textContent = label;
    root.getElementById('icon-url-input').value = '';
    root.getElementById('icon-file-input').value = '';
    root.getElementById('icon-preview').style.display = 'none';
    root.getElementById('iconModal').classList.add('open');
  }

  _closeIconEditor() {
    this.shadowRoot.getElementById('iconModal').classList.remove('open');
    this._editKey = null; this._pendingSrc = null;
  }

  _processFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      this._pendingSrc = e.target.result;
      this.shadowRoot.getElementById('icon-url-input').value = '';
      this._showPreview(this._pendingSrc, file.name);
    };
    reader.readAsDataURL(file);
  }

  _showPreview(src, name) {
    const root = this.shadowRoot;
    root.getElementById('preview-img').src = src;
    root.getElementById('preview-name').textContent = name.length > 26 ? name.slice(0,24)+'…' : name;
    root.getElementById('icon-preview').style.display = 'flex';
  }

  _saveIcon() {
    if (!this._pendingSrc || !this._editKey) { this._closeIconEditor(); return; }
    this._customIcons[this._editKey] = this._pendingSrc;
    try { localStorage.setItem(ICON_STORE_KEY, JSON.stringify(this._customIcons)); } catch(e) {}
    this._applyIconSrc(this._editKey, this._pendingSrc);
    this._showToast('✓ ICON UPDATED');
    this._closeIconEditor();
  }

  _clearIcon() {
    if (!this._editKey) return;
    delete this._customIcons[this._editKey];
    try { localStorage.setItem(ICON_STORE_KEY, JSON.stringify(this._customIcons)); } catch(e) {}
    this._showToast('✓ ICON RESET');
    this._closeIconEditor();
    setTimeout(() => this._render(), 600);
  }

  _applyAllIcons() {
    Object.entries(this._customIcons).forEach(([key, src]) => this._applyIconSrc(key, src));
  }

  _applyIconSrc(key, src) {
    const span = this.shadowRoot.querySelector(`.btn-icon[data-key="${key}"]`);
    if (!span) return;
    const isCh = span.classList.contains('ch-icon');
    span.innerHTML = `<img src="${src}" alt="${key}" style="width:${isCh?'28px':'20px'};height:20px;object-fit:contain;">`;
  }
}

customElements.define('tv-remote-card', TvRemoteCard);


// ─── Card editor (shown in HA dashboard edit panel) ───────────────────────────
class TvRemoteCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  _fire() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true, composed: true,
    }));
  }

  _render() {
    const cfg    = this._config || {};
    const w      = cfg.card_width  || '100%';
    const h      = cfg.card_height || 'auto';
    const extras = cfg.extra_buttons || [];

    const rowsHtml = extras.map((b, i) => `
      <div class="erow" data-idx="${i}">
        <input class="ei" data-field="label"  placeholder="Label"            value="${esc(b.label  ||'')}">
        <input class="ei" data-field="script" placeholder="script.entity_id" value="${esc(b.script ||'')}">
        <input class="ei ci" data-field="color"  placeholder="#hex color"    value="${esc(b.color  ||'')}">
        <input class="ei" data-field="icon"   placeholder="mdi:icon or URL"  value="${esc(b.icon   ||'')}">
        <button class="del" data-idx="${i}">✕</button>
      </div>`).join('');

    this.innerHTML = `<style>
      :host{display:block}
      .ew{padding:12px 16px;font-family:var(--primary-font-family,sans-serif);color:var(--primary-text-color)}
      h3{margin:0 0 12px;font-size:14px;font-weight:600}
      .row{display:flex;align-items:center;gap:8px;margin-bottom:10px}
      .row label{font-size:12px;color:var(--secondary-text-color);min-width:90px}
      .row input,.ei{flex:1;padding:7px 10px;background:var(--secondary-background-color,#1e2330);
        border:1px solid var(--divider-color,#2a3045);border-radius:6px;
        color:var(--primary-text-color);font-size:13px;font-family:inherit}
      .row input:focus,.ei:focus{outline:2px solid var(--primary-color,#00d4ff);border-color:transparent}
      .sec{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
        color:var(--secondary-text-color);margin:16px 0 8px;padding-bottom:4px;
        border-bottom:1px solid var(--divider-color,#2a3045)}
      .erow{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:6px}
      .erow .ei{min-width:70px}
      .ci{max-width:90px;flex:0 0 90px}
      .del{padding:5px 9px;background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,0.3);
        border-radius:6px;color:#ff4757;cursor:pointer;font-size:12px;flex-shrink:0}
      .del:hover{background:rgba(255,71,87,0.2)}
      .add{margin-top:8px;padding:8px 16px;background:rgba(0,212,255,0.08);
        border:1px solid rgba(0,212,255,0.3);border-radius:8px;
        color:var(--primary-color,#00d4ff);cursor:pointer;font-size:12px;font-weight:600;width:100%}
      .add:hover{background:rgba(0,212,255,0.15)}
      .hint{font-size:11px;color:var(--secondary-text-color);margin-top:8px;line-height:1.6}
      code{background:var(--code-editor-background-color,#1e2330);padding:1px 5px;border-radius:4px;font-size:11px}
    </style>
    <div class="ew">
      <h3>📺 TV Remote</h3>
      <div class="sec">Card Size</div>
      <div class="row"><label>Width</label><input id="cw" type="text" value="${esc(w)}" placeholder="100% or 800px"></div>
      <div class="row"><label>Height</label><input id="ch" type="text" value="${esc(h)}" placeholder="auto or 900px"></div>
      <div class="sec">Extra Buttons</div>
      <div id="elist">${rowsHtml}</div>
      <button class="add" id="addBtn">+ Add Button</button>
      <p class="hint">
        <b>script</b> — HA entity ID, e.g. <code>script.my_scene</code><br>
        <b>color</b> — optional hex, e.g. <code>#ff4757</code><br>
        <b>icon</b> — MDI name e.g. <code>mdi:movie</code> or an image URL
      </p>
    </div>`;

    function esc(s) { return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

    this.querySelector('#cw').addEventListener('change', e => {
      this._config.card_width = e.target.value.trim() || '100%'; this._fire();
    });
    this.querySelector('#ch').addEventListener('change', e => {
      this._config.card_height = e.target.value.trim() || 'auto'; this._fire();
    });
    this.querySelector('#addBtn').addEventListener('click', () => {
      this._config.extra_buttons = [...(this._config.extra_buttons||[]), {label:'',script:'',color:'',icon:''}];
      this._fire(); this._render();
    });
    this.querySelectorAll('.del').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.idx, 10);
        const b = [...(this._config.extra_buttons||[])];
        b.splice(i, 1);
        this._config.extra_buttons = b;
        this._fire(); this._render();
      });
    });
    this.querySelectorAll('.erow').forEach(row => {
      const i = parseInt(row.dataset.idx, 10);
      row.querySelectorAll('.ei').forEach(inp => {
        inp.addEventListener('change', e => {
          const b = [...(this._config.extra_buttons||[])];
          b[i] = { ...b[i], [inp.dataset.field]: e.target.value.trim() };
          this._config.extra_buttons = b;
          this._fire();
        });
      });
    });
  }
}

customElements.define('tv-remote-card-editor', TvRemoteCardEditor);


// ─── HA card picker registration ─────────────────────────────────────────────
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'tv-remote-card',
  name: 'TV Remote',
  description: 'Full-featured TV remote — channels, Roku, media, custom buttons & icons.',
  preview: true,
  documentationURL: 'https://github.com/your-username/tv-remote-card',
});
