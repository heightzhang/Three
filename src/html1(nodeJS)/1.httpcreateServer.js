/*----------获取post请求参数--------*/
// //创建服务器
// var http = require("http");
// /*前端传递
// 	data:{type:post,name:heightzhang},
// 	dataType:'json'*/
// //=>引入querystring模块处理参数(将url参数转为对象);
// var querystring = require('querystring') //将传递过来的type=post&name=heightzhang 参数转成对象;
// http.createServer(function(request,response){
//     //设置响应头;
//     response.setHeader("Access-Control-Allow-Origin","*");

//     //接收传递过来的参数;
//     var post ="";
//     request.on("data",function(msg){//data是固定的;
//     	 			  //msg为Buffer值;
//         post += msg;  //console.log(post);=>type=post&name=heightzhang 
//         post = querystring.parse(post);//console.log(post)=>{type:post,name:heightzhang}
		
//     });

//     request.on('end',function(){
//          //请求结束后响应头返回前端,返回前端值为:{type:post,name:heightzhang} 
// 		response.end(JSON.stringify(post))
//     });
// }).listen(12345)
// //端口号有范围限制0~65535

/*----------获取get请求参数--------*/

/*前端传递
	data:{type:post,name:heightzhang},
	dataType:'json'*/

//创建服务器
var http = require("http");
//引入url模块
var url =require('url');
//=>引入querystring模块处理参数(作用:将url参数转为对象);
var querystring = require('querystring') //将传递过来的type=post&name=heightzhang 参数转成对象;
http.createServer(function(request,response){
    //设置响应头;
    response.setHeader("Access-Control-Allow-Origin","*");

  	//处理传递过来的参数并且打印出来
    var paramStr  = url.parse(request.url).query; //console.log(request.url)=>/?type=post&name=heightzhang
    //console.log(url.parse(request.url))//url.parse方法后,有query哈希值属性,也有path路由属性;
    
    //consle.log(paramStr)=>type=post&&name=heightzhang;
    var param = querystring.parse(paramStr);//console.log(param)=>{type:post,name:heightzhang}
    
	response.end(JSON.stringify(param))
//response.end('111')
}).listen(12345)
//端口号有范围限制0~65535