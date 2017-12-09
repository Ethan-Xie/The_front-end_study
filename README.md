# javascript的学习笔记

### 从今天开始，我就把我的个人学习笔记，以后我与大家也可以看看

## javascript学习--2017-11-18：继承
## javascript学习--2017-11-15：date & 对象
## JS数据类型详解 11-14，至数组，&globe  &Math
## javascript学习--2017-11-12：第11章：javascript的子集与拓展
## javascript学习--2017-11-9：第九章：类与模块
## javascript学习--2017-11-8：闭包
## javascript学习--2017-11-7：第八章：函数

## 十三章：web浏览器中的javascript（对应2017-11-21）
参考书：[JavaScript权威指南(第6版)] P309-336
```
1 · 比如通过以下方面入手：
1.1 · async && defer
1.2 · 代码：异步载入，并执行脚本
2 · javascript的单线程模型
3 · 三者的执行顺序 head里 & body后 & defer
4 · 三者的执行顺序 head里 & body后 & async
5 · document.readyState：
6 · internet Explorer里的条件注释
7 · 安全性
8 · 防止xss攻击方式：
9 · 拒绝服务攻击
```
## javascript--->window 对象（对应2017-11-22）
参考书：[JavaScript权威指南(第6版)] P336-364
```
1 · 计时器:setTimeout & setInterval
2 · 浏览器定位和导航 window.location
2.1 · 载入新的文档：
3 · 浏览历史
4 · 浏览器和屏幕信息navigator screen
4.1 · screen对象
5 · 打开open、关闭close窗口
6 · 选取文档的元素
```

## javascript--->选取文档元素（对应2017-11-23）
```
1 · 选取文档的元素
2 · css相关知识；
3 · querySelector() querySelectorAll() ---等效的方法---$()
4 · 获取与设置标准的HTML属性
5 · 获取与设置非标准的HTML属性
6 · 元素内容的选择：html表示，纯文本，元素内容的树状表示
7 · 结点函数
8 · 创建与插入，删除节点
9 · 表格的行排序：P383
```
## javascript--->视口screen（对应2017-11-26）
```
1 · 怪异模式、标准模式,13.4.4
2 · 文档坐标，视口坐标,窗口滚动条的位置
3 · scrollIntoView
4 · 关于尺寸，位置，更多信息
```
## javascript--->视口form（对应2017-11-27）
```
1 · html表单
2 · 选取表单和表单元素
3 · 为了判断用户那种运输方式，需要遍历数组中的表单元素
4 · form属性
5 · 按钮
6 · 开关按钮
7 · 文本域
8 · document属性
9 · 可编辑的的内容 editor
```

## 脚本化：css（对应2017-11-28）
```
	* 1 · css定位元素
	* 2 · 第三个维度：z-index
	* 3 · 文本阴影
	* 4 · 边框
	* 5 · box-sizing
	* 6 · 元素显示，可见性
	* 7 · 颜色，透明度，半透明度
	* 8 · 部分可见：overflow和clip
	* 9 · 脚本话，内联样式
	* 10 · css动画
	* 11 · css类
	* 12 · javascript获取外联样式表的css属性值
```
##  1 · 事件处理（对应2017-11-29）
```
1.1 · 事件类型
1.2 · 表单事件
1.3 · 鼠标滚轮事件
1.4 · 键盘事件
1.5 · html5 事件
1.6 · 触摸屏，移动设备事件
1.7 · 注册事件处理程序
1.8 · 鼠标事件
1.9 · 鼠标滚轮事件http://psiphon3.com/
1.10 · 拖放事件
1.11 · 文本事件
1.12 · 键盘事件
```
##  1 · 脚本化http（对应2017-11-30）
```
1 · 脚本化http
1.1 · 超文本传输协议
1.2 · XMLHttpRequest
1.3 · 指定请求
1.4 · 响应 response
1.5 · 编码请求主体
1.6 · 上传文件
1.7 ·
1.8 · 同时包含文件上传和其它元素时。
1.9 · 请求的中止与超时
1.10 · 跨域请求jsonp
1.11 · 基于服务器端推送事件的comet技术
1.12 · 头部信息：附录
```
##  1 · jQuery（对应2017-12-01）
```
1 · jQuery
1.1 · jQuery 优点
1.2 · jquery 基础
1.3 · jQuery()函数
1.4 · 查询与查询结果
1.5 · 获取和设置html属性
1.6 · 获取和设置css属性
```
##  1 · jQuery2（对应2017-12-03）
```
1 · jQuery2
1.1 · 获得元素的4种不同的宽度
1.2 · data----removeDta用法
1.3 · 插入和替换元素/修改文档结构
1.4 · 元素复制：clone
1.5 · 包装方法：wrap,wrapInner,wrapAll
1.6 · 删除元素：empty,remove,
2 · 使用jquery处理事件
2.1 · 事件处理程序简单的注册

```
##  1 · jQuery3（对应2017-12-05）
```
1 · jQuery3
1.1 · 事件处理 bind
1.2 · 注销事件处理程序
1.3 · 动画效果
```
##  1 · jQuery4（对应2017-12-07）
```
1 · jQuery4
1.1 · 动画的取消，延迟，队列
2 · 队列
3 · jquery中的ajax
3.1 · 给它传入一个url，它会异步加载该URL的内容，然后将内容插入到每个选中的函数
4 · ajax的工具函数
4.1 · jquery.getScript('http://libs.baidu.com/jquery/1.11.3/jquery.min.js')
4.2 · jQuery.getJSON()
```
##   jQuery5（对应2017-12-08）

```
1 · jQuery5
· jQuery.get() & jQuery.post()
· jQuery.ajax()函数
· ajax事件
· 工具函数
1.1 · jQuery.browser
1.2 · 其它
· jQuery选择器
· 效率比较
2 · id>form#id
· 组合选择器
· 选择器组
3 · p1,#p2:匹配id为p1和
· 选取的方法
· add()
· 将选中的元素集，用做上下文
· end/andself
<<<<<<< HEAD
· jquery的插件拓展。
· jQuery UI类库：http://jqueryui.com
```
=======
```
>>>>>>> 2dac4976130f9856a6461bb4c2c1cca51b9a5401
