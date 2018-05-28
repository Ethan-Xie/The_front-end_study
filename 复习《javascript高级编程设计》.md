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