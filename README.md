# 📺 TV Remote — Home Assistant Lovelace Card

A full-featured TV remote control card for Home Assistant dashboards.
Supports channel shortcuts, Roku app launchers, media controls, D-pad navigation,
and fully customisable icons — all in a sleek dark cyberpunk UI.

![TV Remote Card](docs/preview.png)

---

## ✨ Features

- 🎛 Power, Volume, Channel, Mute controls
- 🕹 D-pad navigation (Up / Down / Left / Right / OK)
- 👍 Thumb Up / Thumb Down
- 📺 14 channel shortcuts with custom icon support
- 🎬 Media controls: Guide, Info, Play, Record, Pause, Skip Back, Skip Forward, Enter
- 📡 Roku controls: Back, Home, Play/Pause, Rewind, Fast Forward
- 🎮 Roku app launchers: Prime Video, Plex, Jellyfin
- 🔢 Numeric keypad (traditional layout)
- 🖼 Custom icons per button (upload file, drag & drop, or URL)
- 📱 Fully responsive — works on tablets and mobile
- 🔌 Native HA integration — no token, no config needed

---

## 🚀 Installation

### HACS (Recommended)

> **Prerequisites:** [HACS](https://hacs.xyz) must be installed.

1. In Home Assistant, go to **HACS → Integrations**
2. Click the **⋮ menu** → **Custom repositories**
3. Add:
   - **URL:** `https://github.com/your-username/tv-remote-card`
   - **Category:** Integration
4. Click **Add**, then find **TV Remote** in HACS and install it
5. **Restart Home Assistant**
6. Go to **Settings → Devices & Services → Add Integration**
7. Search for **TV Remote** and click it → **Submit**
8. Add the card to any dashboard:
   ```yaml
   type: custom:tv-remote-card
   ```

### Manual

1. Download `tv_remote.zip` from the [latest release](../../releases/latest)
2. Extract and copy the `custom_components/tv_remote/` folder into `/config/custom_components/`
3. **Restart Home Assistant**
4. Go to **Settings → Devices & Services → Add Integration** → search **TV Remote** → Submit
5. Add the card to any dashboard:
   ```yaml
   type: custom:tv-remote-card
   ```

---

## 🃏 Adding the Card

Once the integration is set up, add the card to any dashboard:

**UI method:** Edit Dashboard → Add Card → search "Custom" → Manual card:
```yaml
type: custom:tv-remote-card
```

**YAML method:**
```yaml
type: custom:tv-remote-card
```

No additional configuration required.

---

## 📋 Required Scripts

The card calls HA scripts by entity ID. Create each script in **Settings → Automations & Scenes → Scripts**, or add them to `scripts.yaml`.

### ⚡ Power
| Button | Entity ID |
|---|---|
| Power On | `script.turn_the_tv_on` |
| Power Off | `script.turn_the_tv_off` |

### 🔊 Volume / Channel / Mute
| Button | Entity ID |
|---|---|
| VOL + | `script.broadlink_volume_up` |
| VOL - | `script.broadlink_volume_down` |
| CH + | `script.broadlink_channel_up` |
| CH - | `script.broadlink_channel_down` |
| MUTE | `script.broadlink_mute` |

### 🕹 Navigation
| Button | Entity ID |
|---|---|
| UP | `script.broadlink_dpad_up` |
| DOWN | `script.broadlink_dpad_down` |
| LEFT | `script.broadlink_dpad_left` |
| RIGHT | `script.broadlink_dpad_right` |
| OK | `script.broadlink_dpad_ok` |
| THUMB UP | `script.broadlink_thumb_up` |
| THUMB DOWN | `script.broadlink_thumb_down` |

### 🎬 Media
| Button | Entity ID |
|---|---|
| GUIDE | `script.broadlink_guide` |
| INFO | `script.broadlink_info` |
| PLAY | `script.broadlink_play` |
| REC | `script.broadlink_record` |
| ⏮ BACK | `script.broadlink_skip_back` |
| PAUSE | `script.broadlink_pause` |
| FWD ⏭ | `script.broadlink_skip_forward` |
| ENTER | `script.broadlink_enter` |

### 📡 Roku
| Button | Entity ID |
|---|---|
| BACK | `script.roku_back` |
| HOME | `script.roku_home` |
| PLAY/PAUSE | `script.roku_play_pause` |
| REW | `script.roku_rewind` |
| FWD | `script.roku_fast_forward` |
| Prime Video | `script.roku_launch_prime_video` |
| Plex | `script.roku_launch_plex` |
| Jellyfin | `script.roku_launch_jellyfin` |

### 📺 Channels
| Button | Entity ID |
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
| Button | Entity ID |
|---|---|
| 1–9 | `script.broadlink_key_1` … `script.broadlink_key_9` |
| 0 | `script.zero` |

---

## 🎨 Custom Icons

Hover (or long-press on touch screens) any channel or media button to reveal a ⚙ gear icon.
Click it to open the icon editor:

- **Upload** a PNG, JPG, or SVG file via click or drag & drop
- **Paste a URL** — e.g. `/local/pictures/tsn_logo.png` for files in your HA `www/` folder
- **Reset** to restore the default icon

Icons are stored in the browser's `localStorage` and persist across page refreshes.

> **Default:** The CHEX button defaults to `/local/pictures/gb1.png`. Place your logo at `config/www/pictures/gb1.png`.

---

## 🗂 Project Structure

```
tv_remote/
├── hacs.json                        # HACS metadata
├── README.md                        # This file
├── CHANGELOG.md                     # Version history
├── docs/
│   └── preview.png                  # Screenshot
└── custom_components/
    └── tv_remote/
        ├── manifest.json            # HA integration manifest
        ├── __init__.py              # Integration setup + JS serving
        ├── config_flow.py           # Settings → Integrations UI
        ├── const.py                 # Constants
        ├── tv-remote-card.js        # Lovelace card (Web Component)
        └── translations/
            └── en.json              # UI strings
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 📄 Licence

MIT
