# javascript的学习笔记

### 从今天开始，我就把我的个人学习笔记，以后我与大家也可以看看，前端时间的笔记全写在印象笔记了，没有分天整理。暂时是缺失的。

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