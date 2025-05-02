// First, send the GET request
fetch('https://insight.actionkit.com/admin/auth/user/add/', {
  method: 'GET',
  credentials: 'include'
})
  .then(response => response.text())  // Optional: process the GET response
  .then(data => {
    console.log("GET response:", data); // Debugging output
    
    // Then send the POST request after GET completes
    return fetch('https://insight.actionkit.com/admin/auth/user/add/', {
      method: 'POST',
      credentials: 'include',
      body: 'key=value' // Add your POST body here
    });
  })
  .then(response => response.text())  // Process POST response
  .then(data => {
    console.log("POST response:", data);  // Debugging output
  })
  .catch(err => {
    console.error("Error:", err);  // Catch any errors
  });
