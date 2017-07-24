module.exports = {
    // 一 输入文件  _dirname表示当前文件的路径
    entry: __dirname + "/app/main.js", //输入文件的路径
    output: { //输出文件
        filename: "bundle.js", //输出文件名
        path: __dirname + "/public" //输出文件的路径
    },
    //二 配置加载器，这里是转换非JS文件类型的方法
    module: {
        //1.----将css转为js--
        loaders: [{
            //匹配对应的后缀文件类型
            test: /\.css$/,
            //用两个loader就用!隔开 style在css之前
            loader: "style-loader!css-loader"
        },
        { //2.----将html转为js
			test: /\.html$/,
			loader: "html-loader"
		},
		{//3. ----将图片转为JS
			test: /\.(jpg|png|jpeg|gif)$/,
			loader: "url-loader"
		},
		{//4.----将ES6转为ES5
			test:/\.js$/,
			loader:"babel-loader"
		},{
            //5.vue=>js
            test: /\.vue$/,
            loader: "vue-loader"
        },{//6.字体文件转换成css,然后转换成js   //安装url-loader && file-loader
            test:/\.(woff|svg|eot|ttf)\??.*$/,
            loader:'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
        }]
        
        
    },
    //加这一句  解决引入VUE插件报错
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    //webpackd的服务器
    devServer: {
        contentBase: "./public", //服务器需要加载的文件夹目录
        inline: true, //实时更新
        port:12345,
    }
}
