//接收express框架
var express = require('express');
var app =express();

//需要用bodyParser模块,处理post请求传递过来的参数;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));


//---------------------------首页---------------------------------------------------
// ---------post请求-- 搜索-------------------
app.post('/',function(req,res){
	//设置请求头;
	res.append("Access-Control-Allow-Origin","*");	
	//获取Post请求发送过来的参数;
	
	//链接数据库
	var mysql = require("mysql");
	var connection = mysql.createConnection({
		host:"localhost",
		user:"root",
		password:"",
		database:"login"
	});	

	connection.connect();


	connection.query('SELECT * FROM lagou limit 0,7', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		res.send(results);
			console.log(results)
	});
	//关闭数据库;
	connection.end();

});

var server =app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	//console.log(port) port 为端口名称;
});

//查看更多;
app.get('/',function(req,res){
	res.append("Access-Control-Allow-Origin","*");	
	//接收索引值与数量;
	var page = req.query.page;
	var num =req.query.num;
	console.log(page,num);
	//链接数据库
	var mysql = require("mysql");
	var connection = mysql.createConnection({
		host:"localhost",
		user:"root",
		password:"",
		database:"login"
	});	

	connection.connect();
	//索引值计算
	var index = (page-1)*num;
	console.log("SELECT * FROM lagou limit "+index+","+num);
	connection.query("SELECT * FROM lagou limit "+index+","+num, function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		res.send(results);
	});
	//关闭数据库;
	connection.end();
});


//---------------------------详情页---------------------------------------------------
var mysql = require("mysql");
var connection;

function createConnection() {
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'login'
	});
}
app.post('/detail', function(req, res) {
	res.append("Access-Control-Allow-Origin", "*");
	createConnection();
	
	var id = req.body.id;	

	console.log('SELECT * FROM lagou where id =' + id);
	connection.query('SELECT * FROM lagou where id =  ' + id, function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		console.log(results);
		var obj = {
			detail: results
		}
		res.send(JSON.stringify(obj));
		connection.end();
	});
	
})
// ------------------------上传简历-----------------------------------