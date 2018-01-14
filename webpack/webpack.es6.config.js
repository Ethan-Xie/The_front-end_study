//创建webpack.config.js
//var webpack = require('webpack');
const path = require('path');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
//const webpack = require('webpack'); // 引入 webpack 便于调用其内置插件

module.exports={
  devtool: 'inline-source-map', // 控制是否生成以及如何生成 source map
  devServer:{
    //检测代码变化并自动重新编译并自动刷新浏览器
    contentBase:path.resolve(__dirname,'build'),//,'dist'
    hot:true,//告诉dev-serve,我再用HMR
    hotOnly:true//如果热加载失败，禁止刷新页面
  },
  //entry:"./app/index.js",//单一 入口文件   
  entry:{
    build:"./es6/index.js"
  },
  output:{
    //path:"./build/",
    path:__dirname+'/es6_build',//输出位置
    filename:"[name].js"//输出文件
  },
  module:{ 
    loaders:[
        {
            test:/\.css$/,//正则
            loader:"style-loader!css-loader",//所需加载器
            //loaders:["style-loader","css-loader"],
            //loader: '"style!css',  webpack1的写法
            exclude:__dirname+"/node_modules"
        },{
          test:/\.js$/,
          loaders:["babel-loader"],
          exclude:__dirname+"/node_modules",
          include:path.resolve(__dirname,"/es6/")
        }
      ]
  },
  //其它解决方案配置
  resolve:{
    extensions:['.js', '.json', '.css', '.scss','jsx']//添加在此的后缀所对应的文件可以省略后缀(要把空数组删除)

  }

};
