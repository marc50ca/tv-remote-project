/**
 * tv-remote-card — Home Assistant Lovelace Custom Card
 *
 * type: custom:tv-remote-card
 *
 * Config:
 *   card_width:    CSS width  (default: 100%)
 *   card_height:   CSS height (default: auto)
 *   extra_buttons:
 *     - label: "Night Mode"
 *       script: "script.night_mode"
 *       color: "#a259ff"        # optional hex
 *       icon: "mdi:weather-night" # optional MDI or image URL
 */

const ICON_STORE_KEY = 'tv_remote_custom_icons';
const BTN_STORE_KEY  = 'tv_remote_btn_overrides';

// ─── Default button definitions ───────────────────────────────────────────────
// These power the reset function and apply overrides at render time.
const DEFAULTS = {
  ch_chex:   { label: 'CHEX',       script: 'script.channel_chex' },
  ch_tsn:    { label: 'TSN',        script: 'script.channel_tsn' },
  ch_tsn2:   { label: 'TSN2',       script: 'script.channel_tsn2' },
  ch_tsn3:   { label: 'TSN3',       script: 'script.channel_tsn3' },
  ch_tsn4:   { label: 'TSN4',       script: 'script.channel_tsn4' },
  ch_tsn5:   { label: 'TSN5',       script: 'script.channel_tsn5' },
  ch_sn1:    { label: 'SN2',        script: 'script.channel_sportsnet2' },
  ch_sno:    { label: 'SNO',        script: 'script.channel_sportsnet_ontario' },
  ch_sn360:  { label: 'SN360',      script: 'script.channel_sportsnet360' },
  ch_hn:     { label: 'HN',         script: 'script.channel_home_network' },
  ch_ctv:    { label: 'CTV',        script: 'script.channel_cty' },
  ch_scifi:  { label: 'SCI-FI',     script: 'script.channel_ctvscifi' },
  ch_citytv: { label: 'CITY',       script: 'script.channel_citytv' },
  ch_cbc:    { label: 'CBC',        script: 'script.channel_cbc' },
  app_prime: { label: 'PRIME',      script: 'script.roku_launch_prime_video' },
  app_plex:  { label: 'PLEX',       script: 'script.roku_launch_plex' },
  app_jelly: { label: 'JELLYFIN',   script: 'script.roku_launch_jellyfin' },
  pwr_on:    { label: 'POWER ON',   script: 'script.turn_the_tv_on' },
  pwr_off:   { label: 'POWER OFF',  script: 'script.turn_the_tv_off' },
  vol_up:    { label: 'VOL +',      script: 'script.broadlink_volume_up' },
  vol_dn:    { label: 'VOL -',      script: 'script.broadlink_volume_down' },
  ch_up:     { label: 'CH +',       script: 'script.broadlink_channel_up' },
  ch_dn:     { label: 'CH -',       script: 'script.broadlink_channel_down' },
  mute:      { label: 'MUTE',       script: 'script.broadlink_mute' },
  nav_up:    { label: 'UP',         script: 'script.broadlink_dpad_up' },
  nav_dn:    { label: 'DOWN',       script: 'script.broadlink_dpad_down' },
  nav_lt:    { label: 'LEFT',       script: 'script.broadlink_dpad_left' },
  nav_rt:    { label: 'RIGHT',      script: 'script.broadlink_dpad_right' },
  nav_ok:    { label: 'OK',         script: 'script.broadlink_dpad_ok' },
  thm_up:    { label: 'THUMB UP',   script: 'script.broadlink_thumb_up' },
  thm_dn:    { label: 'THUMB DOWN', script: 'script.broadlink_thumb_down' },
  guide:     { label: 'GUIDE',      script: 'script.broadlink_guide' },
  info:      { label: 'INFO',       script: 'script.broadlink_info' },
  play:      { label: 'PLAY',       script: 'script.broadlink_play' },
  record:    { label: 'REC',        script: 'script.broadlink_record' },
  skip_bk:   { label: '⏮ BACK',    script: 'script.broadlink_skip_back' },
  pause:     { label: 'PAUSE',      script: 'script.broadlink_pause' },
  skip_fw:   { label: 'FWD ⏭',     script: 'script.broadlink_skip_forward' },
  enter:     { label: 'ENTER',      script: 'script.broadlink_enter' },
  roku_bk:   { label: 'BACK',       script: 'script.roku_back' },
  roku_hm:   { label: 'HOME',       script: 'script.roku_home' },
  roku_pp:   { label: 'PLAY/PAUSE', script: 'script.roku_play_pause' },
  roku_rw:   { label: 'REW',        script: 'script.roku_rewind' },
  roku_ff:   { label: 'FWD',        script: 'script.roku_fast_forward' },
  key_1:     { label: '1', script: 'script.broadlink_key_1' },
  key_2:     { label: '2', script: 'script.broadlink_key_2' },
  key_3:     { label: '3', script: 'script.broadlink_key_3' },
  key_4:     { label: '4', script: 'script.broadlink_key_4' },
  key_5:     { label: '5', script: 'script.broadlink_key_5' },
  key_6:     { label: '6', script: 'script.broadlink_key_6' },
  key_7:     { label: '7', script: 'script.broadlink_key_7' },
  key_8:     { label: '8', script: 'script.broadlink_key_8' },
  key_9:     { label: '9', script: 'script.broadlink_key_9' },
  key_0:     { label: '0', script: 'script.zero' },
};

