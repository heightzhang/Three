//引入文件系统模块;
var fs = require("fs");
//读取流,读取任意文件;
var readerStream = fs.createReadStream('../img/11.jpg');
// 写入流,创建新文件,自动生成;
var writerStream = fs. createWriteStream('5.2writerStream.txt');

//读取的文件复制给写入的文件里面(可以是流(视频,图片),字符串);
readerStream.pipe(writerStream);console.log(readerStream)