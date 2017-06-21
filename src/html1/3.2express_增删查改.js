//接收express框架
var express = require('express');
var app =express();

//链接数据库
var mysql = require("mysql");
var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"login"
});	

connection.connect();

//处理post请求传递过来的参数,用bodyParser模块;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));



// ------------get请求--- 刷新----------------
app.get('/f5',function(req,res){
	//console.log(req.query); //获取get请求发送过来的参数;
	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");

	//连接数据库并返回数据;
	connection.query('SELECT * FROM user', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		res.send(JSON.stringify(results));
	});
	
});

// ---------post请求-- 搜索-------------------
app.post('/search',function(req,res){
	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");	
	
	//search部分改为模块化开发;
	require("./3.2search.js").search(req,res,connection);
	
});

// ----------All请求------添加----------------
app.all('/insert',function(req,res){
	var value = req.body.value;
	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");
	//console.log('insert into user(username) values("'+value+'")');
	//连接数据库并返回数据;
	connection.query('insert into user(username) values("'+value+'")', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		res.send(JSON.stringify(results));
	});
});

// ---------------修改-------------------------
app.all('/updata',function(req,res){
	var old = req.body.old;
	var news =req.body.news;

	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");
	//update user set username='fdf' where username='000'
	//console.log('update user set username="'+old+'" where username="'+news+'"');
	//连接数据库并返回数据;
	connection.query('update user set username="'+news+'" where username="'+old+'"', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		res.send(JSON.stringify(results));
	});
});

//---------------删除----------------------------
app.all('/del',function(req,res){
	var value = req.body.value;

	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");
	//'Delete from user where username="111"'命令模版
	//console.log('delete from user where username="'+value+'"'); //检测命令是否正确;
	//连接数据库并返回数据;
	connection.query('delete from user where username="'+value+'"', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		res.send(JSON.stringify(results));
	});
});
var server =app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	//console.log(port) port 为端口名称;
});