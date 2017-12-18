# 客户端存储
## 客户端存储
- 提供的api将数据存储到用户电脑上，遵从“同源策略”
##  客户端存储有已下形式：
- web存储：标准描述的api包含localStorage对象和sessionStorage对象，这两个对象实际上是持久化关联数组，是名值对应表。适合易于使用，支持大容量数据
- cookie :是种早期的的客户端存储机制，起初针对服务器端脚本设计使用。尽管在客户端提供了非常繁琐的javascript来操作cookie,但他们难用至极。而且只适合存储少量文本数据。
- 任何一cookie方式存储的数据，不管服务端是否需要，每次http请求都会把这些数据传到服务端。所有新旧服务器都支持它，但是随着web storage的普及，cookie终将回归到最初的形态：作为一种服务器脚本被使用的客户端存储机制
- ie User Data:微软在IE5及之后的IE浏览器实现了它的专属客户端存储机制---userData,可以实现一定量的字符串数据存储，对于ie8以前的IE浏览器中，可以将其用作web存储替代方案。
- 离线web应用：h5定义的api，可以用来缓存web页面以及相关资源（脚本，css文件，图像）。它实现是将web整体存储在客户端，而不是仅仅存储数据，这样一来哪怕网络不可以的时候
- web数据库：safari,chrome,opera都内置了sql数据库api---失败
- 文件系统api，可以使用

## localStorage和sessionStorage
- 都代表storage对象，一个持久化关联数组，数组使用字符串来索引，存储的值都是字符串；区别在于存储的有效期和作用域不同。
```
//查询一个值
	var name=localStorage.username;
	name =localStorage['username'];//数组表示法
	//undefined == true;
	console.log(!name);;
	//最好直接一点
	if(name!==undefined){
		name=prompt("请输入你的名字");
		localStorage.username=name;
	}
	//迭代：
	for(var name in localStorage){
		var value=localStorage[name];
		console.log(value);
	}
```
- 存储类型：可以是对象与数组，还可以存储数据类型，如日期。支持值对的值。所以有些数据需，自己编码与解码。仅仅支持字符串
```
	//如果是数字，需转义
	localStorage.x=0;
	var x=parseInt(localStorage.x);
	//同样的日期
	localStorage.lastRead=(new Date()).toUTCString();
	 console.log(localStorage.lastRead);
	 var lastRead=new Date(Date.parse(localStorage.lastRead));
	 //json
	// localStorage.data=JSON.stringify(data);
	 //var data=JSON.parse(localStorage.data);
	 
	 ```
	 - 同源策略：通过协议，主机名，端口
	 - localstorage还受浏览器供应商的限制 ,不同浏览器
	 
## sessionStorage数据
- 一旦窗口被关闭，那么它存的的数据也将删除

## 其它一些标准api
- 处理使用localStorage的，还有一些：setItem()方法，getItem()，removeItem(),clear()。win8有个独有的delete
```

	 //一些api的使用方法
	 localStorage.setItem("x",1);
	 localStorage.getItem("x");
	 
	 //枚举
	 for(var i=0;i<localStorage.length;i++){
	 	var name=localStorage.key(i);
	 	var value=localStorage.getItem(name);
	 }
	 
	 //删除x项
	 localStorage.removeItem("x");
	 //全部删除
	 localStorage.clear();
	 //
	 ```
- 如果完全实现“web标准”，可以支持对象与数组的存储。获取的值为副本
```
localStorage.o={x:1};//存储一个带x的对象
localStorage.o.x=2;//试图去修改，但并没有成功
localStorage.o.x;//1:x；没有变，因为副本

//这样更好
localStorage.getItem("0").x=2;//并不希望存储2


 localStorage.o={x:1};
	 //localStorage.setItem("o").x=2;
	 console.log(localStorage.getItem("o").x)//underfined
	 console.log("value="+localStorage.getItem("o"));
	 
```

## 兼容不同浏览器的办法
```
//兼容
	 var memory=window.localStorage || (window.UserDataStorage && new UserDataStorage) || new cookieStorage();
	 //然后在对应机制中查询数据
	 var username=memory.getItem("username");
```
## 存储事件
- 如果打开了同源页面，存储事件
- session 的作用与限制在钉刺窗口
- 注册程序使用addEventLister
- localStorage使用的是广播机制。



## cookie
- 是指web浏览器存储的少量的数据
- 最早为服务端所使用，服务器端脚本可以读、写存储在客户端的cookie值。
-   它的增删改查，都是通过特殊格式的字符串读写document的cookie属性来完成，每个cookie都是有它的有效期与作用域，
- 浏览器可以通过nevigator.cookieEnable这个属性来实现，如果是true则是开启的。

## cookie的属性：有效期+作用域
- 除了name-value,cookie还有些属性来控制cookie有效期与作用域。
- cookie默认的有效期与session，浏览器关闭的一样，关闭网页就丢失。与sessionStorage的有效期有区别，它不是局限于浏览器的单个窗口
- max-age设置cookie有效期
- 和localStorage与sessionStorage类似，作用域通过文档源与文档路径。。该作用域是通过cookie的path和domain属性也是可配置的。
- 默认情况下，和创建它的web页面有关，并对web页面以及web页面同目录或者子目录的web页面相关。
- 有时上一调不满足用户需求。那么可以设置指定的路径前缀开始。共享
- 将cookie设置为“/”。那么cookie和localStorage拥有相同的作用域
- 用iframe可以来实现跨站。但同源策略限制了垮站的cookie来窥探。
- cookie共享：通过设置cookie的domain的属性来达到目的：如path设置为：“/”。其domain设置为“.example.com”。那么的它的所有子域名都成立。
- 它还有一个属性：secure。布尔类型。来表明cookie值是通过何种形式通过网络传递。默认不安全，一旦指定安全的，那么它只能在https，或者其它安全协议传递。


