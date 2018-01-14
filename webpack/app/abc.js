 /*
 //cmd
 var str=require('./app.js');
 document.body.innerHTML="<div>"+str+"</div>";//ethan,你真帅！


//amd
define(["./app.js"],function (str){
	document.body.innerHTML="<div>"+str+"</div>";//ethan,你真帅！
});
 */

  //cmd
 var str=require('./app');
// require('style-loader!css-loader!./css/style.css');//从右往左处理
 // require('style-loader!css-loader!./css/reset.css');//从右往左处理
  require('./css/style.css');//从右往左处理
  require('./css/reset.css');//从右往左处理
 document.body.innerHTML="<div>"+str+"</div><h1>hello</h1>";//ethan,你真帅！
