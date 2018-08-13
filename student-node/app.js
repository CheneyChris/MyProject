const express = require('express'); //mvc框架
const path = require('path');
const opn = require('opn');
const bodyParser = require('body-parser');
const session = require('express-session');
const chatServer = require('./chatServer');
const cookieParser = require('cookie-parser');
const mutipart = require("connect-multiparty");

//创建应用
const app = express();

//上传图片
app.use(mutipart({ uploadDir: "./assets/uploads" }));

//设置静态资源目录
app.use(express.static(path.join(__dirname, "/assets")));


//使用session中间件
app.use(session({ secret: 'H1801', cookie: { maxAge: null }, rolling: true, resave: false, saveUninitialized: true }));


//设置body-parser 中间层获取post数据
app.use(bodyParser.urlencoded({ extended: false }));

//将cookie挂载到应用当中去
app.use(cookieParser());

//引入路由 并启动
var Router = require("./src/routers/index");

//给应用设置路由
Router(app);

//启动聊天服务器
chatServer(app);

//设置端口
app.listen(3000, function () {
	console.log('服务已开启');

	//给应用设置路由
	// location.reload();
	// var url = "http://localhost:3000";
	// opn(url,{app:['chrome', '--incognito']});
	// opn(url,{app:['google chrome', '--incognito']});
});

