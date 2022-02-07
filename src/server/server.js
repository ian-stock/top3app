//packages and initialisation
const express = require('express');
const app = express();
const path = require( 'path' ); //util for dealing with file paths
const http = require('http').Server(app); //http server
const io = require('socket.io')(http); // web socket server
//modules
const routes = require('./apis/routes.js');
require('./utils/sockets')(io); //web socket and state handler module, pass in wss

//setup and start web server
const CLIENT_DIR = path.join(__dirname, '../client');
const port = process.env.PORT || 3000;

app.use(express.static(CLIENT_DIR));
app.use(express.json())

// routes / apis - and attach socket.io to it first, to use in routes
app.set("io", io);
routes(app);

http.listen(port, function(){
    console.log('listening on *:' + port);
});

//set up ws server
//socket functions - newgame, joingame, startgame, submitanswer, showanswers, revealuser
//move to separate module




// io.on('connection', function(socket){

//   console.log("user connected: socketid: " + socket.id);

//     //catch all listener
//     socket.onAny((event, data) => {
//       ws.listener(socket, event, data);
//     }

//     //

  
//   // socket.onAny((event, data) => {
//   //   switch (event) {
//   //     case 'newgame': 
//   //       socket.join(data);
//   //       console.log(socket.rooms);
//   //       console.log('emit: newgame | ' + data);
//   //       break;
//   //     case 'joingame': 
//   //       socket.join(data);
//   //       console.log(socket.rooms);
//   //       console.log('emit: joingame | ' + data);
//   //       break;
//   //     case 'leavegame': 
//   //       socket.leave(data);
//   //       console.log(socket.rooms);
//   //       console.log('emit: leavegame | ' + data);
//   //       break;
//   //     case 'disconnect': 
//   //       console.log("user disconnected: socketid: " + socket.id);
//   //       break;
//   //     default: 
//   //       io.to(data[0]).emit(event, data);
//   //       console.log('emit: ' + event + " | " + data);
//   //   }
//   // });

// });

