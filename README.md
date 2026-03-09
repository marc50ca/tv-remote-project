# 📺 TV Remote — Home Assistant Integration & Dashboard Card

A Home Assistant custom integration that bundles a full-featured Lovelace
dashboard card for controlling your TV. Install the integration once and the
card appears automatically in your dashboard card picker — no manual resource
registration needed.

---

## ✨ Features

**Integration**
- Auto-registers the Lovelace card as a frontend resource on setup
- No access token required — uses native `hass.callService()`
- Installs via HACS or manually

**Dashboard Card**
- Appears in the HA card picker as **TV Remote**
- In-dashboard config panel
- Full-width responsive layout — works on desktop, tablet, and mobile
- Power, Volume, Channel, Mute controls
- D-pad navigation (Up / Down / Left / Right / OK)
- Thumb Up / Thumb Down
- 14 channel shortcuts with custom icon support
- Media controls: Guide, Info, Play, Record, Pause, Skip Back, Skip Forward, Enter
- Roku controls: Back, Home, Play/Pause, Rewind, Fast Forward
- Roku app launchers: Prime Video, Plex, Jellyfin
- Traditional numeric keypad (0–9)
- Custom icons per button (upload file, drag & drop, or URL)

---

## 🚀 Installation

### HACS (Recommended)

> **Prerequisite:** [HACS](https://hacs.xyz) must be installed.

1. **HACS → Integrations → ⋮ → Custom repositories**
2. Add:
   - **URL:** `https://github.com/your-username/tv-remote-card`
   - **Category:** Integration
3. Find **TV Remote** in HACS and install
4. **Restart Home Assistant**
5. **Settings → Devices & Services → Add Integration → TV Remote → Submit**
6. Add the card to any dashboard:

```yaml
type: custom:tv-remote-card
```

Or use the card picker — search for **TV Remote**.

### Manual

1. Download `tv_remote.zip` from the [latest release](../../releases/latest)
2. Extract and copy `custom_components/tv_remote/` into `/config/custom_components/`
3. **Restart Home Assistant**
4. **Settings → Devices & Services → Add Integration → TV Remote → Submit**
5. Add to a dashboard:
   ```yaml
   type: custom:tv-remote-card
   ```

---

## 🃏 Using the Card

Once the integration is set up, the card is available in two ways:

**Card picker:** Edit any dashboard → Add Card → search **TV Remote**

**YAML:**
```yaml
type: custom:tv-remote-card
```

No additional card configuration is required.

---

## 📋 Required Scripts

The card calls HA scripts by entity ID. Create each one in
**Settings → Automations & Scenes → Scripts** or in `scripts.yaml`.

### ⚡ Power
| Button | Script Entity ID |
|---|---|
| Power On | `script.turn_the_tv_on` |
| Power Off | `script.turn_the_tv_off` |

### 🔊 Volume / Channel / Mute
| Button | Script Entity ID |
|---|---|
| VOL + | `script.broadlink_volume_up` |
| VOL - | `script.broadlink_volume_down` |
| CH + | `script.broadlink_channel_up` |
| CH - | `script.broadlink_channel_down` |
| MUTE | `script.broadlink_mute` |

### 🕹 Navigation
| Button | Script Entity ID |
|---|---|
| UP | `script.broadlink_dpad_up` |
| DOWN | `script.broadlink_dpad_down` |
| LEFT | `script.broadlink_dpad_left` |
| RIGHT | `script.broadlink_dpad_right` |
| OK | `script.broadlink_dpad_ok` |
| THUMB UP | `script.broadlink_thumb_up` |
| THUMB DOWN | `script.broadlink_thumb_down` |

### 🎬 Media
| Button | Script Entity ID |
|---|---|
| GUIDE | `script.broadlink_guide` |
| INFO | `script.broadlink_info` |
| PLAY | `script.broadlink_play` |
| REC | `script.broadlink_record` |
| ⏮ BACK | `script.broadlink_skip_back` |
| PAUSE | `script.broadlink_pause` |
| FWD ⏭ | `script.broadlink_skip_forward` |
| ENTER | `script.broadlink_enter` |

### 📡 Roku Controls
| Button | Script Entity ID |
|---|---|
| BACK | `script.roku_back` |
| HOME | `script.roku_home` |
| PLAY/PAUSE | `script.roku_play_pause` |
| REW | `script.roku_rewind` |
| FWD | `script.roku_fast_forward` |

### 🎮 Roku Apps
| Button | Script Entity ID |
|---|---|
| Prime Video | `script.roku_launch_prime_video` |
| Plex | `script.roku_launch_plex` |
| Jellyfin | `script.roku_launch_jellyfin` |

### 📺 Channels
| Button | Script Entity ID |
|---|---|
| CHEX | `script.channel_chex` |
| TSN | `script.channel_tsn` |
| TSN2 | `script.channel_tsn2` |
| TSN3 | `script.channel_tsn3` |
| TSN4 | `script.channel_tsn4` |
| TSN5 | `script.channel_tsn5` |
| SN2 | `script.channel_sportsnet2` |
| SNO | `script.channel_sportsnet_ontario` |
| SN360 | `script.channel_sportsnet360` |
| HN | `script.channel_home_network` |
| CTV | `script.channel_cty` |
| SCI-FI | `script.channel_ctvscifi` |
| CITY | `script.channel_citytv` |
| CBC | `script.channel_cbc` |

### 🔢 Keypad
| Button | Script Entity ID |
|---|---|
| 1–9 | `script.broadlink_key_1` … `script.broadlink_key_9` |
| 0 | `script.zero` |

---

## 🎨 Custom Icons

Hover any channel or media button to reveal a ⚙ gear icon.
On touch screens it is always visible. Click to:

- **Upload** a PNG, JPG, or SVG via click or drag & drop
- **Paste a URL** — e.g. `/local/pictures/tsn_logo.png`
- **Reset** to the default icon

Icons are stored in browser `localStorage` and persist across refreshes.

> The CHEX button defaults to `/local/pictures/gb1.png`.
> Place your logo at `config/www/pictures/gb1.png`.

---

## 🗂 Project Structure

```
tv-remote-card/
├── hacs.json
├── README.md
├── CHANGELOG.md
├── LICENSE
├── .github/
│   ├── workflows/
│   │   ├── validate.yml      # hassfest + HACS checks on every push
│   │   └── release.yml       # auto-builds release zip on git tag
│   └── ISSUE_TEMPLATE/
└── custom_components/
    └── tv_remote/
        ├── manifest.json
        ├── __init__.py       # serves JS, registers Lovelace resource
        ├── config_flow.py    # Settings → Integrations UI
        ├── const.py
        ├── strings.json
        ├── translations/
        │   └── en.json
        └── tv-remote-card.js # the Lovelace Web Component card
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes please open an issue first.

## 📄 Licence

MIT
