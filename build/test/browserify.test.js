!function (error) {
  console.error(error);
  if (typeof document === 'undefined') {
    return;
  } else if (!document.body) {
    document.addEventListener('DOMContentLoaded', print);
  } else {
    print();
  }
  function print() {
    var pre = document.createElement('pre');
    pre.className = 'errorify';
    pre.textContent = error.message || error;
    if (document.body.firstChild) {
      document.body.insertBefore(pre, document.body.firstChild);
    } else {
      document.body.appendChild(pre);
    }
  }
}({"message":"Cannot find module '....srcjsindex.js' from 'c:\\Team Projects\\NG Media Suite\\Cloud Encoding\\Clients\\WebPlayer\\WebPlayer\\videojs-playbackrate-adjuster\\build\\test'","name":"Error","stack":"Error: Cannot find module '....srcjsindex.js' from 'c:\\Team Projects\\NG Media Suite\\Cloud Encoding\\Clients\\WebPlayer\\WebPlayer\\videojs-playbackrate-adjuster\\build\\test'\n    at c:\\Team Projects\\NG Media Suite\\Cloud Encoding\\Clients\\WebPlayer\\WebPlayer\\videojs-playbackrate-adjuster\\node_modules\\browser-resolve\\node_modules\\resolve\\lib\\async.js:46:17\n    at process (c:\\Team Projects\\NG Media Suite\\Cloud Encoding\\Clients\\WebPlayer\\WebPlayer\\videojs-playbackrate-adjuster\\node_modules\\browser-resolve\\node_modules\\resolve\\lib\\async.js:173:43)\n    at ondir (c:\\Team Projects\\NG Media Suite\\Cloud Encoding\\Clients\\WebPlayer\\WebPlayer\\videojs-playbackrate-adjuster\\node_modules\\browser-resolve\\node_modules\\resolve\\lib\\async.js:188:17)\n    at load (c:\\Team Projects\\NG Media Suite\\Cloud Encoding\\Clients\\WebPlayer\\WebPlayer\\videojs-playbackrate-adjuster\\node_modules\\browser-resolve\\node_modules\\resolve\\lib\\async.js:69:43)\n    at onex (c:\\Team Projects\\NG Media Suite\\Cloud Encoding\\Clients\\WebPlayer\\WebPlayer\\videojs-playbackrate-adjuster\\node_modules\\browser-resolve\\node_modules\\resolve\\lib\\async.js:92:31)\n    at c:\\Team Projects\\NG Media Suite\\Cloud Encoding\\Clients\\WebPlayer\\WebPlayer\\videojs-playbackrate-adjuster\\node_modules\\browser-resolve\\node_modules\\resolve\\lib\\async.js:22:47\n    at FSReqWrap.oncomplete (fs.js:123:15)"})