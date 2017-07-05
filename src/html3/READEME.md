#Angular
##配置
###模块
主模块;分模块;合并;重命名;
###控制器
Module
##指令
ng-model:双向绑定; //此指令一般配合input select textarea标签使用
ng-repeat:  ng-repeat = "array" "单项(名字随意) in 数组" 一般配合ul select table标签使用

>ng-XX="" //内置指令都带有前缀ng-
    ng-app //告诉ng框架，<div>元素是ng应用程序 的"所有者"和"控制者"
    ng-controller //定义了应用程序控制器
    ng-init //初始化应用程序数据
    ng-click = "function"
    ng-bind = "name" ==> {{name}}
    ng-model = "" //此指令一般配合input select textarea标签使用
    ng-repeat = "array" "单项(名字随意) in 数组" 一般配合ul select table标签使用
    ng-show = "bool""接受一个布尔值" 如果为真则显示，反之则隐藏
    ng-if = "bool" ng-if直接把DOM节点删除，或者插入DOM节点，ng-if比ng-show效率高一点
    ng-class = "object" ng-class接受的对象，对象名就是这个类名，属性值就是布尔值，如果右边的布尔值为真，那左边的类就出现，反之就隐藏
    ng-src="{{路径}}"
    ng-href="{{路径}}"
    ng-switch="变量"配合ng-switch-when=""


##坑:脏值检测
 原生/JQ  +  angular 可能会导致 脏值检查机制失效,从而导致双向绑定失效;
 解决:手动刷新或者全部用Angular方法;

##服务
$scope
$rootScope
$http
$sce
$timeout和$interval
$window和$document

##控制器之间通信数据

Angular基于$window的数据通信
Angular事件广播
$rootScope
路由传参(跨页面跨路由的情况)
Cookies和本地存储
基于服务器通信数据