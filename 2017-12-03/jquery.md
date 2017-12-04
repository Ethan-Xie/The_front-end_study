# jQuery2
## 获得元素的4种不同的宽度

```
//元素的四边的参数
 	var body=$("body");
  	var contentWidth=body.width();
  	var paddingWidth=body.innerWidth();
  	var borderWidth=body.outerWidth();
  	var marginWidth=body.outerWidth(true);
  	var padding=paddingWidth-contentWidth;
  	var borders=borderWidth-paddingWidth;
  	var margins=marginWidth-borderWidth;
  	
```
- width()与height（）可以是setter与getter ,可以传入数值、字符串
- 上面两者，默认是。当在box-sizing属性为border-box,width,height包括内边距和边框。

##  data----removeDta用法
- 设置或获取与文档元素相关联的数据。
```
<html>
<head>
<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  $("#btn1").click(function(){
    $("div").data("greeting", "Hello World");
    alert("Greeting is: " + $("div").data("greeting"));
  });
  $("#btn2").click(function(){
    $("div").removeData("greeting");
    alert("Greeting is: " + $("div").data("greeting"));
  });
});
</script>
</head>
<body>
<button id="btn1">向 div 元素添加数据</button><br />
<button id="btn2">从 div 元素删除数据</button>
<div></div>
</body>
</html>
```

## 插入和替换元素/修改文档结构
- append(),prepend(),after(),before(),replaceWidth()
- appendTO(),preprendTo(),insertAfter(),insertBefore()
```
 	//例子
  	$("#log").append("<br/>"+message);//结尾处添加内容
  	$("<br/>+message").appendTo("#log");
  	
  	$("h1").prepend("$");//开始处添加章节标识
  	$(document.createTextNode("$")).prependTo("h1");
  	
  	$("h1").before("<hr>");//后面&前面
  	$("h1").after("<hr>");
  	$("<hr>").insertafter("h1");
  	
  	//这是另外一种
  	$("h1").map(function(){
  		return this.firstChild;
  	}).before("$");
  	
  	//将h2替换为h1，保存内容不变
  	$("h2").each(
  		function(){
  			var h2=$(this);
  			h2.replaceWith("<h1>"+h2.html()+"</h1>");
  		}
  	);
```

## 元素复制：clone
```
//复制元素
  	//给文档结尾添加一个“linklist”,id的新div
  	$(docment.body).append("<div id='linklist'><h1>list of links</h1></div>");
  	//给所有文档中的链接复制到并插入到新div中
  	$("a").clone().appendTo("#linklist");
  	//在每个链接后面插入br,使其独立行显示
  	$("#linklist>a").after("<br/>");
  	```
  	
## 包装方法：wrap,wrapInner,wrapAll
```
//包装
  	$("h1").wrap(document.createElement("i"));//---><i><h1>...</i></h1>
  	$("h1").wrap("<i/>");//---><i><h1>...</i></h1>...
  	
  	//将第一个段落包装在一个锚点与div中
  	$("body>p:first").warp("<a name='load' ><div class='first'><div></a>");
  	
  	//将其它的段落包装在另一个div中
  	$("body>p:not(:first)").wrap("<div class='rest'></div>");
```
## 删除元素：empty,remove,
- empty（）:删除所有选择的所有子节点，但不会修改元素自身
- remove():删除所有元素
- detach():它不会移除事件处理程序和数据
- unwrp： wrap与wrapAll 反操作，它将替换父结点

# 使用jquery处理事件
## 事件处理程序简单的注册
```
//点击p时，背景变为灰色
$("p").click(function(){$(this).css("background-color","gray")});

//事件有：
click	keypress	submit	load
dblclick	keydown	change	resize
mouseenter	keyup	focus	scroll
mouseleave	 	blur	unload

$("p").click(function(){
    // 动作触发后执行的代码!!
});

// 只允许按下的字母键生效, 65~90是所有小写字母的键盘代码范围.
var validKeys = { start: 65, end: 90  };
$("#keys").keydown( validKeys, function(event){
    var keys = event.data;  //拿到validKeys对象.
    return event.which >= keys.start && event.which <= keys.end;
} );
//与bind相对比。与上面一样。
$("#keys").bind("keydown", validKeys, function(event){
    var keys = event.data;  //拿到validKeys对象.
    return event.which >= keys.start && event.which <= keys.end;
} );

$("<img/>",{
	src:image_url,
	alt:image_descripation,
	className:"classname",
	click:function(){$(this).css("opacity","50%")}
})
```

