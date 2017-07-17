var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//不能直接输出结果,输出结果要借助app.GET/POST/ALL方法输出;

var server = app.listen(8081, function() {

});


// ----写入数据库
var mysql = require("mysql");
var connection;

function createConnection() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'login'
    });
};


/*app.post('/gethtml', function(req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    var html = req.body.arr;
    console.log(html);
    console.log('insert into ueditor_test(html) values("' + html + '")');

    createConnection();
    //执行sql语句
    connection.query('insert into ueditor_test(html) values("' + html + '")', function(error, results, fields) {
        if (error) throw error;
    });

    connection.end();

    res.send({
        wscats_code: '0',
    });

    //跟前端进行连接
	io.on("connection",function(socket){
		socket.emit("test",html)
	});
});
*/

/*
app.post('/downhtml', function(req, res, next) {

    res.append("Access-Control-Allow-Origin", "*");

    createConnection();
    //执行sql语句
    connection.query('SELECT * FROM ueditor_test WHERE html is NOT NULL', function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });

    connection.end();
  	
});*/

// ---------长连接模式;
//引入sockit模块;
var ioFn = require("socket.io");

//为了让服务器支持websocket , 实例化服务器
var io = ioFn(server);

//跟前端进行连接
io.on("connection",function(socket){
    socket.on("chat", function(data) {
        console.log(data)
        io.emit("topeople", data)//3)发送公共信息
    })

});




