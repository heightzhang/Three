var express = require('express');
var http = require("http");
var fs = require("fs")

var app = express();
//中间层
app.get('/', function(req, res) {
	//一 nodejs专门写文件 写入的是?name=laoxie 后面的laoxie;
	fs.readFile("log.txt", function(err, data) {
			//data.toString() 文件值;
			//console.log(req.query.name); req.query.name 为 laoxie;
			var content = data.toString() + req.query.name + "   ";
			fs.writeFile("log.txt", content, function(err) {
			})
		})
//二 -------- 通信php 相当于node发送AJAX请求给PHP;---------------
		//php专门存数据库
		http.request({
		hostname: 'localhost',
		port: '80',
		path: '/three/test.php?name=heightzhang',
		method: 'GET'
	}, function(res) {
		res.setEncoding('utf8');
		var data = "";
		res.on('data', function(chunk){
			data += chunk
		});
		res.on('end', function(){
			//console.log("success")
			console.log(data);
		});
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	}).end();
//-----------------------------------------------------------------

	res.send('Hello World');
})
app.listen(6789)