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

##
