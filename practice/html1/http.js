var http =require("http");
//引入 url模块 与 querystring模块
var url =require('url');
var querystring =require('querystring');

http.createServer(function(request,response){
	//接收传递过来的参数;
	var paramStr  = url.parse(request.url).query;
	var param = querystring.parse(paramStr);  
	console.log('url.parse'+paramStr,'querystring.parse'+param);
	console.log('改变后'+param["name"]);
	
	//设置响应头,解决跨域.
	response.setHeader("Access-Control-Allow-Origin","*");

	//将相应结果显示浏览器上面
	response.end("Hello World");
}).listen(12345);