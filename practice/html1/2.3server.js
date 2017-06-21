var http = require("http");
var url = require("url");
var querystring = require("querystring");
var mysql = require("mysql");
//链接数据库
var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"login"
});
//链接数据库;
connection.connect();

//处理接收过来的数据;
http.createServer(function(request,response){
	var post ="";
	request.on("data",function(a){
		post += a;
	});
	request.on("end",function(){
		var params = querystring.parse(post);
		//console.log(url.parse(request.url).pathname);// ---/search 获取该路由;
		switch(url.parse(request.url).pathname){
			case "/search":
				search(request, response);
				break;
			case "/insert":
				insert(request, response);
				break;
			case "/del":
				del(request, response);
			case "/change":
				change(request, response);
		}

	});
	response.setHeader("Access-Control-Allow-Origin","*");
	//response.end("Hello");
}).listen(520);

function search(request, response) {
	connection.query('SELECT username FROM user', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		response.end(JSON.stringify(results));
	});
};
function insert(request, response) {
	connection.query('Insert into user(username) values("111")', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		response.end('111');
	});
};
function del(request, response) {
	connection.query('Delete from user where username="111"', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		response.end('111');
	});
};
function change(request,response){
	connection.query('update user set username="000" where username="111"', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		response.end('000');
	});
}