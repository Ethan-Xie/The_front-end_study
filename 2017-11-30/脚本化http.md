# 脚本化http
## 超文本传输协议


##  XMLHttpRequest
Ajax (Asynchronous JavaScript + XML ), 核心技术XMLHttpRequest(XML)对象。
IE6 及以下不支持原生XMLHttpRequest，要兼容需要写个函数。
```
function createXHR(){  
    if(typeof XMLHttpRequest != 'undefined'){//兼容高版本浏览器  
        return new XMLHttpRequest();  
    }else (typeof ActiveXObject != 'undefined'){//IE6 采用 ActiveXObject， 兼容IE6  
        var versions = [                    //由于MSXML库有3个版本，因此都要考虑  
            'MSXML2.XMLHttp.6.0',  
            'MSXML2.XMLHttp.3.0',  
            'MSXML2.XMLHttp'  
        ];  
  
        for(var i = 0; i < versions.length; i++){  
            try{  
                return new ActiveXObject(versions[i]);  
            }catch(e){  
                //跳过  
            }  
        }  
    }else{  
        throw new Error('您的浏览器不支持XHR对象');  
    }  
```

## 指定请求
            //myXmlHttp.open("GET",url,true);	//(请求的方式，参数指定url,第三个参数true使用异步机制，如果false表示不使用异步）
            //  打开请求
- 注意：除了GET,POST，XMLHttpRequest规范允许把，delete,head,option,put作为open的第一个参数。
- 而http,connect,trace,track，因为风险，被明令禁止
- 跨域请求会禁止
```
//Content-type指定请求的MIME类型
            myXmlHttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');  
```
- 自己不能指定，Content-length,Date,referer,user-agent。XMLHtttpRequest自动添加头，防止伪造

## 响应 response
- 由状态码，响应头集合，响应主体
- status和statusText属性以数字和文本的形势，返回http状态码，想200 ok。404 notFound
- 使用getResponseHeader()和getAllResponseHeaders()
- 响应主体：responseText属性中得到文本形势（responseHeaders()）
- myXmlHttp.readyState==4(0-open未调用,1-open已调用,2--头信息,3--主体信息,4--响应成功)
```
//获取http响应头的onreadystatechange
function getText(url, callback) {
    var request = new XMLHttpRequest();         // Create new request
    request.open("GET", url);                   // Specify URL to fetch
    request.onreadystatechange = function() {   // Define event listener
        // If the request is compete and was successful
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Content-Type");
            if (type.match(/^text/))            // Make sure response is text
                callback(request.responseText); // Pass it to callback
        }
    };
    request.send(null);                         // Send the request now
}
```
- 要检验request.status === 200，和request.getResponseHeader("Content-Type");
- 同步响应：少用，因为javascript客户端是单线程的，当send方法阻塞是，通常会导致UI冻结，如果连接响应慢，那么用户浏览器会被冻结
- 如果是使用像:text/plain,text/html或text/css 这样的MIME类型发送文本响应，然后使用XMLHttpRequest对象的.responseText来获取。
- 如果是xml，能通过responseXML属性类获取它的document文档对象。

## 编码请求主体
- 表单编码请求：有个专门的MIME类型：request.setRequestHeader('Content-type'，'application/x-www-form-urlencoded');  
- 如果是｛age:20,name:name;｝,可以使用以下函数
```
//用于http请求编码对象
function encodeFormData(data) {
    if (!data) return "";    // Always return a string
    var pairs = [];          // To hold name=value pairs
    for(var name in data) {                                  // For each name
        if (!data.hasOwnProperty(name)) continue;            // Skip inherited
        if (typeof data[name] === "function") continue;      // Skip methods
        var value = data[name].toString();                   // Value as string
        name = encodeURIComponent(name.replace(" ", "+"));   // Encode name
        value = encodeURIComponent(value.replace(" ", "+")); // Encode value
        pairs.push(name + "=" + value);   // Remember name=value pair
    }
    return pairs.join('&'); // Return joined pairs separated with &
}
```
- JSON编码的请求
```
function postJSON(url, data, callback) {
    var request = new XMLHttpRequest();            
    request.open("POST", url);                    // POST to the specified url
    request.onreadystatechange = function() {     // Simple event handler
        if (request.readyState === 4 && callback) // When response is complete
            callback(request);                    // call the callback.
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
}
```
- XML
```
function postQuery(url, what, where, radius, callback) {
    var request = new XMLHttpRequest();            
    request.open("POST", url);                  // POST to the specified url
    request.onreadystatechange = function() {   // Simple event handler
        if (request.readyState === 4 && callback) callback(request);
    };

    // Create an XML document with root element <query>
    var doc = document.implementation.createDocument("", "query", null);
    var query = doc.documentElement;            // The <query> element
    var find = doc.createElement("find");       // Create a <find> element
    query.appendChild(find);                    // And add it to the <query>
    find.setAttribute("zipcode", where);        // Set attributes on <find>
    find.setAttribute("radius", radius);
    find.appendChild(doc.createTextNode(what)); // And set content of <find>

    // Now send the XML-encoded data to the server.
    // Note that the Content-Type will be automatically set.
    request.send(doc); 
}
```

