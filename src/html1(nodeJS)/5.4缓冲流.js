var fs = require("fs");//文件系统
	fs.readFile("5.4test.txt", function(err, data) {
		//console.log(data) =>缓冲流Buffer 64 64 61 66 66 61

		//toString() => 把缓冲流(数据)转化为字符串
			  console.log(data.toString())
		var content = `<tr>    //支持HTML标签
		<th>${data.toString()}</th>
		<th>${req.query.name}</th>
		</tr>`;
		fs.writeFile("5.4test.txt", content, function(err) {

		})
	})