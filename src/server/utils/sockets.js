//for handling game/session state updates back to clients

module.exports = function (io) {
    
    io.on('connection', function(socket){

        console.log('sockets.userConnected: ' + socket.id);
      
        //catch all listener
        socket.onAny((event, data) => {
            switch (event) {
            case 'newgame': 
                console.log('ws emit: newgame | ' + data);
                break;
            case 'joinedgame': 
                socket.join(data.gameid5); //data: gameid, userid
                console.log(socket.rooms);
                io.to(data.gameid5).emit('player-joined', data)
                break;
            case 'leavegame': 
                socket.leave(data); //data: gameid
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
      
    })
}


