- 注意：ie早期版本存在一个bug，屏蔽不可枚举属性不会出现在for-in循环中

会影响默认不可枚举：hasOwnProperty()/propertyIsEnumerable()/toLocaleString()/toString/valueOf()

- 要获取对象上所有不可枚举的实例属性：Object.keys()
```
var keys = Object.keys(Person.prototype);
alter(keys);
```

### 更简单的原型

- 注意：用protoType={}  对象创建的话，会自动产生一个constructor 等于object

Person.prototype={constructor:Person,}   //这样重设，【enumerable】特性设置为true。


重设构t函数,只适用于ECMAScript 5兼容的浏览器, 
object.defineProperty(Person.prototype,"constructor",  {enumerable: false, value; Person} );

### 原型动态性
尽管可以随时为原型添加属性和方法,并且修改能够立即在所有对象实例中反映出来,但如果是重写整个原型对象,那么情况就不一样了。我们知道,调用构造函数时会为实例添加一个指向最初原型的! "[[Prototype]]指针,而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。请记住:实例中的指针仅指向原型,而不指向构造函数。看下面的例子。


### console.log(Array.prototype)

## 原型对象的问题
默认情况都取出所有相同的值，最大问题：其共享本性所导致（一旦某个属性修改就全部类修改）

 1方法 if (typeof this, BayName ！= "function")
{ Peraon.prototype.Baytame = function()
{ alert (this,name); }; 
var friend = new Person("Nicholas", 29, .Software Engincer"); 
friend. sayName();  注意构造函数代码中加粗的部分。这里只在sayName ()方法不存在的情况下,才会将它添加到原,型中。这段代码只会在初次调用构造函数时才会执行。此后,原型已经完成初始化,不需要再做什么修,改了。不过要记住,这里对原型所做的修改,能够立即在所有实例中得到反映。因此,这种方法确实可,以说非常完美。其中, if语句检查的可以是初始化之后应该存在的任何属性或方法-不必用一大堆, if语句检查每个属性和每个方法;只要检查其中一个即可。对于采用这种模式创建的对象,还可以使,用instanceof操作符确定它的类型。


### 继承
son.prototype = new Super();
son.prototype.hello=function(){}

### 相对于原型链而言，借用构造函数有一个很大的优势，可以在子类型构造函数中向超类型构造函数传递参数：
```
 function SuperType (name) 
{ this.name=name; 
}

function Subtype(){ 
	//继承了SuperTypo,同时还传递了参数 
	SuperType.cal1 (this, "Nicholas"); 
	//实例属性， 
	this,age = 29; 
} 
var instance = new SubType (); 
alert (instance.name): //"Nicholas";
alert (instance.age); //29
```

### 原型式继承 (做不到减低效率，和构造模式类似
Object.create();
寄生式(parasitic)继承是与原型式继承紧密相关的一种思路,并且同样也是由克罗克福德推而广之的。寄生式继承的思路与寄生构造函数和工厂模式类似,即创建一个仅用干封装继承过程的函数,该,函数在内部以某种方式来增强对象,最后再像真地是它做了所有工作一样返回对象。以下代码示范了寄,生式继承模式。 function createAnother (original){ var clone = obiect (original);
 //通过调用函数创建一个新对象: 
clone. sayHi = function(){ 
//以某种方式来增强这个对象 
alert ("hi"); }; 
return clone:. 
//返回这个对象 

在这个例子中, createAnother()函数接收了一个参数,也就是将要作为新对象基础的对象。然,后,把这个对象(original)传递给obiect ()函数,将返回的结果赋值给clone,再为clone对象添加一个新方法sayHi(),最后返回clone对象。可以像下面这样来使用createAnother ()函数: 
```
var person ={ 
name: Nicholas",
 Eriends: ["Shelby". "Court". "Van"1. ); 
var anotherPerson = createAnother (person); 
anotherPerson.sayHi(); 
```
//hi.这个例子中的代码基于person返回了一个新对象-anotherperson。新对象不仅具有person的所有属性和方法,而且还有自己的savHi ()方法。在主要考虑对象而不是自定义类型和构造函数的情况下,寄生式继承也是一种有用的模式。前面示,范继承模式时使用的object ()函数不是必需的;任何能够返回新对象的函数都适用于此模式。

-----
## 函数

加粗的代码显示,通过使用arguments.callee代替函数名,可以确保无论怎样调用函数都不会,出问题。因此,在编写递归函数时,使用arguments.callee总比使用函数名更保险。但在严格模式下,不能通过脚本访问arguments.callee,访问这个属性会导致错误。不过,可,以使用命名函数表达式来达成相同的结果。
例如: 
var factorial = (function f(num) 
{ if (num 1)
( return 1； ｝
else 
{ return num. f(num-1); } ｝);

以上代码创建了一个名为f()的命名函数表达式,然后将它赋值给变量factorial,即便把函数,赋值给了另一个变量,函数的名字f仍然有效,所以递归调用照样能正确完成。这种方式在严格模式和,非严格模式下都行得通。

### 闭包与变量

```
function createFunctions()
{
	var result = new Array();
	for(var i=0; i<10; i++)
		{
			result[i]=function(){ return i; };
		}
		return result;
}
createFunctions()

function foo(x) {
    var tmp = 3;
    return function (y) {
        alert(x + y + (++tmp));
    }
}
var bar = foo(2); // bar 现在是一个闭包
bar(10);bar(10);bar(10);


function closureExample(objID, text, timedelay) { 
    setTimeout(function() { 
        document.getElementById(objID).innerHTML = text; 
    }, timedelay); 
} 
closureExample('kw', 'Closure is created', 500);

```
### 关于this 对象


var name = "The Window"; 
var object =
{ 
	name : My obiect", 
	getNamePunc : function () {
		 return function()
		{ return this.name; }; 
}; 
alert (object.getNameFunc()()); //"The window" (在非严格模式下)

解释：每个函数在调用时，其活动对象都会知道取得两个特殊变量，this和argument.

#### 改进
var name = "The Window"; 
var object =
{ 
	name : My obiect", 
	getNamePunc : function () {
		 var that = this;
		 return function()
		{ return that.name; }; 
}; 
alert (object.getNameFunc()()); //"The window" (在非严格模式下)


### 闭包引起的内存泄漏
 function assignHandler()
{ 
var element = document.getElementById ("someElement"); 
element.onclick = function (){alert (element.id); }

以上代码创建了一个作为element元素事件处理程序的闭包,而这个闭包则又创建了一个循环引用(事件将在第13章讨论),由于匿名函数保存了一个对assianHandler()的活动对象的引用,因此,就会导致无法减少element的引用数。只要匿名函数存在, element的引用数至少也是1,因此它所, ,占用的内存就永远不会被回收。不过,这个问题可以通过稍微改写一下代码来解决,如下所示。 

 function assignHandler(){
		var element = document.getElementById("someElement"); 
		var id = element.id 
		element.onclick=function (){ alert (id);}; 
		element = null;//重点
}

### 模仿块级作用域

 function outputNumbers(count)
{ 
	for (var i=0; i< count;i++)
	{ alert(i); }
	alert(i); //计数
}
outputNumbers(2);alert(i);

变量i是定义在，在outPutNumbers()活动对象中，因此自从它有定义开始，就可以在函数内部随处访问它，错误的重新声明一个变量，也不好改变它的值

(function(
	//块级作用域
){})()

用函数来模拟块级作用域
function example(count)
{
	//用函数来模拟
	(for (var i=0; i< count;i++)
	{ alert(i); }
	})()
	alert(i); //导致一个错误
}

### 私有变量
 function myfunction()
{
	//私有变量
	var privateValue=10;
	//私有方法
	function privateFunction(){
		return false;	
	}

	//特权方法
	this.publicMethod = function(){
		privateValue++;
		return privateFunction();
	}
}


利用私有和特权方法


function Person (name)
{
	this.getName = function(){ 
		return name;}
	this.setName  function (value) 
	{ name=value:);
}
var person = new Person ("Nicholas");
alert (person.getName()); //"Nicholas" person 
setName ("Greg");
alert (person.getName ());//"Greq"

记住：初始化未经声明的变量，总是会创建一个全局变量


## window 对象
### 窗口位置兼容
var leftPos= (typeof window. screenLeft == "number") ?window.screenLeft : window.screenX;

var topPos= (typeof window. screenTop == "number")?window.screenTop : window.screenY;

### 窗口大小
var pageWidth = window. innerWidth, pageHeight = window. innerHeight;
if (typeof pageWidth != "number")
{
	if (document.compatMode = "CSS1Compat")
	{ pagewidth = document.documentElement.clientWidth;
	pageHeight = document.documentElement.clientHeight;  
} else { 
	pageWidth = document.body.clientWidth;
	pageHeight  document. body.clientHeight;
}

resizeBy()接收浏览器窗口的新宽度和新高度。

### setTimeout  clearTimeout
setTimeOut指定代码都是这全局执行，this在非严格window对象，严格下是undefined

setInterval  clearInterval

### alter confirm  prompt

### 位置操作

location .(hash,search,hostname,pathname,port):会产生历史记录
replace() 历史记录中没有

location.reload（true）;  //重新加载（从服务器，不从缓存）

### navigator
浏览器信息，不同浏览器的对象也都有自己一套属性

### 检测插件
检测是否安装特定的插件 如 flash  quicktime

### screen ,history

## DOM
### 操作节点
someNode.insertBefore(newNode,null)	//插入后成为最后一个子节点
someNode.insertBefore(newNode,someNode.lastChild)	//插入后成为最后一个子节点前面
someNode.insertBefore(newNode,someNode.firstChild)

replaceChild(newNode,someNode.firstChild)  //替换第一个子节点

removeChild(newNode,someNode.firstChild)  //移除第一个子节点

cloneNode()  相同的副本，true深复制	false浅复制

### document 类型
document 对象是 window对象的一个属性
nodeType 值为9
nodeName 值为 #document
nodeValue 值为 null
parentNode  值为 null
ownerDocument  值null

var html = document. documentElement;
alert (html == document.child[0]);   //true
alert (html == document.firstChild);//  //true1

document.body
document.title  //URL  domain  referrer

getElementById() 和 getElementsByTagName()  //严格大小写，兼容早期浏览器
IE7 及较低版本 input->name  与 id  相匹配的bug

getElementsByTagName() 返回包含零或多个元素的Nodelist
var images = document.getElementByTagName("img")
images.length
images[0].src
images.item(0).src

var myImage=images.namedItem("myImage");  // 通过name 标签值搜索
var myImage=images['myImage'];


getElementsByName()


### dom一致性检测

document. implementation属性就是为此提供相应信息和功能的对象,与浏览器对DOM的实现,直接对应。
DOM级只为document .implementation规定了一个方法,即hasFeature()。
这个方法接受两个参数:要检测的DOM功能的名称及版本号。如果浏览器支持给定名称和版本的功能,则该,方法返回true,
如下面的例子所示:
var hasxmlDom = document. implementation.hasFeature ("XML", .1.0");


### 文档写入
write,writeln,open,close

写在 onload里面 会重写总个页面

### element 类型

nodeType 值为9
nodeName 值为 元素的标签名
nodeValue 值为 null
parentNode  值为 document element
ownerDocument  值 element,text,comment……

sdiy ida"mDiv"</div>
可以像下面这样取得这个元素及其标签名: 
var div = document.getElementById ("myDiv");
alert (div. tagName); //"DIV 
alert (div.tagName = div.nodeName); //true.

大小写注意一下，全部大写

### html 元素
html元素包括以下标准特性：
id:文档的唯一标识符
title：一般通过工具提示条显示出来
lang：语言代码，很少使用
dir：
classname:class 相对应class特性的对应

- 取得属性

getAttribute(),setAttribute(),removeAttribute()

Element类型是使用attributes属性的唯一个DOM节点类型。
attributes属性中包含一个 NamedNodeMap,与Nodetist类似,也是一个“动态”的集合。元素的每一个特性都由一个Attr节点表示,每个节点都保存在NamedNodeMap对象中。 
NamedNodeMap对象拥有下列方法。
getNamedItem (name):返回nodeName属性等于name的节点;
O removeNamedItem (name):从列表中移除nodeName属性等于name的节点;
setNamedItem (node):向列表中添加节点,以节点的nodeName属性为索引;
item (pos):返回位于数字pos位置处的节点。

attributes属性中包含一系列节点,每个节点的nodeName就是特性的名称,而节点的nodeValue ,就是特性的值。要取得元素的id特性,可以使用以下代码。
var id = element.attributes.getNamedItem ("id") .nodeValue;
以下是使用方括号语法通过特性名称访问节点的简写方式。
var id = element.attributes ["id"].nodevalue;
也可以使用这种语法来设置特性的值,即先取得特性节点,然后再将其nodevalue设置为新值,如下所示。

### 创建元素
var div=document.createElement("div");
div.id="mynewdiv";
div.className="box";
    
### Text
文本节点由Text类型表示,包含的是可以照字面解释的纯文本内容,纯文本中可以包含转义后的, i HTML字符,但不能包含HTML代码。Text节点具有以下特征:
nodeType的值为3:.OnodeNane的值为"#text";
nodevalue的值为节点所包含的文本;
parentNode是一个Element;口不支持(没有)子节点。
可以通过nodevalue属性或data属性访问Text节点中包含的文本,这两个属性中包含的值相,同。对nodeValue的修改也会通过data反映出来,反之亦然。使用下列方法可以操作节点中的文本。
appendData (text):将text添加到节点的末尾。
deleteData (offset, count):从offset指定的位置开始删除count个字符。
insertData(offset, text):在offset指定的位置插入text
replaceData (offset, count, text):用text替换从offset指定的位置开始到offset+ count为止处的文本。
splitText (offset):从offset指定的位置将当前文本节点分成两个文本节点。
substringData (offset, count):提取从offset指定的位置开始到offset+count为止处的字符串。除了这些方法之外,文本节点还有一个1ength属性,保存着节点中字符的数目。而且, nodevalue. length和data. length中也保存着同样的值。.

### 创建文本节点
var textNode = document.createTextNode("<strong>hello</strong>");
要添加到新节点，才能看到

### normalize() 
var element = document.createElement("div");
element.className = "message";var textNode  

document,createTextNode ( "Hello world!");
element.appendChiid(textNode);

var anotherTextNode = document.createTextNode ("Yippee!");
element.appendChild (anotherTextNode);
document. body.appendChild (element);
alert (element.chi1dNodes.length); 
element.normalize();
alert (element.childNodes.length);
alert (element firatChi1d nodeValue); Hello worldiyinneeln


### 还有个与splitText()相反的方法

### comment 类型
注释在DOM中是通过comment类型来表示的。
Comment节点具有下列特征:

nodeType的值为8;. 
nogeName的值为"#comment";
nodevalue的值是注释的内容;
parentNode可能是Document或Elenent;
不支持(没有)子节点。


注释节点可以通过其父节点来访问.以下面的代码为例。
div id-"myDiv"><!-A comment --></div>,在此,注释节点是<div>元素的一个子节点,因此可以通过下面的代码来访问它。
var div = document.getElementById("myDiv");
var comment = div.firstChild;alert (comment.data); //A comment

### 10.1.6 CDATASection类型
CDATASection类型只针对基于XML的文档,表示的是CDATA区域。
与Comment类似,CDATASection类型继承自Text类型,因此拥有除splitText ()之外的所有字符串操作方法。
DATASection节点具有下列特征:
nodeType的值为4;
nodeName的值为"#cdata-section";
nodevalue的值是CDATA区域中的内容;
parentNode可能是Document或Element;
不支持(没有)子节点。
CDATA区域只会出现在XML文档中,因此多数浏览器都会把CDATA区域错误地解析为Comment或Element,以下面的代码为例:
<div id-"myDiv"><! [CDATA[This is some content.]]></div>

这个例子中的<div>元素应该包含一个CDATASection节点。可是,四大主流浏览器无一能够这样,解析它。即使对于有效的XHTML页面,浏览器也没有正确地支持嵌人的CDATA区域。在真正的XML文档中,可以使用document . createCDataSection ()来创建CDATA区域,只需为其传入节点的内容即可。

### 10.1.7 DocumentType类型
DocumentType类型在Wcb浏览器中并不常用,仅有Firefox, Safari和Opera支持它。

### Document Fragment
在所有节点类型中,只有Document Fragment在文档中没有对应的标记。
DOM规定文档片段, (document fragment )是种“轻量级”的文档,可以包含和控制节点,但不会像完整的文档那样占用,额外的资源。
DocumentFragment节点具有下列特征: 
nodeType的值为11;
nodeName的值为"#document-fragment";
nodevalue的值为null;
parentNode的值为nul1;
子节点可以是Element, ProcessingInstruction, Comment, Text, CDATASection或EntityReference。

### attr类型
元素的特性在DOM中以Attr类型来表示。在所有浏览器中(包括1E8),都可以访问Attr类型的构造函数和原型。从技术角度讲,特性就是存在于元素的attributes属性中的节点。
特性节点具有,下列特征: 
nodeType的值为11;
nodeName的值是特性的名称;
nodeValue的值是特性的值;
parentNode的值为null;
在HTML中不支持(没有)子节点;

在XML中子节点可以是Text或EntityReference.尽管它们也是节点,但特性却不被认为是DOM文档树的一部分。
开发人员最常使用的是getAt tribute()、setAttribute ()和remveAttribute()方法,很少直接引用特性节点。

### 动态脚本
var script = document.createElement ("script");
script.type = "text/javascript";
script.appendChild (document .createTextNode ("function sayHi() (alert ('hi);}"));

document .body .appendChild(script);
在Firefox, Safari, Chrome和Opera中,这些DOM代码可以正常运行。但在IE中,则会导致错误。IE将<script>视为一个特殊的元素,不允许DOM访问其子节点。不过,可以使用<script>元素的, text属性来指定JavaScript代码,像下面的例子这样:
var script = docunent.createElement ("script");
script.type = "text/javascript";
script.text =function sayHi() (alert ('hi'))"；
 document. body. appendChild (script);


### 动态样式
能够把CSS样式包含到HTML页面中的元素有两个。其中, <link>元素用于包含来自外部的文件,而<style>元素用于指定嵌入的样式。与动态脚本类似,所谓动态样式是指在页面刚加载时不存在的样式;动态样式是在页面加载完成后动态添加到页面中的。我们以下面这个典型的<1ink>元素为例:
<link rel-"stylesheet" type="text/css" href="styles.css">
使用DOM代码可以很容易地动态创建出这个元素:
var link = document.createElement (link");
link.rel = "stylesheet";
link. type = "text/css";
link.href = "style.css";
var head = document.getElementByTagName ("head") [0];
head. appendChild (link);

### 操作表格
table 是HTML 最复杂的结构之一
var table = document.createElement("table")
table.border = 1;
table.width = "100%";

### DOM拓展
querySelector()方法
使用例子：body,#myDiv,.selected,img.button

queryDelectAll()  所有匹配的元素二不仅仅是一个元素，nodeList 的实例

### 元素遍历
childElementCount:返回子元素
firstElementChild
lastElementChild
previousElementSibling
nextElementSibling

var i,len child = element.firstChild; 
while(child t= element. lastChild) 
{ 
	if (child.nodeType = 1)
	{ //检查是不是元素
	processChild(child);
	}
	child = child.nextSibling;
}

而使用Element Traversal新增的元素,代码会更简洁。
var i,1en,child = element.firstElementChild;
while(child !s element. lastElementChild) 
{ 
	processChild(child); 
	//已知其是元素 
	child = child.nextElementsibling;
}

### html 5
getElementByClassName()

### classList 属性    html5
add,contains,remove,toggle

### 焦点管理   html5
button.focus();

document.readystate == "complete"

### 兼容模式，head属性   html5
var head = document.head || document.getElementsByTagName("head")[0]

### charset html5
document.charset = "UTF-8";

### 自定义数据属性 html5
添加非标准属性，前缀data-，

var div = document.getElementById("myDiv");

var appId=div.data