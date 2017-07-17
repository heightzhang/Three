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

http.get("http://www.mzitu.com/zipai/comment-page-1/",function(res){
	var data = "";
	res.on("data",function(chunk){
		data += chunk
	});
	res.on("end",function(){
		//console.log(data);拿到数据;
		//将数据写入cheerio后进行爬虫处理

		var $ = cheerio.load(data);
		var imgArr = [];
		$('img').each(function(index,ele){
			//爬虫后获得的数据如下
			//console.log($(ele).attr("src"));
			//1.爬虫后写入数据库;
			// connection.query('INSERT INTO `text`(`name`, `url`) VALUES ("' + index + '","' + $(ele).attr("src") + '")', function(error, results, fields) {
			// 	if(error) throw error;
			// 	console.log('The solution is: ', results);
			// });
			imgArr.push($(ele).attr("src"));
		});
		//2.爬虫后下载内容
		download(imgArr);
	})

});
var i = 0; //问题:i 的放置问题,为什么down()执行在var i =0 的上方依然可以读取到值?
			//不是应该打印出来变量声明提前,underfine的吗;
//封装下载函数(下载多张)
function download(imgArr){
	var length = imgArr.length;
	//重新命名;
	var writerStream = fs.createWriteStream("../img/"+i+".jpg");
	//读取远程地址的图片,并复制到本地;
	http.get(imgArr[i],function(res){
		//res为读取流 , 通过管道 将 读取流 写入 写入流;
		res.pipe(writerStream);
		//递归 写完第一个图片后再下载第二张;
		if(i<length){
			i++;
			console.log("完成第"+i+"/"+length+"张");
			download(imgArr);
		}else{
			return;
		}
	})
};

