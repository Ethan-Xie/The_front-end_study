# jQuery4
##  动画的取消，延迟，队列
```
//当鼠标放上去图片变得不透明
$('img').bind({
	mouseover:function() {$(this).stop().fadeTo(300,1.0)};
	mouseout:function() {$(this).stop().fadeTo(300,0.5)}
})

//快速淡出为半透明，等一等，然后向上滑动
$('img').fadeTo(100,0.5).delay(200).slideUp();

/优化，加点延迟更好
$('img').bind({
	mouseover:function() {$(this).stop().delay(100).fadeTo(300,1.0)};
	mouseout:function() {$(this).stop().fadeTo(300,0.5)}
})
```
# 队列
- 每个元素的队列与其它元素的队列彼此独立，可以使用queque()方法对对列添加新 函数。

```
	//用hide方法进行隐藏，
	//实现方法一
	$('img').animated({width:"hide",height:"hide",opacity:"hide"}
			{specialEasing:{width:"linear",height:"linear"}});
			
	//实现方法2
	$('img').animated({width:["hide","linear"],height:["hide","linear"],opacity:"hide"});
	
	
	//淡入显示一个元素，稍等片刻，设置一些文字，然后变化边框
	$('#message').fadeIn().delay(200).queue(function(next){
		$(this).text("hello world");//显示一些文字
		next();//运行队列中的下一项。
	}).animate({borderWidth:"+=10px;"});//将边框加粗
	
	$(this).dequeue;//替代next()方法

```
queque,dequeque，clearQueue();

# jquery中的ajax
## 给它传入一个url，它会异步加载该URL的内容，然后将内容插入到每个选中的函数
```
//每个60s加载并显示最新的状态报告
setInterval(function() {$('#status').load("status_report.html");});

//加载并显示天气预告的温度部分
$("#temp").load("whether_report.html #temperature");
```
- load后面还可以接收两个参数，第一个：数据可以追加到URL后面，如果是字符串？&，自动追加到，如果是对象，会用？&处理后
- 另一个函数是回调函数，请求成功或未成功。每次调用都会传入三个参数：被加载的url完整文本，状态码字符串，以及加载改url的xmlhttpRequest对象
 
```
//状态码
success:成功完成
notmodeified:请求已经正常完成，http 304
error:请求没成功完成，可用通过XmlHttpRequest对象的http状态码来获取
timout:超时
parsererror:请求成功，但jquery无法解析

	//ajax
	$("#temp").load("html.html","name=ethan");//{name:ethan}
	
```

# ajax的工具函数
## jquery.getScript('http://libs.baidu.com/jquery/1.11.3/jquery.min.js')
- jquery.getScript()函数的第一个函数是javascript文件的url，异步加载，然后在全局调用这个，第二个参数：加载和执行完成后调用一个回调的函数
```
jquery.getScript('http://libs.baidu.com/jquery/1.11.3/jquery.min.js'，function(){
	 	$('div').my_plug();//使用加载的类库
})；
```

## jQuery.getJSON()
- 回调函数有三个值，一是：请求回来的结果，二是：状态码，三是：XMLHttpRequest对象
```
//假设：data结果为：｛x:1,y:2｝
jQuery.getJSON('data.json',function(){
	//data为对象：｛x:1,y:2｝
});
```
- 这个函数与load函数类似，可以接收一个对象参数，如果有，则放在第二个但是，回调函数就在第三个参数中。可以说字符串与对象（GET）
- jquery的serialize，url链接合成
```
//可以用以下代码来执行以下代码，来提交html，jQuery.param(),能处理更复杂的函数 
$('#button').click(function(event){
	$(this.form).load(
		this.form.action,
		$(this.form.serialize());//load，将表单数据，附加到表单url后面。
		//事件
		event.preventDefault();
		this.disabled="disabled";
	)
})
```

