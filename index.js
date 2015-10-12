var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};
var ips = new Map();

app.get('/', function(req, res){
	var ipTimes = ips.has(getClientIp(req));
	if(ipTimes){
		 ips.set(getClientIp(req),ipTimes++);
	}else{
		ips.set(getClientIp(req),1);
	}
	
	if(getLength(users) >200){
		// 用户数量过多，禁止进入聊天页面
		res.sendFile(__dirname + '/full.html');
		return;	
	}
  res.sendFile(__dirname + '/index.html');
});


// 用户连接
io.on('connection', function(socket){
	
	socket.on('online',function(data){
		socket.name = data.user;
		if(!data.user in users){
			users[data.user]=1;
		}
		 io.sockets.emit('online', {users: users, user: data.user});
	});

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});


// 用户下线 todo:失败
io.on('disconnect', function(){
		delete users[socket.name];
		console.log(socket.name)
		socket.broadcast.emit('offline', {users: users, user: socket.name});
});

// 获取用户数量
function getLength(obj){
	var i = 0;
	 for(var j in obj){
	 		i++;
	 }
	 return i;
}


// 取得客户端IP
function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for'); 
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}


// 判断是否刷屏


http.listen(3030, function(){
  console.log('listening on *:3030');
});
