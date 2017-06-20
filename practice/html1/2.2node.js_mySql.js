var mysql = require("mysql");
//配置数据库的连接
var connection = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"login" //数据库地址;
});
//进行数据库连接
connection.connect();
//执行sql语句
connection.query('SELECT username FROM user',function(error,results,fields){
	if(error) throw error;
	console.log('The solution is: ',results);
});
//关闭数据库链接
connection.end();