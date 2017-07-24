#webpack的安装与基本配置
全局安装webpack -g 
>  npm install webpack -g
>  
成功后的图片路径 C:\Users\Administrator\AppData\Roaming\npm  webpack.cmd

```JS
// 1.引入JQuery----
var $ = require("jquery");
window.$ = window.jQuery = $;

//--2.引入angular
var angular = require("angular")
    //分模块
var app = angular.module("ngApp", []);

require("./controller.js")(app);

angular.bootstrap(document.body, ["ngApp"]);
```
全局安装webpack-dev-server