## 上传文件
目前为止，它还不能使用XMLHttpRequest API做相同的事件。然后，XHR2允许通过send方法传入file对象。
为了安全，，脚本仅能获得表示用户当前选择文件file对象。在每个支持file对象的浏览器中，每个type="file"有个files属性，他是file对象中的数组对象。
```
whenReady(function() {                        // Run when the document is ready
    var elts = document.getElementsByTagName("input"); // All input elements
    for(var i = 0; i < elts.length; i++) {             // Loop through them
        var input = elts[i];
        if (input.type !== "file") continue;  // Skip all but file upload elts
        var url = input.getAttribute("data-uploadto"); // Get upload URL
        if (!url) continue;                   // Skip any without a url

        input.addEventListener("change", function() {  // When user selects file
            var file = this.files[0];         // Assume a single file selection
            if (!file) return;                // If no file, do nothing
            var xhr = new XMLHttpRequest();   // Create a new request
            xhr.open("POST", url);            // POST to the URL
            xhr.send(file);                   // Send the file as body
        }, false);
    }
});
//文件与表单
function postFormData(url, data, callback) {
    if (typeof FormData === "undefined")
        throw new Error("FormData is not implemented");

    var request = new XMLHttpRequest();            // New HTTP request
    request.open("POST", url);                     // POST to the specified url
    request.onreadystatechange = function() {      // A simple event handler.
        if (request.readyState === 4 && callback)  // When response is complete
            callback(request);                     // ...call the callback.
    };
    var formdata = new FormData();
    for(var name in data) {
        if (!data.hasOwnProperty(name)) continue;  // Skip inherited properties
        var value = data[name];
        if (typeof value === "function") continue; // Skip methods
        // Each property becomes one "part" of the request.
        // File objects are allowed here
        formdata.append(name, value);              // Add name/value as one part
    }

    request.send(formdata);  
}
```
## 

## 同时包含文件上传和其它元素时。
使用这个编码：multipart/form-data。XHR2的使用formData对象
```
whenReady(function() {
    var elts = document.getElementsByClassName("fileDropTarget");
    for(var i = 0; i < elts.length; i++) {
        var target = elts[i];
        var url = target.getAttribute("data-uploadto");
        if (!url) continue;
        createFileUploadDropTarget(target, url);
    }

    function createFileUploadDropTarget(target, url) {
        // Keep track of whether we're currently uploading something so we can
        // reject drops. We could handle multiple concurrent uploads, but 
        // that would make progress notification too tricky for this example.
        var uploading = false; 

        console.log(target, url);

        target.ondragenter = function(e) {
            console.log("dragenter");
            if (uploading) return;  // Ignore drags if we're busy
            var types = e.dataTransfer.types;
            if (types && 
                ((types.contains && types.contains("Files")) ||
                 (types.indexOf && types.indexOf("Files") !== -1))) {
                target.classList.add("wantdrop");
                return false;
            }
        };
        target.ondragover = function(e) { if (!uploading) return false; };
        target.ondragleave = function(e) {
            if (!uploading) target.classList.remove("wantdrop");
        };
        target.ondrop = function(e) {
            if (uploading) return false;
            var files = e.dataTransfer.files;
            if (files && files.length) {
                uploading = true;
                var message = "Uploading files:<ul>";
                for(var i = 0; i < files.length; i++) 
                    message += "<li>" + files[i].name + "</li>";
                message += "</ul>";
                
                target.innerHTML = message;
                target.classList.remove("wantdrop");
                target.classList.add("uploading");
                
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                var body = new FormData();
                for(var i = 0; i < files.length; i++) body.append(i, files[i]);
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        target.innerHTML = message +
                            Math.round(e.loaded/e.total*100) +
                            "% Complete";
                    }
                };
                xhr.upload.onload = function(e) {
                    uploading = false;
                    target.classList.remove("uploading");
                    target.innerHTML = "Drop files to upload";
                };
                xhr.send(body);

                return false;
            }
            target.classList.remove("wantdrop");
        }
    }
});
```
## 请求的中止与超时
//启动一定定时器：前面记录一个flag
```
function timedGetText(url, timeout, callback) {
    var request = new XMLHttpRequest();         // Create new request.
    var timedout = false;                       // Whether we timed out or not.
    // Start a timer that will abort the request after timeout ms.
    var timer = setTimeout(function() {         // Start a timer. If triggered,
                               timedout = true; // set a flag and then
                               request.abort(); // abort the request.
                           },
                           timeout);            // How long before we do this
    request.open("GET", url);                   // Specify URL to fetch
    request.onreadystatechange = function() {   // Define event listener.
        if (request.readyState !== 4) return;   // Ignore incomplete requests.
        if (timedout) return;                   // Ignore aborted requests.
        clearTimeout(timer);                    // Cancel pending timeout.
        if (request.status === 200)             // If request was successful
            callback(request.responseText);     // pass response to callback.
    };
    request.send(null);                         // Send the request now
}
```
## 跨域请求jsonp
```
function getJSONP(url, callback) {
    // Create a unique callback name just for this request
    var cbnum = "cb" + getJSONP.counter++; // Increment counter each time
    var cbname = "getJSONP." + cbnum;      // As a property of this function
    
    // Add the callback name to the url query string using form-encoding
    // We use the parameter name "jsonp".  Some JSONP-enabled services 
    // may require a different parameter name, such as "callback".
    if (url.indexOf("?") === -1)   // URL doesn't already have a query section
        url += "?jsonp=" + cbname; // add parameter as the query section
    else                           // Otherwise, 
        url += "&jsonp=" + cbname; // add it as a new parameter.

    // Create the script element that will send this request
    var script = document.createElement("script");

    // Define the callback function that will be invoked by the script
    getJSONP[cbnum] = function(response) {
        try {
            callback(response); // Handle the response data
        }
        finally {               // Even if callback or response threw an error
            delete getJSONP[cbnum];                // Delete this function
            script.parentNode.removeChild(script); // Remove script
        }
    };

    // Now trigger the HTTP request
    script.src = url;                  // Set script url
    document.body.appendChild(script); // Add it to the document
}

getJSONP.counter = 0;  // A counter we use to create unique callback names

```
## 基于服务器端推送事件的comet技术


