## css定位元素
- static:默认，top.left无效
- relation:元素按照常规的文档6️⃣进行布局。，它的定位i相对于文档流的位置进行调整
- absolute:绝对定位：它的top/left属性相对于position属性除static值以外的祖先元素，如果没有定位过的祖先元素，则相对于文档。
- fixed:相对于浏览器窗口。

## 第三个维度：z-index
指定元素的叠层顺序

## 文本阴影
使用text-shadow属性，可以让文本产生阴影
```
 <span style="text-shadow:3px 3px 1px #888;">投影测试</span>
    <!-- 这里利用定位可以产生相同的效果 -->
    <span style="position:relative;">
        文本
        <span style="position:absolute;top:3px;left:3px;z-index:-1;color:#888">
                文本
        </span>
    </span>
```

## 边框
- border:solid black 1px;
- padding:1px 1px 1px 1px ;(上，右，下，左)

## box-sizing
```
box-sizing ： content-box | border-box | inherit
相关属性 ： 无
取值：
content-box:
此值维持css2.1盒模型的组成模式，border|padding|content {element width=border+padding+content}
border-box:
此值改变css2.1盒模型组成模式，content|border|padding {element width=content}
```
## 元素显示，可见性
- visibility和display

## 颜色，透明度，半透明度
- background-color,border-color
- background-image(background-position,background-repeat,background-attachment)
- 透明度；opacity:0.75;/*透明度，css3属性*/
- filter:alpha(opacity=75);---IE透明度，没有小数点

## 部分可见：overflow和clip
- visibility可以让文档元素完全隐藏，而overflow和clip只显示元素一部分
- css,clip:rect(top right bottom left);指定元素的裁剪区域，裁剪区域是矩形的

## 脚本话，内联样式
- 用javascript为元素完成，需大写（e.style.position="absolute";）
- e.style.left="300px"; 
- 如果通过计算来设置left的值，要在后面+单位  +"px"
```
e.setAttribute("style",s);
e.style.cssText=s;
s=e.getAttribute("style");
s=e.static.cssText
```

## css动画
- 产生视觉效果：setTimeout/setInterval
- transition:opacity .5s ease-in;
- css 伪对象的字符串。指定元素所以样式，var title=window.getComputerdStyle(element,null);

## css类
- 改变function grabAttention(e){e.className="atten"}
-  console.log(document.styleSheets[0].cssRules[0]);//ie 使用 rules
- document.styleSheets[0].insertRule("H1 {text-weight:bold;}",0);//ie 不支持insertRule() deleteRule()。addRule,removeRule
- 

```
//创建一个新的样式表
function addStyles(styles) {
    // First, create a new stylesheet
    var styleElt, styleSheet;
    if (document.createStyleSheet) { // If the IE API is defined, use it
        styleSheet = document.createStyleSheet();
    }
    else {
        var head = document.getElementsByTagName("head")[0]
        styleElt = document.createElement("style"); // New <style> element
        head.appendChild(styleElt);                 // Insert it into <head>
        // Now the new stylesheet should be the last one
        styleSheet = document.styleSheets[document.styleSheets.length-1]
    }

    // Now insert the styles into it
    if (typeof styles === "string") {
        // The argument is stylesheet text
        if (styleElt) styleElt.innerHTML = styles; 
        else styleSheet.cssText = styles;           // The IE API
    }
    else {
        // The argument is an object of individual rules to insert
        var i = 0;
        for(selector in styles) {
            if (styleSheet.insertRule) {
                var rule = selector + " {" + styles[selector] + "}";
                styleSheet.insertRule(rule, i++);
            }
            else {
                styleSheet.addRule(selector, styles[selector], i++);
            }
        }
    }
}
```

## javascript获取外联样式表的css属性值  
```
一般我们知道可以用js的style对象来设置css属性。
比如有一个class为part_1的div，我们想要设置它的背景颜色，我们可以这么写：
document.querySelector(".part_1").sytle.background="blue";
除了设置之外，style对象也可以读取css属性值。比如我已经在part_1该class中写了内联样式（就是在html文件中写）,那我们同样可以用上面的方式来获取它的值：
document.querySelector(".part_1").sytle.background
但是如果样式是写在外联样式表中，那么用style对象是读取不到的。这要分两种情况解决（下面的方法只能读取，不能设置）：
（1）IE：
IE这个解决办法从网上看了下。是将style换成currentStyle即可，比如上面的例子：
document.querySelector(".part_1").currentSytle.background。
（2）other browsers：
其他浏览器用getComputedStyle
上面的例子要这样改：
getComputedStyle(document.querySelector(".part_1").background)

如果要保持兼容性，需得写个判断方法才好（其实jquery就是写好的许多javascript方法的集合）：
比如我们可以这样写。

function getCssValue(goal){
	if(window.ActiveXObject){
		var obj=document.querySelector(goal);
		var value=obj.currentStyle;
		return value;
	}else{
		var obj=document.querySelector(goal);
		var value=getComputedStyle(obj);
		return value;
	}
}
/*下面是调用的方式*/
var x=getCssValue("#progress_1");
alert(x.width);
```