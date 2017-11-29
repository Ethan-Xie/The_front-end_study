# 事件处理
## 事件类型
- 文档加载和准备就绪事件
- 鼠标事件
- 鼠标滚轮事件
- 拖放事件
- 键盘事件
- 文本输入事件

## 表单事件
- form元素会分别触发submit和reset事件，还有change,focus,blur。（那个focus和blur 不冒泡）
- window:load:当文档和其所有外部资源，完全加载完毕，触发
- unload与上面相对，可以用于包存信息。当不可跳转。（focus.blur是适用）
- 

## 鼠标滚轮事件
- 会冒泡，mousemove,mousedown,mouseup,mouseout(ie提供了不冒泡的：mouseenter,mouseleave)
- 滚轮；mousewheel事件。（firefox:DOMMouseScroll事件。）

## 键盘事件
- keyCode,altkey,ctrlKey,metaKey,shiftKey
- keydown,keyup,keypress
- focusin,focusout(不冒泡的定做)

## html5 事件
新加了：audio,videl.各种网络事件，数据缓存，播放状态

## 触摸屏，移动设备事件


## 注册事件处理程序
- 1.给事件目标或文档元素设置属性。2.方式更新并且通用（addEventListener(),ie8之前attachEvent）
```
//第一种，onclick onchange,onload,onmouseover
window.onload=function(){}

//第二种：html标签属性(少用)
<button onclick="alert()" >press this</button>
```
##  addEventListener()
- 接收三个参数：第一个：为事件目标注册事件处理程序，不需“on”
- 二个：指定类型事件发生是应该调用的函数。
- 第三个：通常false，如果是true，那么函数将注册为捕获事件处理程序，并在事件不同调度阶段调用
```
<body>
    <button id="my_button">click me</button>
   
</body>
<script  type="text/javascript">
        var b=document.getElementById("my_button");
        b.onclick=function handleClick(){alert("thanks for you")};
        
        //the second method(这种方法只能调用一次。)<ie8不支持
        b.addEventListener("click",function(){alert("thanks for you 2")},false);

        //移除
        //document.removeEventListener("click",handleClick,true);

        //<ie8 不支持上面两种：使用；addachEvent(),detachEvent();
        if(b.addEventListener){
            b.addEventListener("click",function(){alert("thanks for you 2")},false);
        }else{
            addachEvent("onclick",function(){alert("thanks for you 2")});//两个参数:事件类型(on),处理程序函数
        }
        
  </script>
  ```
## 事件处理参数/运行环境
```
 //处理程序，传递事件对象
        function handler(event){
            event=event || window.event;
            //处理代码
        }

        function addEvent(target,type,handler){
            if(target.addEventListener){
                target.addEventListener(type,handler,false);
            }else{
                target.attachEvent("on"+type,function(event){return handler.call(target,event)});
            }
        }
```
## 事件处理程序的作用域/返回值
- window.location
- 事件的返回值：onclick---false

## 调用顺序
- 通过设置对象属性或html属性的处理程序，最先调用
- 通过addEventListener
- attachEvent注册的处理程序，可能按照任何顺序调用。

## 事件传播
- focus croll blur 不会冒泡
- load会冒泡，但会在window上就停止


## 事件取消
- 用于取消事件浏览器默认操作
- 取消事件相关的默认行为
```
//事件取消
        function cancelHandler(event){
            var event=event || window.event;
            //事件处理代码

            //取消事件相关的默认行为
            if(event.preventDefault)  event.preventDefault();
            if(event.returnValue)   event.returnValue=false;
            return false;
        }
```
- 取消事件的传播，使用stopProgageation().
- 注意：ie9之前不支持stopPropageation()方法，ie有个cancelButtle的属性，这个属性设为true，可以阻止，ie8之前不支持事件传播的捕获阶段，所以冒泡是唯一待取消的事件传播。

## 鼠标事件
- click ,contextmenu,dblclick,mousedown,mouseup,onmouseover,mousemove,mouseout,mouseenter,mouseleave
- 以上事件都有clientx和clientY
- contextmenu ,指的是右键
- 拖动文件元素
- 

## 鼠标滚轮事件http://psiphon3.com/
- 可以通过mousewheel事件来阻止这些默认操作
- firefox浏览器，使用的是“DOMMouseScroll”;
- 处理滚轮事件

## 拖放事件

## 文本事件

## 键盘事件


