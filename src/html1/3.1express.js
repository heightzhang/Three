//接收express框架
var express = require('express');
var app =express();

//处理post请求传递过来的参数,用bodyParser模块;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
//处理JSON请求
app.use(bodyParser.json());

// ------------get请求-------------------
app.get('/',function(req,res){
	console.log(req.query); //获取get请求发送过来的参数;
	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");

	res.send('get')
	
});
// ---------post请求---------------------
app.post('/',function(req,res){
	console.log(req.body);  //获取Post请求发送过来的参数;
	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");

	res.send('post')
	
});
// ----------All请求----------------------
app.all('/',function(req,res){
	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");

	res.send('all');
})


var server =app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	//console.log(port) port 为端口名称;
});