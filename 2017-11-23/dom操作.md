

## 选取文档的元素
- 用指定的id：获取唯一的元素
```
        //通过id获取多个元素
                function getElements(/*ids...*/){
                    var elements={};
                    for(var i=0;i<arguments.length;i++){
                        var id=arguments[i];
                        var ele=document.getElementById(id);
                        if(ele == null){
                            throw new Error("no element with id:"+id);
                        }
                        elements[id]=ele;
                    }
                    return elements;
                }
```
- 用指定的name属性 
：name属性最初打算是为表单元素取名字，但是区别再用name比id,他不是唯一的。多个元素可能有同样的名字，像单选与复选框，但name属性只对少数html元素有效
```
var radio= document.getElementsByName('favorite_color');
```
- 用指定的tagName
用来选取指定类型html/xml元素；getElementsByName/getElementsByTagName会返回一个nodelist对。不区分大小写
运用
```
 var content=Array.prototype.map.call(document.getElementsByTagName("p"),function(e){return e.innerHTML;})
 console.log(content);
 ```
**结果为**
Array[2]  0: "hello"  1: "world"   length: 2   __proto__: Array[0]
- 用制定class:getElementsByClassName();

- 用指定的css的选择器
##**css相关知识；**
- 、#nav--id="nav" div---所以<div>标签 .warning=value---“class包含value的元素”  
- p[lang="fr"]--如:<p lang="fr">  *[name="x"]  所有包含name=“x”的元素
- span.fatal.error   //class包含 fatal/error 所有<span>元素
- span[lang="fr"].warning   //所有class包含 warning的<span> 元素
- 、#log  span  //后代元素表达方式：例：#main p{ color:red; }
- 子元素：表达方式：例：#main>p{ color:red; }
- 后代元素包括子元素，孙子元素，重孙子元素.........
- body>h1:first-child  body元素的第一个\h1\元素
- div，#log  所有<div>的元素的第一个h1元素


## querySelector()  querySelectorAll()  ---等效的方法---$()


## 获取与设置标准的HTML属性
```
var f=document.forms[0];//<form action="https://www.axie.cc" method="POST"></form>
console.log(typeof(f));//object
f.action="https://www.axie.cc";
f.method= "POST";
console.log(f.action);//https://www.axie.cc
```

## 获取与设置非标准的HTML属性

```
var image=document.images[0];
var width=parseInt(image.getAttribute("width"));
image.setAttribute("class","thumbnail");
```
- 还设置了：hasAttribute()  removeAttribute    检测命名属性是否存在和完全删除属性
- 如果操作包含了来自其他命名空间中属性的xml文档，可以使用4个：
- getAttributeNS()  setAttributeNS()  hasAttributeNS()  removeAttributeNS() 
- 为了解决以上不再是合法的有效的html，在H5的文档中，任意以“data-”为小写的属性的名字都是合法。：数据集属性
- h5还定义了dataset属性，该属性指代一个对象，它的各个属性对应于去掉data-属性，因此dataset.x，应该保存data-x属性的值，命名法：data-jquery-test属性变为dataset.jqueryTest属性
- 在使用dataset 需注意现在浏览器有否实现。
- document.body.attributes[0]/.bgcolor/['onload']  body元素的第一个

## 元素内容的选择：html表示，纯文本，元素内容的树状表示

- 作为html的元素内容：innerHTML  
- 作为纯文本的元素内容:.textContent/.innerText 通常可以互换，空元素false/未定义属性
```
var para=document.getElementsByTagName("p")[0];
console.log(para.textContent);
console.log(para.innerText);
```



```
if(obtn.textContent){
            obtn.textContent=="登录"?oLoginHeader_spans[0].id="login-selected":oLoginHeader_spans[1].id="login-selected";
        }else{
            obtn.innerText=="登录"?oLoginHeader_spans[0].id="login-selected":oLoginHeader_spans[1].id="login-selected";
        }

```
-  <p>测试 <i>h22 <b>h333</b>22</i>文档</p>  (如果嵌套p，，需要嵌套递归 )

```
//返回元素e的纯文本内容，，递归进入其子元素
function textContent(e) {
    var child, type, s = "";  // s holds the text of all children
    for(child = e.firstChild; child != null; child = child.nextSibling) {
        type = child.nodeType;
        if (type === 3 || type === 4)  // Text and CDATASection nodes
            s += child.nodeValue;
        else if (type === 1)           // Recurse for Element nodes
            s += textContent(child);
    }
    return s;
}
```
## 结点函数
- parentNode,childNodes,firstChild,lastChild,nextSibling,previoursSibling。document.childNodes[0].childNodes[1]
- nodeType,nodeValue,nodeName。
- firstElementChild,lastElementChild,nextElementSibling,previousElementSibling。
- text和comment结点没有children属性，它意味着上述Node.parentNode属性不可返回text与comment结点，任何element的parentNode总是另一个element，或者追溯到document或documentFragment

```
var para=document.getElementsByTagName("div")[0].parentNode;

//插入指定位置。
function insertAt(parent,child,n){
    if(n<0 || n>parent.childNodes.length){throw new Error("invalid index")}
    else if(n == parent.childNodes.length) parent.appendChild(child);
    else{parent.insertBefore(child,parent.child[n])}
}
```

## 创建与插入，删除节点

```
function loadasync(url){
            var head=document.getElementsByTagName("head")[0];
            var s=document.createElement("script");//创建<script> 元素
            s.src=url;
            head.appendChild(s);//添加<head>中
           //console.log(s);
        }


createElement,createText,appendChild((insertBefore))
createText("text<p>哈哈</p>hello");
```


## 表格的行排序：P383

