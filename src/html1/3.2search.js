function search(req,res,connection){
	var value = req.body.value;  //获取Post请求发送过来的参数;
	 //console.log('SELECT * FROM user where username="'+value+'"') //用这种打印方法判断输入的SQL命令是否正确;
	//连接数据库并返回数据;
	connection.query('SELECT * FROM user where username="'+value+'"', function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		res.send(JSON.stringify(results));
	});
	//关闭数据库;
	//connection.end();
}
exports.search =search;