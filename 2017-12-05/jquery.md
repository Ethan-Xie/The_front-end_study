# jQuery3
##  事件处理 bind
- 命名空间；
- 第一个数可以说是对象，该对象映射到处理程序函数

```
$("a").bind('mouseout.myMod',f);
$("a").bind('mouseout:f','mouseleave:g');
```

## 注销事件处理程序
- 可以用unbind()来注销它，以避免在将来的事件中触发它
- 注意：unbind只注销bind与jquery注册的事件程序.通过addEventListener()或IE的attachEvent方法注册的处理器不会注销。并且不会移除onclick和onmouseover
```
//移除jquery
$(*).unbind();
//从a元素中取消绑定mouseover
$('a').unbind('mouseover mouseout');

//使用unbind，传入一个参数，来做到只注销命名空间下的处理程序
$('a').unbind('mouseover.myMod');
$('a').unbind('click',myClickHandler);
$('a').unbind({
		click:myClickHandler,
		click:myClickHandler
	});
```
## 触发事件
- 手动触发事件，最简单的方式是不带参数调用事件注册的简单方式
如；
```
$("#my_form").submit();//还有如click,mouseover();
//等价于
$("#my_form").trigger("submit");//触发该类型事件所有处理程序

$("button").trigger("click.ns1");//触发某个命名空间
$("#my_form").trigger("click!");//触发没有命名空间的

//button1 单击处理程序触发button2上的相同程序
$("button1").click(function(e)( $("button2".trigger(e); });
//触发事件时，额外添加属性给事件对象
$("#my_form").trigger("click!"，synthetic:true);
//改处理程序检测额外属性，来区分事件
$("button1").click(function(e)｛if(e.sythetic){}｝
```
## 实时事件
- bind 与addEventListenr与attchEvent()一样
特殊情况：
如果使用bind文档所有a元素绑定了事件处理程序，接着有动态创建了新元素，这些新元素和老元素不会拥有相同的事件处理程序
解决办法：
使用delegate()和undelegate进行替换bind/unbind。通常在$(document)上调用delegate().并传入一个jquery选择器字符串，一个jquery事件类型串，以及一个jquery事件处理程序
$("document").delegate("a","mouseover",linkHander);
//相对应 的静态链接的静态事件处理程序
$("a").bind("mouseover",linkhander);//有四个参数的。第三个是数据

- 还有一个live，有两参数和三参数调用方式，并且在实际中用的更普遍。
$("a").live("mouseover",linkhander);
$("a",$(".dyname")).live("mouseover",linkHandler);

x.live(type,handler);
===$(x.context).delegate(x.selector,type,handler);
## 注销实时事件
$("a").die('mouseover');
$("a").die('mouseover',linkHandler);
- 还有类似的函数
$(document).undelegate('a','mouseover');
```
## 动画效果
- fadeIn()与fadeOut() 简单方法来实现常见的视觉效果
- 除了上面的方法：jquery还定义了一个animate()的方法，
```
//fast=200ms   slow:600ms  ,默认400ms,；还可以设置：jQuery.fx.speeds['medi-fast']=300ms;
$('#id').fadeIn();
$('#id').fadeOut('fast');

//全局禁止动画
jQuery.fx.off=true;
//提供按钮给用户，来关闭动画
$(".stopmoving").click(function(){jQuery.fx.off=true;});

//第二个参数，会在动画完成时调用
$("#message").fadeIn("fast",function(){$(this).text('hello world');}

//jquery 动画的队列化
$("#message").fadeIn(100)..fadeOut(100);
```
- 简单的动画合集：fadeIn,fadeOut,fadeTo
- show,hide,toggle
- slideDown,slideUp,slideToggle
```
//用淡出效果将所有图像隐藏，然后显示它们，接着向上滑动，在向下滑动
	$('img').fadeOut(600).show(300),slideUp().slideToggle();
```
## 自定义动画
- 实现animate方法会将每个元素这些css属性，如上面的slideUp
```
//将所有图片高度缩小到0
$("img").animate({height:0});
// 第二个参数是可选的
$("img").animate({height:0,
  	font-size:10},{
  	duration:500,//动画持续半秒
  	complete:function(){
  	 this.text("hello");//在动画完成时，调用该函数，改变元素的文本
  	}
  	});
  	
```
- 动画第一个参数必须是对象》属性名=css属性名，
- 目前只支持颜色，字体。如果属性值是数值，默认单位是像素
```
$("p").animate({
	"margin-left":"+=.in",//必须用括号括起来
	opacity:"-=.1"
};

- 第二个参数：动画选项如何执行：来指定动画如何执行
- 属性；duration:(还可以是：jquery.fx.speeds,fast,slow
- complete属性：指明动画完成是的回调函数，
- queue:指定是否需要等到，所有尚未发生的动画都完成后在执行改动画。false可取消队列化。
- easing:linear,


