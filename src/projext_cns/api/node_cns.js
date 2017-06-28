//创建一个服务器;
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(8081, function() {});

//数据库配置
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

//接收前端发过来的请求
app.all('/search', function(req, res) {
    //设置请求头;
    res.append("Access-Control-Allow-Origin", "*");
    //连接数据库
    createConnection();
    //console.log('insert into user(username) values("'+value+'")');
    connection.query('SELECT * FROM user where username="' + value + '"', function(error, results, fields) {
        if (error) throw error;
        //results =>array类型
        res.send(results);
    });
    //关闭数据库
    connection.end();
});
