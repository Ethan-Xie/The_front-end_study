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
 var test= ()=>{
  console.log("123");
 };
 test();
 class Person{
constructor(name,birthday){
this.name=name;
this.birthday=birthday;
}

intro(){
return `${this.name},${this.birthday}`;
}
 }

