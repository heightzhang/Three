var http =require("http");
http.createServer(function(request,response){
	//设置响应头;
	response.setHeader("Access-Control-Allow-Origin","*");
	//将相应结果显示浏览器上面
	response.end("Hello World");
}).listen(12345);		