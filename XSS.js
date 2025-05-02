fetch('https://insight.actionkit.com/admin/auth/user/add/', {
  method: 'POST',
  credentials: 'include'
}).then(r => r.text()).then(console.log).catch(console.error);
