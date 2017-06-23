/*爬虫的关键模块是cheerion模块
	爬虫的目的:写入数据库; 下载内容;
*/
var http =require("http");
//nodejs版本里面的JQ
var cheerio = require("cheerio");
//连接数据库
var mysql = require("mysql");
//文件系统
var fs = require("fs");

var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"login"
});
connection.connect();

// ------一--创建服务器------------------
http.createServer(function(request,response){
    //设置响应头;
    response.setHeader("Access-Control-Allow-Origin","*");
    var post ="";
	request.on("data",function(a){
		post += a;
	});
	request.on("end",function(){
		connection.query('SELECT url FROM text', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		response.end(JSON.stringify(results));
		});
	});
}).listen(12345)
