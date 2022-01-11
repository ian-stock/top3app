const express = require('express');
const app = express();
const path = require( 'path' ); //util for dealing with file paths
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const CLIENT_DIR = path.join(__dirname, '../client');
app.use(express.static(CLIENT_DIR));

http.listen(port, function(){
    console.log('listening on *:' + port);
});

//functions - newgame, joingame, startgame, submitanswer, showanswers, revealuser

io.on('connection', function(socket){

  console.log("user connected: socketid: " + socket.id);

  socket.onAny((event, data) => {
    switch (event) {
      case 'newgame': 
        socket.join(data);
        console.log(socket.rooms);
        console.log('emit: newgame | ' + data);
        break;
      case 'joingame': 
        socket.join(data);
        console.log(socket.rooms);
        console.log('emit: joingame | ' + data);
        break;
      case 'submitanswer': 
        console.log(socket.rooms);
        console.log("emit: submitanswer, room: " + data[0] + " | " + socket.id);
        io.to(data[0]).emit('submitanswer', data);
        //io.emit('submitanswer', data);
        break;
      case 'showanswers': 
        io.to(data[0]).emit('showanswers', data);
        console.log("emit: showanswers, room: " + data[0] + " | " + socket.id);
        break;
      case 'revealuser': 
        io.to(data[0]).emit('revealuser', data);
        console.log("emit: revealuser, room: " + data[0] + " | " + socket.id);
        break;
      case 'leavegame': 
        socket.leave(data);
        console.log(socket.rooms);
        console.log('emit: leavegame | ' + data);
        break;
      case 'disconnect': 
        console.log("user disconnected: socketid: " + socket.id);
        break;
      default: 
        io.to(data[0]).emit(event, data);
        console.log('emit: ' + event + " | " + data);
    }
  });

});

