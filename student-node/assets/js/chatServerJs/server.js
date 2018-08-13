var express = require('express');
var io = require('socket.io');

//创建一个应用
var app = express();

//__dirname 当前运行文件所在的目录  /chat 设置为静态目录
//设置该应用的静态资源目录
// app.use(express.static(__dirname));

//并且给应用设置运行的端口
var server = app.listen(3000,function(){
  console.log('服务已开启');
});

//监听所创建的3000的服务端口 websocket
var ws = io.listen(server);

//检查昵称是否重复
var checkNickName = function(nickname)
{

    for(k in ws.sockets.sockets)
    {
      //当前连接的所有用户 都判断一遍
      if(ws.sockets.sockets[k].nickname == nickname)
      {
          return true;  //返回true代表已经存在了
      }
    }

    return false;   //该用户不存在可以使用
};

//绑定连接事件  服务器端的连接成功事件
ws.on('connection',function(client){

  client.on('join',function(nickname){

      if(checkNickName(nickname))
      {
        client.emit('nickname'); //已存在
      }else{  //可以使用该昵称
          client.nickname = nickname;

          //将信息返回给所有的客户端
          ws.sockets.emit('notice','系统',nickname+"加入了群聊😆");
      }
  });

  //服务器接收信息
  client.on('sendMsg',function(msg){

    //广播方法  发给所有人 但是除了自己以外
    client.broadcast.emit('getMsg',client.nickname,msg);
  });


  //客户端断开
  client.on('disconnect',function(){
      //广播方法  发给所有人 但是除了自己以外
      client.broadcast.emit('getMsg',"系统",client.nickname+"退出群聊😫😖");
  });
});



