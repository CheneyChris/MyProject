var io = require('socket.io');
const path = require('path');
const db = require(path.join(__dirname, './src/configs/database.js'));
// console.log(path.join(__dirname, './src/configs/database.js'));
//聊天初始化
function chatInit(app) {

    //并且给应用设置运行的端口
    var server = app.listen(3001, function () {
        console.log('聊天服务已开启');
    });
    //监听所创建的3000的服务端口 websocket
    var ws = io.listen(server);

    //通过user_id找socket
    function findSocketObjOfuserid(groupArr, toid) {
        // console.log("groupArr:",groupArr,"toid",toid);
        let _client = null;
        groupArr.forEach(client => {
            // console.log(client.mysocket);
            for (const key in client.mysocket) {
                // console.log(key,toid,client.mysocket[key]);
                // console.log(ws.sockets.sockets[client.mysocket[key]]);
                if (key == toid) {
                    // console.log("两个条件相等");
                    _client = ws.sockets.sockets[client.mysocket[key]];
                }
            }
        });
        return _client;
    }

    //js数组对象删除指定对象
    function removeObjOfArr(obj, objarr) {
        // console.log("",objarr.indexOf(curobj));
        objarr.forEach(curobj => {

            if (curobj == obj) {

                let curindex = objarr.indexOf(curobj);
                objarr.splice(curindex, 1);
            }
        });
        return objarr;
    }

    //获取所在组的所有在线用户,除了自己
    function getAllInlineClient(clientArr) {
        // console.log("所给组的长度：",clientArr.length);
        let allinlineClient = [];
        clientArr.forEach(client => {
            allinlineClient.push(client.clientobj);
        });
        // console.log("返回给客户端的在线用户信息",allinlineClient);
        return allinlineClient;
    }

    //刷新所在组的所有在线用户列表
    function refreshInlineList(clientArr, curClient) {
        clientArr.forEach(client => {
            client.emit("inlineClient", getAllInlineClient(clientArr));
        });
    }

    let group = []; //群聊组
    let priroom = []; //私聊组

    //绑定连接事件  服务器端的连接成功事件
    ws.on('connection', function (client) {
        // console.log("有客户端连接进来啦~~~~~~~");
        //------------------------- 刷新在线用户列表 -------------------------
        //群聊
        client.on('refreshOfgroup', function (self) {

            let selfclient = findSocketObjOfuserid(group, self.id);
            refreshInlineList(group, selfclient);
        });

        //------------------------- 群聊 -------------------------

        //当有客户端链接进来
        client.on('join', function (user) {

            client.clientobj = user;
            client.mysocket = {};
            client.mysocket[`${user.id}`] = client.id;
            //添加到群聊组
            group.push(client);

            //提醒所有人，谁加入了群聊
            group.forEach(_client => {
                _client.emit('notice', '系统', client.clientobj.name + "加入了群聊😆");
            });

            //服务器接收信息
            client.on('sendMsg', function (msg) {
                //广播方法  发给所有人 但是除了自己以外
                group.forEach(_client => {
                    if (_client != client)
                        _client.emit('getMsg', client.clientobj.name, msg);
                });
            });

            //客户端断开
            client.on('disconnect', function () {
                //广播方法  发给所有人 但是除了自己以外
                // client.broadcast.emit('getMsg', "系统", client.clientobj.name + "退出群聊😫😖");
                group.forEach(_client => {
                    if (_client != client)
                        _client.emit('getMsg', "系统", client.clientobj.name + "退出群聊😫😖");
                });
                //把该用户从群聊组里删除
                group = removeObjOfArr(client, group);

                //延迟调用 显示所有在线用户方法
                setTimeout(function () {
                    refreshInlineList(group, client);
                }, 100);
            });
        });

        //-------------------------  私聊  -------------------------

        //私聊链接
        client.on('pri_join', function (self, targetid) {
            //保存私聊用户
            client.clientobj = self;
            client.mysocket = {};
            client.mysocket[`${self.id}`] = client.id;

            // //判断私聊组的用户是否已经存在
            let isRepeat = false;
            priroom.forEach(eachClient => {
                if (eachClient.clientobj.id == self.id) {
                    isRepeat = true;
                }
            });
            if (!isRepeat) {
                priroom.push(client);
            }
            // priroom.forEach(p => {
            //     console.log("在房间的用户", p.clientobj.name);
            // });

            //判断对方是否在线上，如果在线上，给自己注册一个接受对方消息的事件
            if (findSocketObjOfuserid(group, targetid)) {
                // console.log(`${targetid}该用户在线，注册事件${targetid}`);
                client.emit("pri_join_client", targetid);
            }
            if (client.listeners("pri_sendMsg").length == 0) {
                //私聊发送消息给对方
                client.on(`pri_sendMsg`, function (msg, targetid) {
                    // console.log("内部：", client.listeners("pri_sendMsg").length);
                    let chattime = Date.parse(new Date())/1000;
                    //把聊天记录添加到数据库
                    data={
                        "user_id":client.clientobj.id,
                        "other_id":targetid,
                        "chat_content":msg,
                        "chat_time":chattime
                    };
                    db.table("chat").add(data).then(function(effectrows){
                        console.log("插入数据库是否成功：",effectrows);
                    }).catch(err=>{
                        console.log(err);
                    });

                    let toClient = findSocketObjOfuserid(priroom, targetid);
                    toClient.emit(`pri_getMsg${client.clientobj.id}`, client.clientobj.name, msg);
                    // console.log(toClient.clientobj.name, "的消息接收方法：", `pri_getMsg${client.clientobj.id}`);

                });
                // console.log("外部：", client.listeners("pri_sendMsg").length);
            }


            //客户端断开
            // console.log("用户退出事件：",client.listeners("disconnect").length);
            if (client.listeners("disconnect").length == 1) {
                client.on('disconnect', function () {
                    // console.log("对方退出", client.clientobj.name);
                    // priroom.broadcast.emit('getMsg', "系统", client.clientobj.name + "退出私聊😫😖");
                    priroom.forEach(_client => {
                        if (_client != client) {
                            _client.emit(`pri_getMsg${client.clientobj.id}`, "系统", client.clientobj.name + "退出私聊😫😖");
                        }
                    });

                    priroom = removeObjOfArr(client, priroom);

                });
            }
        });



        //开始发送私聊请求
        client.on("startPri", function (targetid) {

            // console.log(`开始向${targetid}发起私聊`);
            let toClient = findSocketObjOfuserid(group, targetid);
            if (toClient) {
                //提醒聊天对象B，A发来邀请了
                toClient.emit('receiveChatRemind', client.clientobj);

                //告诉当前用户要等到对方接受
                client.emit(`pri_getMsg${toClient.clientobj.id}`, "系统", `请等待对方接受`);
            }
        });

        //同意私聊请求
        client.on("agreePri", function (targetid) {
            let toClient = findSocketObjOfuserid(priroom, targetid);
            if (toClient) {
                toClient.emit(`pri_getMsg${client.clientobj.id}`, "系统", `您正在和${client.clientobj.name}聊天`);
                client.emit(`pri_getMsg${toClient.clientobj.id}`, "系统", `您正在和${toClient.clientobj.name}聊天`);
                toClient.emit("disabledSend",client.clientobj.id);
                console.log("解开禁用");
            }
        });


    });
}


module.exports = chatInit;