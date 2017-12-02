# jQuery
## jQuery 优点
- 丰富强大的语法（css选择器），用来查询文档元素
- 高效的查询方法，用来找到与css选择器匹配的文档元素集
- 一套有用的方法，用来操作选择的元素集
- 强大的函数是编程技巧，用来批量操作元素集，而不是每次只是操作单个
- 简洁的语言用法，用来表示一系列的顺序操作

## jquery 基础
- jquery类库定义了一个全局变量：jQuery();别名：$
- var divs=$("div"),返回零个或多个jQuery对象。jquery工厂函数，不是构造函数
- $("p.detail").css("background-color","yellow").show("fast");
- $(".clickTohide").click(function(){$(this).slideUp("slow")})

## jQuery()函数
- 可以是css选择器
- 传递一个element,document,window对象给$()方法。$(this)
- html文本字符串.var img=$("<img/>",{src:url,css:{borderWidth:5},click:handleClick});
- 传入一个函数给$()方法。jQuery(function(){})
- 上面的老式写法；$(document).ready(f);

## 查询与查询结果
- $("body").length===1，$("body")[0]
- jQuery还有三个属性
```
//获取 document body中的所有<script>元素
var bodyscript=$("script",document.body);
  	bodyscript.selector;//script
  	bodyscript.context;//document.body
  	bodyscript.jquery;//"3.1.0"
  	
  	//给文档中的div元素标号，从开始到div#last(包括边界值)
  	$("body").each(function(idx){
  		$(this).prepend(idx+": ");;
  		if(this.id === "last") return false;
  	})
  	//对于每个div元素，跳过隐藏元素。
  	$("body").each(function(idx){
  		if($(this).is("*:hidden")) return;
  	})
```

## 获取和设置html属性

```
  	$("form").attr('action');//获取和设置form的action属性
  	$("#icon").attr("src","icon.gif");//设置id为icon的属性
  	$("#banner").attr({"src","icon.gif","src","icon.gif"});设置多个属性
  	
  	$("a").attr("target","_blank");
  	$("a").attr("target",function(){
  		//飞站内链接在新窗口中打开。
  		if(this.host==location.host) return "_self"
  		else return "_blank";
  	});
  	$("a").attr({target:Function(){}});//可以像这样传入函数。
  	$("a").removeAttr("target");//让所有链接在本窗口中打开
  	```
  	- 与上对相对应的原生javascript：
  	```
  	attributes：获取一个属性作为对象 
  	getAttribute：获取某一个属性的值
  	setAttribute：建立一个属性，并同时给属性捆绑一个值
  	createAttribute：仅建立一个属性
  	removeAttribute：删除一个属性 
  	getAttributeNode：获取一个节点作为对象
  	setAttributeNode：建立一个节点
  	removeAttributeNode：删除一个节点
  	```
  	
## 获取和设置css属性
- 不能获取复合样式的值，可以设置，获取就必须分开，（也可以采用驼峰式）
- 返回带有单位的值，所以设置是要，带上单位。
实际运用：
```
$("p").css("background-color");//返回首个匹配元素的 background-color 值：
$("p").css("fontWeight");//正确
$("p").css("font");//错误

$("p").css("font","font:italic small-caps bold 12px/1.2em Arial");//设置复合样式是OK的
//语法：[ [ <font-style> || <font-variant> || <font-weight> ]? <font-size> [ / <line-height> ]? <font-family> ]
//定义段落的字体为斜体(font-style属性),小型的大写字母(font-variant属性),粗体(font-weight属性),12px字体大小(font-size属性),1.2倍(字体)的行高(line-height属性),Arial字体(font-family属性)

$("p").css("background-color","yellow");//为所以匹配P元素设置 background-color

$("p").css({"background-color":"yellow","font-size":"200%"});//可以设置多个属性


//和第一个例子相似，但是这里我们只传递一个参数(样式属性)最后要介绍的是如何设置鼠标划过后的链接样式(比如: 颜色)。我们无法使用选择器直接选择鼠标划过状态下的链接，也就是说$("a:hover")是不成立的。因此我们需要用到jQuery提供的事件类方法 - hover()。值得注意的是，hover()方法需要定义两个函数，一个是鼠标划过时；另一个是鼠标划过后。具体方法如下：
$("#61dh a").css('color','#123456');
  $("#61dh a").hover(function(){
  $(this).css('color','#999');
  },
  function(){
  $(this).css('color','#123456');
});
```