## 头部信息：附录
```
//定义编码  
header( 'Content-Type:text/html;charset=utf-8 ');  
  
//Atom  
header('Content-type: application/atom+xml');  
  
//CSS  
header('Content-type: text/css');  
  
//Javascript  
header('Content-type: text/javascript');  
  
//JPEG Image  
header('Content-type: image/jpeg');  
  
//JSON  
header('Content-type: application/json');  
  
//PDF  
header('Content-type: application/pdf');  
  
//RSS  
header('Content-Type: application/rss+xml; charset=ISO-8859-1');  
  
//Text (Plain)  
header('Content-type: text/plain');  
  
//XML  
header('Content-type: text/xml');  
  
// ok  
header('HTTP/1.1 200 OK');  
  
//设置一个404头:  
header('HTTP/1.1 404 Not Found');  
  
//设置地址被永久的重定向  
header('HTTP/1.1 301 Moved Permanently');  
  
//转到一个新地址  
header('Location: http://www.example.org/');  
  
//文件延迟转向:  
header('Refresh: 10; url=http://www.example.org/');  
print 'You will be redirected in 10 seconds';  
  
//当然，也可以使用html语法实现  
// <meta http-equiv="refresh" content="10;http://www.example.org/ />  
  
// override X-Powered-By: PHP:  
header('X-Powered-By: PHP/4.4.0');  
header('X-Powered-By: Brain/0.6b');  
  
//文档语言  
header('Content-language: en');  
  
//告诉浏览器最后一次修改时间  
$time = time() - 60; // or filemtime($fn), etc  
header('Last-Modified: '.gmdate('D, d M Y H:i:s', $time).' GMT');  
  
//告诉浏览器文档内容没有发生改变  
header('HTTP/1.1 304 Not Modified');  
  
//设置内容长度  
header('Content-Length: 1234');  
  
//设置为一个下载类型  
header('Content-Type: application/octet-stream');  
header('Content-Disposition: attachment; filename="example.zip"');  
header('Content-Transfer-Encoding: binary');  
// load the file to send:  
readfile('example.zip');  
  
// 对当前文档禁用缓存  
header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');  
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past  
header('Pragma: no-cache');  
  
//设置内容类型:  
header('Content-Type: text/html; charset=iso-8859-1');  
header('Content-Type: text/html; charset=utf-8');  
header('Content-Type: text/plain'); //纯文本格式  
header('Content-Type: image/jpeg'); //JPG***  
header('Content-Type: application/zip'); // ZIP文件  
header('Content-Type: application/pdf'); // PDF文件  
header('Content-Type: audio/mpeg'); // 音频文件  
header('Content-Type: application/x-shockw**e-flash'); //Flash动画  
  
//显示登陆对话框  
header('HTTP/1.1 401 Unauthorized');  
header('WWW-Authenticate: Basic realm="Top Secret"');  
print 'Text that will be displayed if the user hits cancel or ';  
print 'enters wrong login data';  
```