// ─── SVG icons ────────────────────────────────────────────────────────────────
const SVG = {
  power:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2v10M5.64 5.64A9 9 0 1 0 18.36 5.64"/></svg>`,
  volUp:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="19" y1="9" x2="19" y2="15"/><line x1="22" y1="6" x2="22" y2="18"/></svg>`,
  volDown:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="19" y1="9" x2="19" y2="15"/></svg>`,
  mute:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
  arrowUp:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  arrowDn:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  arrowLt:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  arrowRt:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  ok:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="9" stroke-dasharray="2 3"/></svg>`,
  thumbUp:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`,
  thumbDn:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>`,
  guide:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  info:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  play:     `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  record:   `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>`,
  pause:    `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  skipBk:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>`,
  skipFw:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>`,
  enter:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>`,
  back:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  home:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  playpause:`<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 13 12 5 21 5 3"/><rect x="15" y="3" width="4" height="18" rx="1"/></svg>`,
  rew:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><polygon points="10 20 0 12 10 4 10 20"/></svg>`,
  ffd:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><polygon points="14 4 24 12 14 20 14 4"/></svg>`,
  tv:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  globe:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  signal:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  house:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  scifi:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 1 5 5c0 3-2 5-5 8-3-3-5-5-5-8a5 5 0 0 1 5-5z"/><circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none"/></svg>`,
  prime:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/><line x1="19" y1="12" x2="23" y2="12"/></svg>`,
  plex:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/><line x1="1" y1="3" x2="1" y2="21"/></svg>`,
  jellyfin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  star:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  gear:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
};

// Extra button colour palette
const PALETTE = ['#00d4ff','#2ed573','#ff9f43','#a259ff','#ff4757','#1e90ff','#00cec9','#fd79a8','#6c5ce7','#ff6b81'];

function hexRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? `${parseInt(m[1],16)},${parseInt(m[2],16)},${parseInt(m[3],16)}` : '0,212,255';
}

function safeHtml(s) {
  return String(s||'').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

// ─── Button HTML builders ─────────────────────────────────────────────────────

// Channel-bar button (compact, horizontal)
function chBtn(btnkey, svgIcon, cls = '', customStyle = '') {
  const d = DEFAULTS[btnkey];
  return `<div class="bw">
    <button class="ch-btn ${cls}" style="${customStyle}" data-script="${d.script}" data-btnkey="${btnkey}">
      <span class="ch-icon btn-icon" data-key="${btnkey}">${svgIcon}</span>
      <span class="ch-lbl btn-lbl" data-keylabel="${btnkey}">${d.label}</span>
    </button>
    <button class="gear-btn" data-edit="${btnkey}" title="Edit">${SVG.gear}</button>
  </div>`;
}

// Regular remote button (icon + label stacked)
function btn(btnkey, svgIcon, cls = '', extraStyle = '') {
  const d = DEFAULTS[btnkey];
  return `<div class="bw">
    <button class="btn ${cls}" style="${extraStyle}" data-script="${d.script}" data-btnkey="${btnkey}">
      <span class="btn-icon" data-key="${btnkey}">${svgIcon}</span>
      <span class="btn-lbl" data-keylabel="${btnkey}">${d.label}</span>
    </button>
    <button class="gear-btn" data-edit="${btnkey}" title="Edit">${SVG.gear}</button>
  </div>`;
}

// Media button (icon + label inline, small)
function mediaBtn(btnkey, svgIcon, cls = '') {
  const d = DEFAULTS[btnkey];
  return `<div class="bw">
    <button class="btn btn-sm ${cls}" data-script="${d.script}" data-btnkey="${btnkey}">
      <span class="btn-icon" data-key="${btnkey}">${svgIcon}</span>
      <span class="btn-lbl" data-keylabel="${btnkey}">${d.label}</span>
    </button>
    <button class="gear-btn" data-edit="${btnkey}" title="Edit">${SVG.gear}</button>
  </div>`;
}

// Numpad key (no gear — script changes handled differently)
function numBtn(btnkey) {
  const d = DEFAULTS[btnkey];
  return `<div class="bw">
    <button class="btn btn-num btn-accent" data-script="${d.script}" data-btnkey="${btnkey}">
      <span class="btn-lbl" data-keylabel="${btnkey}">${d.label}</span>
    </button>
    <button class="gear-btn" data-edit="${btnkey}" title="Edit">${SVG.gear}</button>
  </div>`;
}

// Extra button (user-defined)
function extraBtn(btnCfg, idx) {
  const color = btnCfg.color || PALETTE[idx % PALETTE.length];
  const rgb   = hexRgb(color);
  const label = safeHtml(btnCfg.label || 'Button');
  let iconHtml;
  if (!btnCfg.icon)                      iconHtml = SVG.star;
  else if (btnCfg.icon.startsWith('mdi:')) iconHtml = `<ha-icon icon="${safeHtml(btnCfg.icon)}" style="--mdc-icon-size:20px;"></ha-icon>`;
  else                                   iconHtml = `<img src="${safeHtml(btnCfg.icon)}" style="width:20px;height:20px;object-fit:contain;" alt="">`;
  return `<button class="btn btn-sm btn-extra" data-script="${safeHtml(btnCfg.script||'')}"
      data-rgb="${rgb}" style="border-color:rgba(${rgb},0.35);color:${color};">
    ${iconHtml}<span class="btn-lbl">${label}</span>
  </button>`;
}

// ─── Main card ────────────────────────────────────────────────────────────────
class TvRemoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._hass       = null;
    this._config     = {};
    this._icons      = {};   // custom icons
    this._overrides  = {};   // button label + script overrides
    this._editKey    = null;
    this._pendingIcon = null;
    this._toastTimer = null;
    try { this._icons     = JSON.parse(localStorage.getItem(ICON_STORE_KEY) || '{}'); } catch(e) {}
    try { this._overrides = JSON.parse(localStorage.getItem(BTN_STORE_KEY)  || '{}'); } catch(e) {}
  }

  static getStubConfig() { return { card_width: '100%', card_height: 'auto', extra_buttons: [] }; }
  static getConfigElement() { return document.createElement('tv-remote-card-editor'); }

  setConfig(config) { this._config = config || {}; this._render(); }
  set hass(h) { this._hass = h; }
  getCardSize() { const h = parseInt(this._config.card_height,10); return isNaN(h) ? 10 : Math.ceil(h/50); }

  // ── Render ───────────────────────────────────────────────────────────────────
  _render() {
    const w = this._config.card_width  || '100%';
    const h = this._config.card_height || 'auto';
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Exo+2:wght@300;400;600;700">
      <style>${this._css(w,h)}</style>
      ${this._html()}
    `;
    this._applyAllIcons();
    this._applyAllOverrides();
    this._bindEvents();
  }

  // ── CSS ──────────────────────────────────────────────────────────────────────
  _css(w, h) { return `
    :host { display: block; width: ${w}; }
    * { box-sizing: border-box; margin: 0; padding: 0;
        -webkit-tap-highlight-color: transparent; touch-action: manipulation; }

    .wrapper { background: #0d0f14; padding: 12px 14px 14px; border-radius: 16px;
      width: 100%; height: ${h}; overflow: ${h==='auto'?'visible':'auto'}; }

    /* ── Header ── */
    .hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
    .brand { font-family: 'Share Tech Mono',monospace; font-size: 11px; color: #00d4ff;
      letter-spacing: 2px; text-transform: uppercase; }
    .status { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #5a6380;
      font-family: 'Share Tech Mono',monospace; }
    .dot { width:6px; height:6px; border-radius:50%; background:#2ed573;
      box-shadow:0 0 8px #2ed573; animation:pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

    /* ── Channel bar ── */
    .ch-bar { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px;
      padding-bottom: 10px; border-bottom: 1px solid #1e2330; }
    .ch-bar .bw { flex: 1 1 50px; min-width: 44px; max-width: 68px; }
    .ch-btn { width: 100%; height: 44px; background: #1e2330; border: 1px solid #2a3045;
      border-radius: 7px; color: #e8eaf0; cursor: pointer; font-family: 'Exo 2',sans-serif;
      font-size: 9px; font-weight: 700; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 3px;
      transition: all 0.15s ease; user-select: none; overflow: hidden; }
    .ch-btn:active,.ch-btn.firing { transform: scale(0.93); }
    .ch-chex { border-color:rgba(255,71,87,0.3);   color:#ff8a94; }
    .ch-chex:hover,.ch-chex.firing  { background:rgba(255,71,87,0.1);  box-shadow:0 0 12px rgba(255,71,87,0.15); }
    .ch-tsn  { border-color:rgba(0,180,255,0.3);   color:#55ccff; }
    .ch-tsn:hover,.ch-tsn.firing   { background:rgba(0,180,255,0.08); box-shadow:0 0 12px rgba(0,180,255,0.15); }
    .ch-sn   { border-color:rgba(255,165,0,0.3);   color:#ffb840; }
    .ch-sn:hover,.ch-sn.firing    { background:rgba(255,165,0,0.08); box-shadow:0 0 12px rgba(255,165,0,0.15); }
    .ch-hn   { border-color:rgba(46,213,115,0.3);  color:#2ed573; }
    .ch-hn:hover,.ch-hn.firing    { background:rgba(46,213,115,0.08);box-shadow:0 0 12px rgba(46,213,115,0.15); }
    .ch-icon { display:flex; align-items:center; justify-content:center; width:22px; height:14px; flex-shrink:0; }
    .ch-icon svg { width:13px; height:13px; }
    .ch-icon img { width:22px; height:14px; object-fit:contain; }
    .ch-lbl { font-size:8px; font-weight:800; letter-spacing:0.5px; line-height:1; }

    /* ── 4-column body grid ── */
    /* cols: [power+controls] [dpad] [media] [keypad]  ratio 2:3:2:3 */
    .body { display: grid; grid-template-columns: 2fr 3fr 2fr 3fr; gap: 8px; align-items: start; margin-bottom: 8px; }

    /* ── Roku strip + extras below the 4-col body ── */
    .bottom-strip { display: flex; flex-direction: column; gap: 8px; }

    /* ── Section label ── */
    .sec { font-family: 'Share Tech Mono',monospace; font-size: 8px; color: #5a6380;
      letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px;
      display: flex; align-items: center; gap: 5px; }
    .sec::after { content:''; flex:1; height:1px; background:#2a3045; }

    /* ── Generic button wrap — gear lives here ── */
    .bw { position: relative; display: flex; }
    .bw .btn, .bw .ch-btn { flex: 1; }
    .gear-btn {
      position: absolute; top: 3px; right: 3px; width: 15px; height: 15px;
      background: rgba(13,15,20,0.9); border: 1px solid #2a3045; border-radius: 3px;
      display: none; align-items: center; justify-content: center;
      cursor: pointer; z-index: 3; padding: 0; color: #5a6380;
      transition: color 0.15s, border-color 0.15s; }
    .gear-btn svg { width: 8px; height: 8px; }
    .gear-btn:hover { color: #00d4ff; border-color: rgba(0,212,255,0.5); }
    .bw:hover .gear-btn { display: flex; }
    /* Always show on touch screens */
    @media (hover: none) { .gear-btn { display: flex !important; } }

    /* ── Button base ── */
    .btn { position: relative; border: 1px solid #2a3045; border-radius: 8px;
      background: #1e2330; color: #e8eaf0; cursor: pointer;
      font-family: 'Exo 2',sans-serif; font-size: 10px; font-weight: 600;
      letter-spacing: 0.3px; padding: 9px 4px;
      display: flex; flex-direction: column; align-items: center; gap: 3px;
      transition: all 0.15s ease; user-select: none; overflow: hidden; width: 100%; }
    .btn:active,.btn.firing { transform: scale(0.94); }
    .btn:hover { border-color: rgba(0,212,255,0.3); background: #252d40; }
    .btn svg { width: 15px; height: 15px; }
    .btn-sm { padding: 8px 4px; }
    .btn-sm svg { width: 16px; height: 16px; }

    .btn-power-on  { border-color:rgba(46,213,115,0.3); color:#2ed573; }
    .btn-power-on:hover,.btn-power-on.firing   { background:rgba(46,213,115,0.1); box-shadow:0 0 14px rgba(46,213,115,0.15); }
    .btn-power-off { border-color:rgba(255,71,87,0.3);  color:#ff4757; }
    .btn-power-off:hover,.btn-power-off.firing { background:rgba(255,71,87,0.1);  box-shadow:0 0 14px rgba(255,71,87,0.15); }
    .btn-mute { border-color:rgba(255,165,0,0.3); color:#ffaa00; }
    .btn-mute:hover,.btn-mute.firing { background:rgba(255,165,0,0.1); box-shadow:0 0 14px rgba(255,165,0,0.15); }
    .btn-accent:hover,.btn-accent.firing { border-color:rgba(0,212,255,0.4); background:rgba(0,212,255,0.07); box-shadow:0 0 14px rgba(0,212,255,0.1); }
    .btn-ok { border-color:rgba(0,212,255,0.5); background:rgba(0,212,255,0.07); }
    .btn-ok:hover,.btn-ok.firing { background:rgba(0,212,255,0.15); box-shadow:0 0 14px rgba(0,212,255,0.2); }
    .btn-record { border-color:rgba(255,71,87,0.4); color:#ff4757; }
    .btn-record:hover,.btn-record.firing { background:rgba(255,71,87,0.1); box-shadow:0 0 14px rgba(255,71,87,0.15); }
    .btn-play { border-color:rgba(46,213,115,0.4); color:#2ed573; }
    .btn-play:hover,.btn-play.firing { background:rgba(46,213,115,0.1); box-shadow:0 0 14px rgba(46,213,115,0.15); }
    .btn-guide { border-color:rgba(162,89,255,0.4); color:#a259ff; }
    .btn-guide:hover,.btn-guide.firing { background:rgba(162,89,255,0.1); box-shadow:0 0 14px rgba(162,89,255,0.15); }
    .btn-info { border-color:rgba(0,212,255,0.4); color:#00d4ff; }
    .btn-info:hover,.btn-info.firing { background:rgba(0,212,255,0.1); box-shadow:0 0 14px rgba(0,212,255,0.12); }
    .btn-num { font-size: 16px; font-weight: 700; font-family: 'Share Tech Mono',monospace; padding: 10px 4px; }
    .btn-extra { transition: background 0.15s, box-shadow 0.15s, transform 0.1s; }
    .btn-extra:active,.btn-extra.firing { transform: scale(0.94); }

    /* ── Grid helpers ── */
    .g1  { display:grid; grid-template-columns:1fr;            gap:5px; margin-bottom:6px; }
    .g2  { display:grid; grid-template-columns:1fr 1fr;        gap:5px; margin-bottom:6px; }
    .g3  { display:grid; grid-template-columns:repeat(3,1fr);  gap:5px; margin-bottom:6px; }
    .g4  { display:grid; grid-template-columns:repeat(4,1fr);  gap:5px; margin-bottom:6px; }
    .g5  { display:grid; grid-template-columns:repeat(5,1fr);  gap:5px; }
    .mb0 { margin-bottom:0; }

    /* ── Toast ── */
    .toast { position:fixed; bottom:20px; left:50%;
      transform:translateX(-50%) translateY(60px);
      background:#1e2330; border:1px solid #00d4ff; color:#00d4ff;
      font-family:'Share Tech Mono',monospace; font-size:11px; letter-spacing:1px;
      padding:7px 18px; border-radius:100px;
      transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
      pointer-events:none; box-shadow:0 0 20px rgba(0,212,255,0.25);
      white-space:nowrap; z-index:9999; }
    .toast.show { transform:translateX(-50%) translateY(0); }

    /* ── Edit modal ── */
    .modal-overlay { display:none; position:fixed; inset:0;
      background:rgba(0,0,0,0.75); backdrop-filter:blur(4px);
      z-index:10000; align-items:center; justify-content:center; }
    .modal-overlay.open { display:flex; }
    .modal { background:#161a23; border:1px solid #2a3045; border-radius:16px;
      padding:22px; width:320px; position:relative;
      box-shadow:0 24px 64px rgba(0,0,0,0.6); }
    .modal::before { content:''; position:absolute; top:0; left:0; right:0; height:2px;
      border-radius:16px 16px 0 0; background:linear-gradient(90deg,transparent,#a259ff,transparent); }
    .modal-title { font-size:12px; font-weight:700; letter-spacing:1px;
      text-transform:uppercase; color:#e8eaf0; margin-bottom:2px; }
    .modal-sub { font-family:'Share Tech Mono',monospace; font-size:10px;
      color:#5a6380; margin-bottom:16px; }
    .modal-sec-hdr { font-family:'Share Tech Mono',monospace; font-size:9px;
      color:#5a6380; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:5px; }
    .modal-group { margin-bottom:12px; }
    .modal input { width:100%; background:#1e2330; border:1px solid #2a3045;
      border-radius:7px; color:#e8eaf0; font-family:'Share Tech Mono',monospace;
      font-size:14px; padding:7px 10px; outline:none; transition:border-color 0.15s; }
    .modal input:focus { border-color:#00d4ff; }
    .modal-divider { height:1px; background:#2a3045; margin:14px 0; }
    .drop-zone { border:2px dashed #2a3045; border-radius:7px; padding:14px;
      text-align:center; cursor:pointer;
      font-family:'Share Tech Mono',monospace; font-size:9px;
      color:#5a6380; transition:all 0.2s; position:relative; }
    .drop-zone:hover,.drop-zone.dragover { border-color:#00d4ff; color:#00d4ff; background:rgba(0,212,255,0.04); }
    .drop-zone input[type="file"] { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
    .icon-preview { display:flex; align-items:center; gap:10px; margin:8px 0; min-height:36px; }
    .icon-preview img { width:28px; height:28px; object-fit:contain; border-radius:4px;
      background:#1e2330; padding:4px; border:1px solid #2a3045; }
    .icon-preview span { font-size:10px; color:#5a6380; font-family:'Share Tech Mono',monospace; }
    .modal-btns { display:grid; grid-template-columns:1fr 1fr; gap:7px; margin-top:14px; }
    .mbtn { padding:8px; border-radius:7px; font-family:'Exo 2',sans-serif;
      font-size:11px; font-weight:700; letter-spacing:0.5px; cursor:pointer;
      border:1px solid #2a3045; transition:all 0.15s; }
    .mbtn-cancel { background:#1e2330; color:#5a6380; }
    .mbtn-cancel:hover { color:#e8eaf0; }
    .mbtn-save { background:rgba(0,212,255,0.1); border-color:rgba(0,212,255,0.4); color:#00d4ff; }
    .mbtn-save:hover { background:rgba(0,212,255,0.18); }
    .mbtn-reset { grid-column:1/-1; background:rgba(255,71,87,0.07);
      border-color:rgba(255,71,87,0.3); color:#ff4757; margin-top:4px; }
    .mbtn-reset:hover { background:rgba(255,71,87,0.14); }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .ch-bar .bw { flex-basis: 42px; min-width: 38px; }
      .ch-btn { height: 40px; }
    }
    @media (max-width: 680px) {
      /* 2-column: power+dpad left, media+keypad right */
      .body { grid-template-columns: 3fr 2fr; }
      .body > .col-media { order: 3; }
      .body > .col-keypad { order: 4; }
    }
    @media (max-width: 480px) {
      .body { grid-template-columns: 1fr 1fr; }
      .ch-bar .bw { flex-basis: 36px; min-width: 32px; }
      .ch-btn { height: 36px; font-size: 7px; }
      .btn { font-size: 9px; padding: 7px 3px; }
      .btn-num { font-size: 14px; padding: 8px 3px; }
      .g5 { grid-template-columns: repeat(5,1fr); gap: 4px; }
    }
  `; }

  // ── HTML ─────────────────────────────────────────────────────────────────────
  _html() {
    const extras  = this._config.extra_buttons || [];
    const extraHtml = extras.length
      ? `<div class="sec">Custom</div>
         <div class="g4 mb0">${extras.map((b,i)=>extraBtn(b,i)).join('')}</div>`
      : '';

    return `<div class="wrapper">

  <!-- Header -->
  <div class="hdr">
    <span class="brand">TV REMOTE</span>
    <span class="status"><span class="dot"></span>CONNECTED</span>
  </div>

  <!-- Channel bar — all channels + apps in one horizontal strip -->
  <div class="ch-bar">
    ${chBtn('ch_chex',  `<img src="/local/pictures/gb1.png" alt="CHEX" style="width:22px;height:14px;object-fit:contain;">`, 'ch-chex')}
    ${chBtn('ch_tsn',   SVG.globe,  'ch-tsn')}
    ${chBtn('ch_tsn2',  SVG.globe,  'ch-tsn')}
    ${chBtn('ch_tsn3',  SVG.globe,  'ch-tsn')}
    ${chBtn('ch_tsn4',  SVG.globe,  'ch-tsn')}
    ${chBtn('ch_tsn5',  SVG.globe,  'ch-tsn')}
    ${chBtn('ch_sn1',   SVG.signal, 'ch-sn')}
    ${chBtn('ch_sno',   SVG.signal, 'ch-sn')}
    ${chBtn('ch_sn360', SVG.signal, 'ch-sn')}
    ${chBtn('ch_hn',    SVG.house,  'ch-hn')}
    ${chBtn('ch_ctv',   SVG.tv,     'ch-tsn')}
    ${chBtn('ch_scifi', SVG.scifi,  '', 'border-color:rgba(162,89,255,0.3);color:#a259ff;')}
    ${chBtn('ch_citytv',SVG.tv,     'ch-chex')}
    ${chBtn('ch_cbc',   SVG.globe,  'ch-hn')}
    ${chBtn('app_prime',SVG.prime,  '', 'border-color:rgba(0,168,225,0.4);color:#00a8e1;')}
    ${chBtn('app_plex', SVG.plex,   '', 'border-color:rgba(229,160,13,0.4);color:#e5a00d;')}
    ${chBtn('app_jelly',SVG.jellyfin,'','border-color:rgba(82,181,174,0.4);color:#52b5ae;')}
  </div>

  <!-- 4-column flat body: [power+controls] [dpad] [media] [keypad] -->
  <div class="body">

    <!-- Col 1: Power + Volume/Channel + Mute -->
    <div class="col-power">
      <div class="sec">Power</div>
      <div class="g1">
        ${btn('pwr_on',  SVG.power, 'btn-power-on')}
        ${btn('pwr_off', SVG.power, 'btn-power-off')}
      </div>
      <div class="sec">Controls</div>
      <div class="g2 mb0">
        ${btn('vol_up', SVG.volUp,   'btn-accent')}
        ${btn('vol_dn', SVG.volDown, 'btn-accent')}
        ${btn('ch_up',  SVG.arrowUp, 'btn-accent')}
        ${btn('ch_dn',  SVG.arrowDn, 'btn-accent')}
        ${btn('mute',   SVG.mute,    'btn-mute')}
        ${btn('thm_up', SVG.thumbUp, 'btn-accent')}
      </div>
    </div>

    <!-- Col 2: Navigation D-pad -->
    <div class="col-dpad">
      <div class="sec">Navigation</div>
      <div class="g3 mb0">
        <div></div>
        ${btn('nav_up', SVG.arrowUp, 'btn-accent')}
        <div></div>
        ${btn('nav_lt', SVG.arrowLt, 'btn-accent')}
        ${btn('nav_ok', SVG.ok,      'btn-ok')}
        ${btn('nav_rt', SVG.arrowRt, 'btn-accent')}
        <div></div>
        ${btn('nav_dn', SVG.arrowDn, 'btn-accent')}
        ${btn('thm_dn', SVG.thumbDn, 'btn-accent')}
      </div>
    </div>

    <!-- Col 3: Media controls -->
    <div class="col-media">
      <div class="sec">Media</div>
      <div class="g2 mb0">
        ${mediaBtn('guide',   SVG.guide,   'btn-guide')}
        ${mediaBtn('info',    SVG.info,    'btn-info')}
        ${mediaBtn('play',    SVG.play,    'btn-play')}
        ${mediaBtn('record',  SVG.record,  'btn-record')}
        ${mediaBtn('skip_bk', SVG.skipBk,  'btn-accent')}
        ${mediaBtn('pause',   SVG.pause,   'btn-accent')}
        ${mediaBtn('skip_fw', SVG.skipFw,  'btn-accent')}
        ${mediaBtn('enter',   SVG.enter,   'btn-accent')}
      </div>
    </div>

    <!-- Col 4: Keypad -->
    <div class="col-keypad">
      <div class="sec">Keypad</div>
      <div class="g3 mb0">
        ${numBtn('key_1')}${numBtn('key_2')}${numBtn('key_3')}
        ${numBtn('key_4')}${numBtn('key_5')}${numBtn('key_6')}
        ${numBtn('key_7')}${numBtn('key_8')}${numBtn('key_9')}
        <div></div>${numBtn('key_0')}<div></div>
      </div>
    </div>

  </div><!-- /body -->

  <!-- Roku row + optional extras — full width below the 4 cols -->
  <div class="bottom-strip">
    <div>
      <div class="sec">Roku</div>
      <div class="g5">
        ${mediaBtn('roku_bk', SVG.back,      'btn-accent')}
        ${mediaBtn('roku_hm', SVG.home,      'btn-accent')}
        ${mediaBtn('roku_pp', SVG.playpause, 'btn-play')}
        ${mediaBtn('roku_rw', SVG.rew,       'btn-accent')}
        ${mediaBtn('roku_ff', SVG.ffd,       'btn-accent')}
      </div>
    </div>
    ${extraHtml ? `<div>${extraHtml}</div>` : ''}
  </div>

</div><!-- /wrapper -->

<!-- Toast -->
<div class="toast" id="toast"></div>

<!-- Edit Modal — label, script, icon for any button -->
<div class="modal-overlay" id="editModal">
  <div class="modal">
    <div class="modal-title">Edit Button</div>
    <div class="modal-sub" id="modal-sub">—</div>

    <div class="modal-group">
      <div class="modal-sec-hdr">Label</div>
      <input type="text" id="edit-label" placeholder="Button label" autocomplete="off">
    </div>
    <div class="modal-group">
      <div class="modal-sec-hdr">Script Entity ID</div>
      <input type="text" id="edit-script" placeholder="script.entity_id" autocomplete="off">
    </div>

    <div class="modal-divider"></div>
    <div class="modal-group">
      <div class="modal-sec-hdr">Icon — upload or drag &amp; drop</div>
      <div class="drop-zone" id="drop-zone">
        <input type="file" accept="image/*,.svg" id="icon-file">
        ↑ Click or drag &amp; drop image / SVG
      </div>
      <div class="icon-preview" id="icon-preview" style="display:none">
        <img id="preview-img" src="" alt="preview">
        <span id="preview-name">—</span>
      </div>
    </div>
    <div class="modal-group">
      <div class="modal-sec-hdr">Or image URL</div>
      <input type="url" id="edit-icon-url" placeholder="https://… or /local/…">
    </div>

    <div class="modal-btns">
      <button class="mbtn mbtn-cancel" id="modal-cancel">CANCEL</button>
      <button class="mbtn mbtn-save"   id="modal-save">SAVE</button>
      <button class="mbtn mbtn-reset"  id="modal-reset">RESET TO DEFAULT</button>
    </div>
  </div>
</div>`;
  }

  // ── Event binding ────────────────────────────────────────────────────────────
  _bindEvents() {
    const root = this.shadowRoot;

    // Script buttons
    root.querySelectorAll('[data-script]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.script) this._callScript(btn.dataset.script, btn);
      });
    });

    // Gear buttons → open editor
    root.querySelectorAll('.gear-btn').forEach(g => {
      g.addEventListener('click', e => {
        e.stopPropagation();
        this._openEditor(g.dataset.edit);
      });
    });

    // Extra button hover glow
    root.querySelectorAll('.btn-extra').forEach(btn => {
      const rgb = btn.dataset.rgb;
      if (!rgb) return;
      btn.addEventListener('mouseenter', () => {
        btn.style.background = `rgba(${rgb},0.1)`;
        btn.style.boxShadow  = `0 0 16px rgba(${rgb},0.2)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = '';
        btn.style.boxShadow  = '';
      });
    });

    // Modal controls
    root.getElementById('modal-cancel').addEventListener('click', () => this._closeEditor());
    root.getElementById('modal-save').addEventListener('click',   () => this._saveEdit());
    root.getElementById('modal-reset').addEventListener('click',  () => this._resetBtn());
    root.getElementById('editModal').addEventListener('click', e => {
      if (e.target === root.getElementById('editModal')) this._closeEditor();
    });

    // File input
    root.getElementById('icon-file').addEventListener('change', e => {
      const f = e.target.files[0]; if (f) this._loadFile(f);
    });

    // URL input
    root.getElementById('edit-icon-url').addEventListener('input', e => {
      const url = e.target.value.trim();
      if (url) { this._pendingIcon = url; this._showPreview(url, url.split('/').pop()); }
    });

    // Drag & drop
    const dz = root.getElementById('drop-zone');
    dz.addEventListener('dragover',  e => { e.preventDefault(); dz.classList.add('dragover'); });
    dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));
    dz.addEventListener('drop', e => {
      e.preventDefault(); dz.classList.remove('dragover');
      const f = e.dataTransfer.files[0]; if (f) this._loadFile(f);
    });
  }

  // ── Script calling ───────────────────────────────────────────────────────────
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

  // ── Editor modal ──────────────────────────────────────────────────────────────
  _openEditor(key) {
    if (!key) return;
    this._editKey    = key;
    this._pendingIcon = null;
    const root   = this.shadowRoot;
    const def    = DEFAULTS[key] || {};
    const ov     = this._overrides[key] || {};
    root.getElementById('modal-sub').textContent     = def.label || key;
    root.getElementById('edit-label').value          = ov.label  !== undefined ? ov.label  : (def.label  || '');
    root.getElementById('edit-script').value         = ov.script !== undefined ? ov.script : (def.script || '');
    root.getElementById('edit-icon-url').value       = '';
    root.getElementById('icon-file').value           = '';
    root.getElementById('icon-preview').style.display = 'none';
    root.getElementById('editModal').classList.add('open');
  }

  _closeEditor() {
    this.shadowRoot.getElementById('editModal').classList.remove('open');
    this._editKey = null; this._pendingIcon = null;
  }

  _saveEdit() {
    const key    = this._editKey; if (!key) return;
    const root   = this.shadowRoot;
    const label  = root.getElementById('edit-label').value.trim();
    const script = root.getElementById('edit-script').value.trim();
    const def    = DEFAULTS[key] || {};

    // Save label + script overrides
    const ov = { ...this._overrides[key] };
    if (label  && label  !== def.label)  ov.label  = label;
    else                                  delete ov.label;
    if (script && script !== def.script) ov.script = script;
    else                                  delete ov.script;

    if (Object.keys(ov).length) this._overrides[key] = ov;
    else                         delete this._overrides[key];
    this._saveOverrides();
    this._applyOverride(key);

    // Save icon if provided
    if (this._pendingIcon) {
      this._icons[key] = this._pendingIcon;
      this._saveIcons();
      this._applyIconSrc(key, this._pendingIcon);
    }

    this._showToast('✓ SAVED');
    this._closeEditor();
  }

  _resetBtn() {
    const key = this._editKey; if (!key) return;
    delete this._overrides[key];
    delete this._icons[key];
    this._saveOverrides();
    this._saveIcons();
    // Re-render to restore default icon and label/script
    this._showToast('✓ RESET');
    this._closeEditor();
    setTimeout(() => this._render(), 400);
  }

  // ── File / preview ────────────────────────────────────────────────────────────
  _loadFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      this._pendingIcon = e.target.result;
      this.shadowRoot.getElementById('edit-icon-url').value = '';
      this._showPreview(this._pendingIcon, file.name);
    };
    reader.readAsDataURL(file);
  }

  _showPreview(src, name) {
    const root = this.shadowRoot;
    root.getElementById('preview-img').src = src;
    root.getElementById('preview-name').textContent = name.length > 28 ? name.slice(0,26)+'…' : name;
    root.getElementById('icon-preview').style.display = 'flex';
  }

  // ── Apply overrides ───────────────────────────────────────────────────────────
  _applyAllOverrides() {
    Object.keys(this._overrides).forEach(key => this._applyOverride(key));
  }

  _applyOverride(key) {
    const root = this.shadowRoot;
    const ov   = this._overrides[key];
    const def  = DEFAULTS[key] || {};

    // Update visible label
    root.querySelectorAll(`[data-keylabel="${key}"]`).forEach(el => {
      el.innerHTML = (ov && ov.label !== undefined ? ov.label : def.label) || '';
    });

    // Update data-script attribute on the button
    const btn = root.querySelector(`[data-btnkey="${key}"]`);
    if (btn) {
      btn.dataset.script = (ov && ov.script) ? ov.script : (def.script || '');
    }
  }

  // ── Apply icons ───────────────────────────────────────────────────────────────
  _applyAllIcons() {
    Object.entries(this._icons).forEach(([key, src]) => this._applyIconSrc(key, src));
  }

  _applyIconSrc(key, src) {
    const span = this.shadowRoot.querySelector(`.btn-icon[data-key="${key}"]`);
    if (!span) return;
    const isCh = span.classList.contains('ch-icon');
    span.innerHTML = `<img src="${src}" alt="${key}" style="width:${isCh?'24px':'18px'};height:${isCh?'16px':'18px'};object-fit:contain;">`;
  }

  // ── Persistence ───────────────────────────────────────────────────────────────
  _saveIcons()     { try { localStorage.setItem(ICON_STORE_KEY, JSON.stringify(this._icons));     } catch(e) {} }
  _saveOverrides() { try { localStorage.setItem(BTN_STORE_KEY,  JSON.stringify(this._overrides)); } catch(e) {} }
}

customElements.define('tv-remote-card', TvRemoteCard);


// ─── Card editor (HA dashboard panel) ────────────────────────────────────────
class TvRemoteCardEditor extends HTMLElement {
  setConfig(config) { this._config = { ...config }; this._render(); }

  _fire() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config }, bubbles: true, composed: true,
    }));
  }

  _render() {
    const cfg    = this._config || {};
    const w      = cfg.card_width  || '100%';
    const h      = cfg.card_height || 'auto';
    const extras = cfg.extra_buttons || [];

    const escAttr = s => String(s||'').replace(/[&<>"]/g, c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

    const rowsHtml = extras.map((b, i) => `
      <div class="erow" data-idx="${i}">
        <input class="ei" data-field="label"  placeholder="Label"            value="${escAttr(b.label  ||'')}">
        <input class="ei" data-field="script" placeholder="script.entity_id" value="${escAttr(b.script ||'')}">
        <input class="ei ci"data-field="color"  placeholder="#hex"           value="${escAttr(b.color  ||'')}">
        <input class="ei" data-field="icon"   placeholder="mdi:icon or URL"  value="${escAttr(b.icon   ||'')}">
        <button class="del" data-idx="${i}">✕</button>
      </div>`).join('');

    this.innerHTML = `<style>
      :host{display:block}
      .ew{padding:12px 16px;font-family:var(--primary-font-family,sans-serif);color:var(--primary-text-color)}
      h3{margin:0 0 12px;font-size:14px;font-weight:600}
      .row{display:flex;align-items:center;gap:8px;margin-bottom:10px}
      label{font-size:12px;color:var(--secondary-text-color);min-width:80px}
      .row input,.ei{flex:1;padding:7px 10px;background:var(--secondary-background-color,#1e2330);
        border:1px solid var(--divider-color,#2a3045);border-radius:6px;
        color:var(--primary-text-color);font-size:13px;font-family:inherit}
      .row input:focus,.ei:focus{outline:2px solid var(--primary-color,#00d4ff);border-color:transparent}
      .sec{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
        color:var(--secondary-text-color);margin:16px 0 8px;padding-bottom:4px;
        border-bottom:1px solid var(--divider-color,#2a3045)}
      .erow{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:6px}
      .erow .ei{min-width:70px}
      .ci{max-width:82px;flex:0 0 82px}
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
      <p style="font-size:12px;color:var(--secondary-text-color);margin-bottom:12px;">
        Hover any button on the card and click ⚙ to edit its label, script, or icon.
      </p>
      <div class="sec">Card Size</div>
      <div class="row"><label>Width</label><input id="cw" type="text" value="${escAttr(w)}" placeholder="100% or 800px"></div>
      <div class="row"><label>Height</label><input id="ch" type="text" value="${escAttr(h)}" placeholder="auto or 900px"></div>
      <div class="sec">Extra Buttons</div>
      <div id="elist">${rowsHtml}</div>
      <button class="add" id="addBtn">+ Add Button</button>
      <p class="hint">
        <b>script</b> e.g. <code>script.movie_mode</code><br>
        <b>color</b> e.g. <code>#a259ff</code> (optional)<br>
        <b>icon</b> e.g. <code>mdi:movie</code> or image URL (optional)
      </p>
    </div>`;

    this.querySelector('#cw').addEventListener('change', e => {
      this._config.card_width = e.target.value.trim() || '100%'; this._fire();
    });
    this.querySelector('#ch').addEventListener('change', e => {
      this._config.card_height = e.target.value.trim() || 'auto'; this._fire();
    });
    this.querySelector('#addBtn').addEventListener('click', () => {
      this._config.extra_buttons = [...(this._config.extra_buttons||[]), { label:'', script:'', color:'', icon:'' }];
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


// ─── HA card picker registration ──────────────────────────────────────────────
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'tv-remote-card',
  name: 'TV Remote',
  description: 'Full-featured TV remote — channels, Roku, media controls, custom buttons & per-button edit.',
  preview: true,
  documentationURL: 'https://github.com/your-username/tv-remote-card',
});
