var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

	socket.on('online',function(data){
		socket.name = data.user;
		if(!users[data.user]){
			users[data.user] = data.user;
		}
		 io.sockets.emit('online', {users: users, user: data.user});
	});

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });



});




http.listen(3030, function(){
  console.log('listening on *:3030');
});
