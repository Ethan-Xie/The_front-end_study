<script language="javascript" type="text/javascript">
	function  $(id) {
		return document.getElementById(id);
	}
	//创建ajax的引擎
	function  getXmlHttpObject() 
	{
		var xmlHttp2;
		//不同浏览器的获取方式也不一样
		//根据情况建立ajax引擎
		//根据情况建立ajax引擎
        if(window.ActiveXObject){
             
            xmlHttp2=new ActiveXObject("Microsoft.XMLHTTP");
        }else{
             
            xmlHttp2=new XMLHttpRequest();
        }
		
			return xmlHttp2;
	}
	var request;
	//验证用户名是否存在
	function checkName ()
	 {
	 	//var 
			request=getXmlHttpObject() ;
			if(request)
			{
				 //alert("创建ajax引擎成功;"); 通过requestrequest对对象发送请求到服务器的某个页面
				//	var url="registerProcess.php?username="+$("username").value+"&mytime="+(new Date());

				//post要发送的数据
				var url="registerProcess.php";
				var data="username="+$("username").value+"&mytime="+(new Date());
					//document.write(data);
				//request.open("get",url,true);	//(请求的方式，参数指定url,第三个参数true使用异步机制，如果false表示不使用异步）
				//  打开请求
				
				request.open("POST",url,true);
				request.setRequestHeader('Content-type','application/x-www-form-urlencoded');  
				//指定回调函数
				//request.onreadystatechange=chuli2;
                request.onreadystatechange=function(){
                //如果请求完成且成功
                if(request.readyState===4 && request.status===200){
                    //获取响应类型
                    var type = request.getResponseHeader("Content-Type");
                    if(type.indexOf("xml") !==-1 && request.responseXML){
                        console.log(request.responseXML);
                    }else if(type.indexOf("application/json") !==-1  ){
						var json=JSON.parse(request.responseText);//转换为对象
                        console.log(json);
						 console.log(json.res);
                    }else{
                        console.log(type);
                    }
                }
            }
				//真的发送数据，http协议发送
				request.send(data);
				
			}
	}
	//回调函数的处理函数
	function chuli() 
	{
		//window.alert("我是回调函数！");
		//window.alert("服务器返回："+request.responseText);
		if(request.readyState==4)
		{
			//$("myres").value=request.responseText;
			
			//如何取出xml'的数据  alert(request.responseXML);  获取message 的结点
			var mes=request.responseXML.getElementsByTagName("mes");
			//alert(mes.length);   返回是是数组
			var mes_var=mes[0].childNodes[0].nodeValue;
			//alert(mes_var);  
			$("myres").value=mes_var;
		}
		/*onkeyup="checkName ()"*/
	}
	//*****json数据接收
	function chuli2() 
	{
		
		
		if(request.readyState==4)
		{
			//如何取出json的数据 
			var mes=request.responseText;
			//转为对象
			var mes_obj=eval("("+mes+")");
			//alert(mes_obj.res);
			$("myres").value=mes_obj.res;
		}
		
	}
</script>
	用户名：<input type="text" name="username"  id="username">
					<input type="text" id="myres" style="border-width:0;color:red;" /><br/>
	<input type="button" value="检测" onclick="checkName ()" /><br/>
	<input type="text" style="border:1px;" >
	<input  type="button" value="登录" />
<?php	
	header("content-type:text/html;charset=utf-8");
?>