##  获取和设置css类
- addClass(),removeClass(),toggleClass(),hasClass()
```
$("div").addClass(function(n){
  		return "test"+(n%3+1);
  	})
  	

  	//添加css类
  	$("h1").addClass("classname");//给所有h1元素添加一个类
  	$("h1+p").addClass("first second");//给所有h1元素添加两个类
  	$("div").addClass(function(n){
  		return "test"+(n%3+1);//间隔
  	});
  	
  	//删除css类
  	$("h1").removeClass("classname");//给所有h1元素删除一个类
  	$("h1+p").removeClass("first second");//给所有h1元素删除两个类
  	$("div").removeClass(function(n){
  		return "test"+(n%3+1);//间隔
  	});
  	$("div").removeClass();//删除所有
  	
  	//切换css类
  	$("h1").toggleClass("classname");//该类存在则添加，不存在则删除
  	$("h1+p").toggleClass("first second");//同时操作两个类
  	$("div").toggleClass(function(n){
  		return "test"+n);//函数切换
  	});
  	
  	//检测 css类
  	$("p").hasClass("first");//是否所有元素都有该类
  	$("p").is(".first");//功能和上面一致，注意逗号
  	$("p").is(".first.second");//is 比hasclass()更灵活
```

## 获取与设置html表单值

val方法用来获取与设置html表单value值，还可以获取和设置复选框、单选按钮以及<select>
```
	$("#username").var();//获取文本域，《select》
  	$("input:radio[name=ship]:check").val();//获取选中的单选按钮的值
  	$("#email").val("invalid email address");//给文本域设置值
  	$("input:checkbox").val(['opt1',"opt2"]);//选中带有这些名字或值的复选框
  	$("input:text").val(function(){
  		return this.defaultValue;
  	});
```
**用原生的js实现**
value 属性可设置或返回密码域的默认值。
出于安全考虑，一些浏览器可能阻止 JavaScript 代码读取 value 属性。
语法：
element.value=text


## 设置和获取元素内容
text()与html():获取与设置元素的纯文本或html内容。
当不带参数调用时，返回所有子孙节点的纯文本的内容（可以在不支持innertext的ie浏览器的使用）
```
	var title=$("head title").text();//获得文档标题
  	var headline=$("h1").html();//获得第一个h1的html
  	$("h1").text(function(n,current){//给每个标题添加章节号
  		return "$"+(n+1)+":"+current;
  	};
```

**用原生的js实现**
1、innerHTML:
　　也就是从对象的起始位置到终止位置的全部内容,包括Html标签。

2、innerText:
　　从起始位置到终止位置的内容, 但它去除Html标签
举例：
```
<div id="test">    <span style="color:red">test1</span> test2 </div>
<a href="javascript:alert(test.innerHTML)">innerHTML内容</a>
<a href="javascript:alert(test.innerText)">inerHTML内容</a>
```
特别说明：
　　innerHTML是符合W3C标准的属性，而innerText只适用于IE浏览器，因此，尽可能地去使用innerHTML，而少用innerText，如果要输出不含HTML标签的内容，可以使用innerHTML取得包含HTML标签的内容后，再用正则表达式去除HTML标签，下面是一个简单的符合W3C标准的示例：
```
<a href="javascript:alert(document.getElementById('test').innerHTML.replace(/<.+?>/gim,''))">
去除HTML标签后的文本</a>
```

## 获取和设置元素的位置的高宽。
使用offset方法可以获取与设置元素的位置（getBoundingClientRect()）.
```
var elt=$("#sprite");//需要移动的元素
var position=elt.offset();//获取当前位置
position.top +=100;//改变y坐标
elt.offset(position);//设置新位置

//将所有h1向右移动，移动的距离取决于他们文档中的位置.
$("h1").offset(function(index,curpos){
	return {left:curpos.left+25*index,top:curpos.top};
});
```






