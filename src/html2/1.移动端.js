//接收express框架
var express = require('express');
var app =express();



//需要用bodyParser模块,处理post请求传递过来的参数;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// ---------post请求-- 搜索-------------------
app.post('/',function(req,res){
	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");	
	//获取Post请求发送过来的参数;
	var value = req.body.value;  

	//连接数据库并返回数据;

	//链接数据库
	var mysql = require("mysql");
	var connection = mysql.createConnection({
		host:"localhost",
		user:"root",
		password:"",
		database:"login"
	});	

	connection.connect();

	connection.query('SELECT * FROM product_list limit 1,5', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		res.send(results);
	});
	//关闭数据库;
	connection.end();

});
 console.log(666);
var server =app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	//console.log(port) port 为端口名称;
});