## 保存cookie
- cookie的名/值，不允许分号，逗号，空白符。需要用encodeURICompontent()值对它转码
```
component 
英 [kəm'pəʊnənt]  美 [kəm'ponənt]
adj. 组成的，构成的
n. 成分；组件；[电子] 元件

document.cookie = "version= "+encodeURIComponent(document.lastModified);


// 加设置有效期
 //
	 function setcookie(name,value,daysToLive){
	 	var cookie=name+"="+encodeURIComponent();
	 	if(typeof daysToLive === "number"){
	 		cookie+="; max-age=" + (daysToLive*60*60*24);//这里的的/+空格！！！
	 	}
	 	document.cookie=cookie;
	 }
```
- 通过以上的类别，cookie的其他的属性; path,; domain,; secure和; max-age一样的后面连接字符串即可。


## 读取cookie
- 取出来是字符串。“; ”的spilt分割
- 先采用decodeURIComponent()方法解析处理。
```
 //读取cookie
	 function getCookie(){
	 	var cookie={};
	 	var all = document.cookie;
	 	if(all === "")
	 	{
	 		return cookie;
	 	}
	 	var list=all.split("; ");
	 	for(var i=0;i<list.length;i++){
	 		var cookie=list[i];
	 		var p=cookie.indexOf("=");
	 		var name=cookie.substring(0,p);
	 		var value=cookie.substring(p+1);
	 		value=decodeURIComponent(value);
	 		cookie[name]=value;
	 	}
	 }
```
## cookie的局限性
- 设计初衷是给服务端脚本用来存储少量数据的。该数据会在每次请求一个相关的url是传到服务器，对cookie的数目与大小都做了限制。
- 允许cookie总数超过300个，当部分浏览器对单个cookie大小限制在4kb


## cookie实现类
```
/*
 * CookieStorage.js
 * This class implements the Storage API that localStorage and sessionStorage
 * do, but implements it on top of HTTP Cookies.
 */
function CookieStorage(maxage, path) {  // Arguments specify lifetime and scope

    // Get an object that holds all cookies
    var cookies = (function() { // The getCookies() function shown earlier
        var cookies = {};           // The object we will return
        var all = document.cookie;  // Get all cookies in one big string
        if (all === "")             // If the property is the empty string
            return cookies;         // return an empty object
        var list = all.split("; "); // Split into individual name=value pairs
        for(var i = 0; i < list.length; i++) {  // For each cookie
            var cookie = list[i];
            var p = cookie.indexOf("=");        // Find the first = sign
            var name = cookie.substring(0,p);   // Get cookie name
            var value = cookie.substring(p+1);  // Get cookie value
            value = decodeURIComponent(value);  // Decode the value
            cookies[name] = value;              // Store name and value
        }
        return cookies;
    }());

    // Collect the cookie names in an array
    var keys = [];
    for(var key in cookies) keys.push(key);

    // Now define the public properties and methods of the Storage API

    // The number of stored cookies
    this.length = keys.length;

    // Return the name of the nth cookie, or null if n is out of range
    this.key = function(n) {
        if (n < 0 || n >= keys.length) return null;
        return keys[n];
    };

    // Return the value of the named cookie, or null.
    this.getItem = function(name) { return cookies[name] || null; };

    // Store a value
    this.setItem = function(key, value) {
        if (!(key in cookies)) { // If no existing cookie with this name
            keys.push(key);      // Add key to the array of keys
            this.length++;       // And increment the length
        }

        // Store this name/value pair in the set of cookies.
        cookies[key] = value;

        // Now actually set the cookie.
        // First encode value and create a name=encoded-value string
        var cookie = key + "=" + encodeURIComponent(value);

        // Add cookie attributes to that string
        if (maxage) cookie += "; max-age=" + maxage;
        if (path) cookie += "; path=" + path;

        // Set the cookie through the magic document.cookie property
        document.cookie = cookie;
    };

    // Remove the specified cookie
    this.removeItem = function(key) {
        if (!(key in cookies)) return;  // If it doesn't exist, do nothing

        // Delete the cookie from our internal set of cookies
        delete cookies[key];

        // And remove the key from the array of names, too.
        // This would be easier with the ES5 array indexOf() method.
        for(var i = 0; i < keys.length; i++) {  // Loop through all keys
            if (keys[i] === key) {              // When we find the one we want
                keys.splice(i,1);               // Remove it from the array.
                break;
            }
        }
        this.length--;                          // Decrement cookie length

        // Finally actually delete the cookie by giving it an empty value
        // and an immediate expiration date.
        document.cookie = key + "=; max-age=0";
    };

    // Remove all cookies
    this.clear = function() {
        // Loop through the keys, removing the cookies
        for(var i = 0; i < keys.length; i++)
            document.cookie = keys[i] + "=; max-age=0";
        // Reset our internal state
        cookies = {};
        keys = [];
        this.length = 0;
    };
}
```


