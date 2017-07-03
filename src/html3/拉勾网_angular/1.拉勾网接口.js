//接收express框架
var express = require('express');
var app =express();

//需要用bodyParser模块,处理post请求传递过来的参数
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

		var obj = {
			detail: results
		}
		res.send(JSON.stringify(obj));
		connection.end();
	});
	
})
// ------------------------上传头像-----------------------------------
//引入multer模块
var multer = require('multer');

var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹需要手动创建。
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	//给上传文件重命名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//图片命名规则:name名+时间戳(防止重命名)+后缀名;
		//注意:file.fieldname为input files html标签的name名;
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname+ '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload = multer({
	storage: storage
});

//单图上传
//app.post('/upload-single', upload.single('logo'), function(req, res, next) {
//多图上传
app.post('/upload-single', upload.any(), function(req, res, next) {	
	res.append("Access-Control-Allow-Origin","*");
	res.send({
		src:req.files //获取文件名;
	});
});
