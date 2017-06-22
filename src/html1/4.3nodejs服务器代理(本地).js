var http = require("http");
//node代理PHP服务器; 原生节点; nodejs与php的连接;

//理解:相当于nodejs向php发送了"ajax请求",用http.request方法;
//http://localhost/three/test.php
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