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
        database: 'cns'
    });
};
// ------------------1.初始化,生成页面-------------------
//接收前端发过来的请求
app.all('/search', function(req, res) {
    //设置请求头;
    res.append("Access-Control-Allow-Origin", "*");

    //接收分页
    var pageNum = req.body.pageNum; // 5
    var page = req.body.page;
    var index = (page-1)*pageNum;

    console.log(pageNum,page)

    //连接数据库
    createConnection();
    //console.log('insert into user(username) values("'+value+'")');
    connection.query(`SELECT * FROM lagou limit ${index},${pageNum}`, function(error, results, fields) {
        if (error) throw error;
        var data = results;
        //计算数据库的总数量;
        connection.query('select count(*) from lagou', function(error, results, fields) {
            if (error) throw error;
            //results =>array类型
            //console.log(results[0]["count(*)"]);
            var obj = {
                data: data,
                num: results[0]["count(*)"]
            };
            res.send(JSON.stringify(obj));
            //关闭数据库 
            connection.end();
        });
    });

});

//----------------2.修改页面第一步:通过id获取页面数据----
app.all('/get', function(req, res) {
    //设置请求头;
    res.append("Access-Control-Allow-Origin", "*");
    //获取id;
    var position_id = req.body.position_id;
    //console.log('SELECT * FROM lagou where position_id = ' + position_id);
    //连接数据库
    createConnection();
    connection.query('SELECT * FROM lagou where position_id = ' + position_id, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
        //关闭数据库 
        connection.end();
    });

});

//--------------修改页面第二步:修改数据库------------
app.all('/edit', function(req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    //获取Cilent传递过来的数据;
    var msg = req.body;
    /*    { company: '西会科技',
      position_name: 'web前端',
      salary: '15k-25k',
      insdustry: '移动互联网 / 成长型(A轮)',
      job_introduce: '“大量使用新技术新框架，敢于尝试的技术团队”' }*/

    //连接数据库;
    createConnection();
    //多条命令更新到数据库;
    for (var attr in msg) {
        //console.log('update lagou set '+attr+'="' + msg[attr] + '" where position_id = ' + msg.position_id)
        connection.query('update lagou set ' + attr + '="' + msg[attr] + '" where position_id = ' + msg.position_id, function(error, results, fields) {
            if (error) throw error;
        });
    }
    res.send('ok');
    //关闭数据库 
    connection.end();
});

/*//-------------------修改页面第三步:修改头像路径;
app.all('/picture', function(req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var msg = req.body;
    createConnection();
    connection.query('update lagou set logo ="' + msg.logo + '"where position_id = ' + msg.position_id, function(error, results, fields) {
        if (error) throw error;
        res.send('ok');
    })
});*/

//---------------------3.新增页面----------;
app.all('/increase', function(req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    //获取Cilent传递过来的数据;
    var msg = req.body;
    /*    
    { 
    position_id:123;
    company: '西会科技',
    position_name: 'web前端',
    salary: '15k-25k',
    insdustry: '移动互联网 / 成长型(A轮)',
    job_introduce: '“大量使用新技术新框架，敢于尝试的技术团队”'
     }
    */
    //连接数据库;
    createConnection();
    //多条命令更新到数据库;
    //console.log('INSERT INTO lagou(position_id, company, salary, position_name, job_introduce, industry,logo) VALUES ("' + msg.position_id + '","' + msg.company + '","' + msg.salary + '","' + msg.position_name + '","' + msg.job_introduce + '","' + msg.industry + '","' + msg.logo)
    connection.query('INSERT INTO lagou(position_id, company, salary, position_name, job_introduce, industry,logo) VALUES ("' + msg.position_id + '","' + msg.company + '","' + msg.salary + '","' + msg.position_name + '","' + msg.job_introduce + '","' + msg.industry + '","' + msg.logo + '")', function(error, results, fields) {
        if (error) throw error;
    });

    res.send('ok');
    //关闭数据库 
    connection.end();
});

// -----4.删除页面------------------------
app.all('/del', function(req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var position_id = req.body.position_id;
    createConnection();
    connection.query('delete from lagou where position_id="' + position_id + '"', function(error, results, fields) {
        if (error) throw error;
        //results =>array类型
        res.send('ok');
        //关闭数据库 
        connection.end();
    });
});
//-------5.筛选--------
//根据公司名筛选;
app.all('/soushuo', function(req, res) {
    res.append("Access-Control-Allow-Origin", "*");
    var select = req.body.select;
    var value = req.body.value;
    console.log(select, value);
    //console.log(`SELECT * FROM lagou where ${select} = '${value}'`)

   
    var mysql = `SELECT * FROM lagou where ${select} = '${value}'`;

    //当条件为公司类型或者薪资的时候,执行弱搜索;
    if (req.body.select === 'industry' || req.body.select === 'industry') {
        mysql = `SELECT * FROM lagou where ${select} LIKE '%${value}%'`
    };

    createConnection();
    connection.query(mysql, function(error, results, fields) {
        if (error) throw error;
        var data = results;
        //计算搜索结果的总数量;
        connection.query('select count(*) from lagou', function(error, results, fields) {
            if (error) throw error;
            //results =>array类型
            //console.log(results[0]["count(*)"]);
            var obj = {
                data: data,
                num: data.length //筛选后的数据;
            };
            res.send(JSON.stringify(obj));
            //关闭数据库 
            connection.end();
        });
    });
});






// -------------6.更换头像功能-----------
//引入multer模块
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
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({
    storage: storage
});
//设置静态文件夹uploads;
app.use(express.static('uploads'));

//多图上传
app.post('/upload-single', upload.any(), function(req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    res.send({
        src: req.files //获取文件名;
    });
});


//-------------7.编辑器保存数据结构;
app.all('/savehtml', upload.any(), function(req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    var html = req.body.html;
    var title = req.body.title;
    //数据库操作;
    createConnection();
    //标准写法;
    connection.query(`INSERT INTO article(title,html) VALUES ('${title}', '${html}')`, function(error, results, fields) {
        if (error) throw error;
    });
    res.send('ok');
    connection.end();
});
//-------------8.文章页面获取html结构;
app.all('/gethtml', upload.any(), function(req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    var id = req.body.id;

    //数据库操作;
    createConnection();
    //标准写法;
    //console.log(`SELECT * FROM article where id = ${id}`)
    connection.query(`SELECT * FROM article where id = ${id}`, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
    connection.end();
});
//-------------9.文章列表结构;
app.all('/getlist', upload.any(), function(req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    //数据库操作;
    createConnection();
    //标准写法;
    //console.log(`SELECT * FROM article where id = ${id}`)
    connection.query(`SELECT * FROM article`, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
    connection.end();
});
