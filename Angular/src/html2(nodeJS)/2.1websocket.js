//创建一个服务器
var http = require("http");
var app = http.createServer(function(req,res){

});
app.listen(6789);

//引入sockit模块;
var ioFn = require("socket.io");

//为了让服务器支持websocket , 实例化服务器
var io = ioFn(app);

//跟前端进行连接
io.on("connection",function(socket){
    //前端跟后端联系的一个重要对象 发送消息的名字 发送消息的内容
    //1)服务端发送信息:每隔一秒发送一条信息给前端;
    /*setInterval(function(){
    	socket.emit("test","123")  //test
    },1000)*/
    
    //2)服务端接收信息
    socket.on("test2", function(data) {
        console.log(data)
        io.emit("topeople", data)//3)发送公共信息
    })

});
