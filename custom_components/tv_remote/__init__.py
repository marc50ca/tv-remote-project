"""TV Remote — Home Assistant custom integration.

Bundles and auto-registers the tv-remote-card Lovelace dashboard card.
"""
from __future__ import annotations

import logging
import os

from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.typing import ConfigType
from aiohttp import web

from .const import DOMAIN, CARD_JS, CARD_URL

_LOGGER = logging.getLogger(__name__)

CARD_PATH = os.path.join(os.path.dirname(__file__), CARD_JS)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the TV Remote component."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up TV Remote from a config entry."""

    # 1. Serve the JS card file over HTTP
    hass.http.register_view(TvRemoteCardView())

    # 2. Register as a Lovelace resource so it appears in the card picker
    await _register_lovelace_resource(hass, entry)

    _LOGGER.info(
        "TV Remote card registered at %s — add to any dashboard: "
        "type: custom:tv-remote-card",
        CARD_URL,
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    return True


async def _register_lovelace_resource(
    hass: HomeAssistant, entry: ConfigEntry
) -> None:
    """Register the card JS as a Lovelace frontend resource."""
    try:
        # HA 2023.6+ stores resources in the lovelace component data
        from homeassistant.components.lovelace import _get_lovelace_data  # noqa: PLC0415

        lovelace_data = _get_lovelace_data(hass)
        resources = lovelace_data.get("resources")
        if resources is not None:
            await resources.async_load(True)
            existing_urls = {r["url"] for r in resources.async_items()}
            if CARD_URL not in existing_urls:
                await resources.async_create_item(
                    {"res_type": "module", "url": CARD_URL}
                )
                _LOGGER.debug("Lovelace resource registered: %s", CARD_URL)
                return
            _LOGGER.debug("Lovelace resource already registered: %s", CARD_URL)
            return
    except Exception:  # noqa: BLE001
        pass  # Fall through to legacy method

    # Fallback: add_extra_js_url works on all HA versions
    try:
        from homeassistant.components.frontend import add_extra_js_url  # noqa: PLC0415
        add_extra_js_url(hass, CARD_URL)
        _LOGGER.debug("Registered JS via add_extra_js_url: %s", CARD_URL)
    except Exception as err:  # noqa: BLE001
        _LOGGER.warning(
            "Could not auto-register Lovelace resource (%s). "
            "Please add manually in Settings → Dashboards → Resources: "
            "URL=%s  Type=JavaScript Module",
            err,
            CARD_URL,
        )


class TvRemoteCardView(HomeAssistantView):
    """HTTP view that serves the Lovelace card JS file."""

    url = CARD_URL
    name = "tv_remote:card"
    requires_auth = False
    cors_allowed = True

    async def get(self, request: web.Request) -> web.Response:
        """Return the card JS."""
        try:
            with open(CARD_PATH, encoding="utf-8") as fh:
                content = fh.read()
            return web.Response(
                body=content,
                content_type="application/javascript",
                headers={"Cache-Control": "no-cache, no-store, must-revalidate"},
            )
        except FileNotFoundError:
            _LOGGER.error("tv-remote-card.js not found at %s", CARD_PATH)
            return web.Response(status=404)
