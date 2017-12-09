# jQuery5
##  jQuery.get() & jQuery.post()
-  和前面一样，是三个参数：必须的URL，可选的字符串或对象，以及一个技术上可选的回调函数，回调函数会传入三个参数：获取的数据，响应状态字符串
- 第四个参数，即指定数据的类型
- load-html,getScript-script,getJSON-json
- 而这两个函数更加灵活
- ajax数据类型：text,html,xml,script,json,jsonp,(xml,json,script--->text).

## jQuery.ajax()函数
- 仅接受一个选项对象

```
jQuery.ajax({
		type:"GET",//http请求方法
		url:url,//url
		data:null,//null
		dataType:"script",//ajax数据类型，当作脚本执行
		success:callball//完成掉调用使用这个函数。
});
```

- get,post也也接受上面的参数，但ajax接收更多
- jQuery.ajaxSetup()传入一个选项对象来设置任意选项的默认值

```
	//参数还有：contentType,timeout,cache,ifModified,global
	//不同阶段的调用函数:context,beforeSend,success,error,complete
	//不常用的选项与钩子：async,dataFilter,jsonp,jsonpCallback
	jQuery.ajax({
		type:"GET",//http请求方法
		url:url,//url
		data:null,//null
		dataType:"script",//ajax数据类型，当作脚本执行
		success:callball//完成掉调用使用这个函数。
	});
	
	//所有未指定这两项值的ajax
	jQuery.ajaxSetup({
		timeout:2000,//两秒后取消ajax请求
		cache:false //通过给URL，添加时间戳来禁用浏览器缓存
	})
```

## ajax事件
- beforeSend,success,error,complete使用的方法，自定义
- 两者方法自定义：一是使用bind,二是使用事件注册函数

```
$('#loading_animation').bind({
		ajaxStart:function{ $(this).show();},
		ajaxStop:function{ $(this).hide();}
	})
```
## 工具函数
### jQuery.browser
- 不是一个函数，而是一个对象，用于客户端嗅探：
- ie:$.browser.msie==true
- firefox:$.browser.mozilla==true
- safari/chrome:$.browser.webkit==true
- opera:$.browser.opera==true
- 还包括客户端版本号，尽量不要用客户端嗅探，但是可以通过这个啦解决一部分bug
```
if($.browser.mozilla && parseInt($.browser.version)<4){
	//在此加入相应的代码
}
```
### 其它
- contains,each,extend,globalEval,grep,inArray,isArray,isEmptyObject,isFunction,isPlainObject,makeArray,map,merge,parseJSON,proxy,support,trim

## jQuery选择器
//在其父元素在其父节点的子元素中排行第一第二，只要他们含有javascript单词，就不包括《a》元素
p:nth-child(3n+1):text(javascript):not(:has(a));
//见附录

## 效率比较
:radio>input:radio
//id
#id>form#id

## 组合选择器
- div i==div里的i元素
- div > i== div里的子元素
- div +i  ==div的第一个具有i兄弟元素
- div~i  ==后面的兄弟元素

## 选择器组
h1,h2,h3:匹配h1和
#p1,#p2:匹配id为p1和
div.note,p.note：匹配class="note"的div和p
body>p,div.note>p:body和div class="note"下的

(h1,h2,h3)+p :非法
h1+p,h2+p,h3+p  ：正确

##选取的方法

var pa=$('p');
pa.first(); 选取第一个
pa.last();选取最后一个
pa.eq(1);选取第二个
pa.eq(-2);选取倒数第二个
pa[1];第一个p元素本身

$('p').slice(2,5);获取第345个
$('p').slice(-2);获取最后3个


$("div").filter(".note");//与$("div.note")一样
$("div").filter($(".note"));//与$("div.note")一样
$("div").filter(function(idx){return idx%2==0;};//与$("div.even")一样

$("div").not("#heaeer,#footer");//除了这个两个特殊id元素外

$("p").has("a[href]"); 拥有链接的所有段落

## add()

//选取所有div和所有p元素的等价方式
$("div,p");
$("div").add("p");
$("div").add($("p"));
var pa=document.getElementsByTagName("p");
$("div").add(pa);

## 将选中的元素集，用做上下文
- find,children,next,prev,nextAll,prevAll,parent,parents,closest,parentsUntil

```
$("div").find("p");//在div中查找p元素，与（"div p"）相同
//寻找id为header和footer元素的子节点，元素中所有span元素。两者返回值不同
$("#header>span,#footer>span")//与下面相等
$("#header,#footer").children("span");

$("h1").next("p");//与$("h1+p")
$("h1").prev();//h1元素前面的兄弟元素
//nextAll,prevAll是返回所有元素。

$("li").parent();//父节点
$("a[href]").parents("p");//含有链接p结点

$("a[href]").closest("div");//包含所有链接的最里层div
$("a[href]").parentsUntil(":not(div)");//所有包裹a的div元素
```
## end/andself

## jquery的插件拓展。

- jquery.fn是所有jQuery对象的原型对象

```
	//给函数添加一个函数，该函数成为一个jquery方法
	jQuery.fn.println=function(){
		//将所有参数合并成空格分隔的字符串
		var msg=Array.prototype.join.call(arguments," ");
		//遍历jquery对象中的每一个元素
		this.each(function(){
			//将参数字符串作为纯文本添加到每一个元素后面，并添加br/
			jQuery(this).append(document.createTextNode(msg).append("<br/>"));
		});
		//返回这个未加修改的jquery对象，以便链式调用
		return this;
	}
	//直接调用即可
	$("#debug").println("x=",x,";y= ",y);
	
```
- 不要依赖$标识符：

```
(function($){
	//在此书写插件代码
	
}(jQuery);
```

- 可以通过给jQuery.expr[':']对象添加属性来添加新的伪类选择器。
- 下面例子定义了一个新的draggable过滤器，可用来返回draggable=true属性的元素

```
jQuery.expr[':'].draggable=function(e){return e.draggable === true;};
```
- 那么可以通过$(img:draggable)来选取可以拖拽的图片，还可以通过$("img[draggable]")。

## jQuery UI类库：http://jqueryui.com

```
//将类为date的input元素转化为日期选取组件
$("input.date").datepicker();
```


