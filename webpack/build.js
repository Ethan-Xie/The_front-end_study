"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var test = function test() {
  console.log("123");
};
test();

var Person = function () {
  function Person(name, birthday) {
    _classCallCheck(this, Person);

    this.name = name;
    this.birthday = birthday;
  }

  _createClass(Person, [{
    key: "intro",
    value: function intro() {
      return this.name + "," + this.birthday;
    }
  }]);

  return Person;
}();
