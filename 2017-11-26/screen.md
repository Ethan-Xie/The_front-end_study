## 怪异模式、标准模式,13.4.4
要想写出跨浏览器CSS，你最好采用标准模式。
到底都有哪些声明呢？哪种声明更好呢？我们建议你使用XHTML 1.0最严格模式，从一开始我们就应该严格的要求自己
，具体声明如下：
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
　　如果你接手的是一个遗留网页，最初并没有DTD声明，并且使用了很多在XHTML中已经废除的标签，那么，我们建议你使用XHTML兼容模式，声明如下：

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 

所有使用<!DOCTYPE html>的页面中，都是按照标准模式（现代浏览器）
```

## 文档坐标，视口坐标,窗口滚动条的位置
- 第一种实现方式
```
//查询窗口滚动条的位置
           function getScrollOffsets(w)
           {
               w=w || window;//使用指定的窗口，不够不带窗口，就使用当前窗口。
               //除了ie8及更早的版本以外，其他浏览器都能用
               if(w.pageXOffset != null) return{x:w.pageXOffset,y:w.pageYOffset}
               //对标准模式
               var d=w.document;
               //标准模式！！！
               if(document.compatMode="CSS1Compat"){
                   return {
                       w:d.document.clientWidth,
                       h:d.document.clientHeight 
                       }
                }
                return {w:d.body.clientWidth,h:d.body.clientHeight};
            }
            console.log(getScrollOffsets());//因为未滚动，结果为0 0;
```
- 第二种实现方式
```
function getViewportSize(w) {
    // Use the specified window or the current window if no argument
    w = w || window;  

    // This works for all browsers except IE8 and before
    if (w.innerWidth != null) return {w: w.innerWidth, h:w.innerHeight};

    // For IE (or any browser) in Standards mode
    var d = w.document;
    if (document.compatMode == "CSS1Compat")        return { w: d.documentElement.clientWidth,
                 h: d.documentElement.clientHeight };

    // For browsers in Quirks mode
    return { w: d.body.clientWidth, h: d.body.clientWidth };
}

```


## 查询元素的几何尺寸
> 判定一个元素的尺寸与位置最简单的方法就是调用它的 getBoundingClientRect()，ie5+,有点浏览器还返回width,height.但在原始的ie未实现(包含元素的边框，内边距，不包含，外边距)，内敛函数（包含两行……），不是实时的（静态快照）
```
var box= e.getBoundingClientRect();
var w=box.width || (box.right-box.left);
var h=box.height || (box.bottom-box.top);
```
left & top 左上角的x,y  右下角的x,y
如果用户在滚动浏览器中有效：
```
var box= e.getBoundingClientRect();
var offsets=getScrollOffsets;//上面定义deep函数
var x= box.left+offsets.x;
var  y=box.top+offsets.y;
```

## 判定在视口上一个元素点的元素
，意图（未详细指定）；最里面和最上面，使用函数：elementFromPoint(),传入x,y的坐标。如果在视口以外，return null

## 滚动scrollBy scrollTo
```
////获得文档和视口的高度，offsetHeight会在下面解释
           var documentHeight=document.documentElement.offsetHeight;
           var viewportHeight=window.innerHeight;
           window.scrollTo(0,documentHeight-viewportHeight);

//自动翻页
javascript:void setInterval(function {scrollBy(0,10),200});
```

##  scrollIntoView 
scrollIntoView的行为与设置的window.location.hash 为一个命名描点，（<a name="">） 的名字浏览器的产生的行为类似

## 关于尺寸，位置，更多信息
offsetHeight:与clientHeight（返回值也不包含滚动条，但对于内联元素，它始终返回0） ：它们不包含边框大小，只包含内容与内边距，
offsetWidth
offsetLeft
offsetTop
offsetParent

clientHeight:内边距+任何溢出内容的尺寸
clientWidth
clientLeft：通常用不到
clientTop：通常用不到

scrollWidth：滚动条的位置
scrollHeight
scrollLeft：这两个都是可写属性，通过他来让页面滚动。
scrollTop
