fetch('https://insight.actionkit.com/dash/pages', {
  method: 'POST',
  credentials: 'include'
}).then(r => r.text()).then(console.log).catch(console.error);
