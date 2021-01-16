const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'))

http.listen(port, function(){
    console.log('listening on *:' + port);
});

//functions - newgame, joingame, startgame, submitanswer, revealanswer

io.on('connection', function(socket){
  socket.on('chat', function(msg){
    io.emit('chat', msg);
    console.log('socket emit: ' + msg);
  });
  socket.onAny((event, data) => {
    console.log(`got ${event}`);
  });
});

