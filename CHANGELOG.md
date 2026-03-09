# Changelog

## [1.0.0] — Initial Release

### Added
- Home Assistant custom integration (`custom_components/tv_remote`)
- Lovelace dashboard card (`custom:tv-remote-card`)
- Card appears in the HA card picker with name, description, and preview
- In-dashboard card config editor element (`tv-remote-card-editor`)
- Auto-registers as a Lovelace frontend resource on integration setup
- No access token required — uses native `hass.callService()`
- HACS-compatible with hassfest and HACS validation workflows
- Power On / Power Off
- Volume Up/Down, Channel Up/Down, Mute
- D-pad navigation: Up, Down, Left, Right, OK
- Thumb Up / Thumb Down
- Media controls: Guide, Info, Play, Record, Pause, Skip Back, Skip Forward, Enter
- Roku controls: Back, Home, Play/Pause, Rewind, Fast Forward
- Roku app launchers: Prime Video, Plex, Jellyfin
- 14 channel shortcuts: CHEX, TSN–TSN5, SN2, SNO, SN360, HN, CTV, SCI-FI, CITY, CBC
- Traditional numeric keypad (0–9)
- Custom icon editor per button (file upload, drag & drop, URL)
- Icons persist in browser localStorage
- Fully responsive — desktop, tablet, and mobile
