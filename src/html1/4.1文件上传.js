//引入express框架
var express = require("express");
var app = express();
app.listen(3200);

var multer = require('multer');

var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹需要手动创建。
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	//给上传文件重命名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//图片命名规则:name名+时间戳(防止重命名)+后缀名;
		//注意:file.fieldname为input files html标签的name名;
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname+ '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload = multer({
	storage: storage
});

//单图上传
//app.post('/upload-single', upload.single('logo'), function(req, res, next) {
//多图上传
app.post('/upload-single', upload.any(), function(req, res, next) {	
	res.append("Access-Control-Allow-Origin","*");
	res.send({
		wscats_code: '0'
	});
});
