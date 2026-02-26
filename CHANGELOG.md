# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — Initial Release

### Added
- Full TV remote Lovelace card as a native HA custom integration
- Power On / Power Off buttons
- Volume Up / Down, Channel Up / Down, Mute
- D-pad navigation: Up, Down, Left, Right, OK
- Thumb Up / Thumb Down buttons
- Media controls: Guide, Info, Play, Record, Pause, Skip Back, Skip Forward, Enter
- Roku controls: Back, Home, Play/Pause, Rewind, Fast Forward
- Roku app launchers: Prime Video, Plex, Jellyfin
- 14 channel shortcuts: CHEX, TSN–TSN5, SN2, SNO, SN360, HN, CTV, SCI-FI, CITY, CBC
- Traditional numeric keypad (0–9)
- Custom icon editor per button (file upload, drag & drop, URL)
- Icons persist in browser localStorage
- Responsive design — works on desktop, tablet, and mobile
- Auto-registers as a Lovelace resource on setup (no manual resource step)
- No access token required — uses native `hass.callService()`
