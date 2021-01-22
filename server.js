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

  socket.onAny((event, data) => {
    switch (event) {
      case 'joingame': 
        //socket.join(data);
        console.log(socket.rooms)
        console.log('emit: ' + event + " | " + data);
        break;
      case 'joingame': 
        //socket.join(data);
        console.log(socket.rooms)
        console.log('emit: ' + event + " | " + data);
        break;
      case 'showanswers': 
        //io.to(data[0]).emit(event, data);
        io.emit(event, data);
        console.log('emit: ' + event + " | " + data.toString());
      default: 
        //io.to(data[0]).emit(event, data);
        io.emit(event, data);
        console.log('emit: ' + event + " | " + data);
    }
  });
});

