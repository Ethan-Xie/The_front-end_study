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