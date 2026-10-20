// Optional play statistics: no request before the first actual game start.
// This file never reads saves, assigns player IDs, or changes game state.
(function () {
  "use strict";

  try {
    var config = window.ANKUN_ANALYTICS;
    var websiteId = config && config.websiteId;
    if (typeof websiteId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(websiteId)) return;
    if (location.protocol !== "https:" || location.hostname !== "zyfaigy-droid.github.io") return;
    if (location.pathname.indexOf("/classroom-simulator/") !== 0) return;
    if (navigator.webdriver || new URLSearchParams(location.search).get("analytics") === "off") return;

    var attempted = false;
    var delivered = false;

    function trackSafely(eventName) {
      try {
        if (!window.umami || typeof window.umami.track !== "function") return;
        var result = arguments.length ? window.umami.track(eventName) : window.umami.track();
        Promise.resolve(result).catch(function () {});
      } catch (_) {
        // A blocked analytics service must never interrupt the story.
      }
    }

    document.addEventListener("click", function (event) {
      if (attempted) return;
      try {
        var target = event.target;
        var button = target && typeof target.closest === "function" ? target.closest("button") : null;
        var choices = document.getElementById("choices");
        if (!button || !choices || !choices.contains(button)) return;
        // Capture runs before game.js handles the button and advances the scene.
        if (typeof state === "undefined" || state.scene !== "start" || button.textContent.trim() !== "正式进入游戏") return;
        attempted = true;

        var script = document.createElement("script");
        script.async = true;
        script.src = "https://cloud.umami.is/script.js";
        script.setAttribute("data-website-id", websiteId);
        script.setAttribute("data-auto-track", "false");
        script.setAttribute("data-domains", "zyfaigy-droid.github.io");
        script.setAttribute("data-do-not-track", "true");
        script.setAttribute("data-exclude-search", "true");
        script.setAttribute("data-exclude-hash", "true");
        script.onload = function () {
          if (delivered) return;
          delivered = true;
          trackSafely();
          trackSafely("game_start");
        };
        script.onerror = function () {};
        document.head.appendChild(script);
      } catch (_) {
        // Missing DOM features, blocked scripts, or offline play remain playable.
      }
    }, true);
  } catch (_) {
    // Analytics is optional, including in older or restricted browsers.
  }
}());
