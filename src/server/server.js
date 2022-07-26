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

// routes / apis
routes(app);

http.listen(port, function(){
    console.log('server.server: listening on port :' + port);
});


