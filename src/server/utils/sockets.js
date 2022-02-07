//for handling updates back to clients

//web socket server
//import { io } from '../server'

// module.exports = function wsEmitter(event, data) {
//     //emits, joins - used by apis/controllers
//     io.emit(event, data);
// }

module.exports = function wsListener(io) {
    //listener - handles game/session state updates back to client
    io.on('connection', function(socket){

        console.log("user connected: socketid: " + socket.id);
      
        //catch all listener
        socket.onAny((event, data) => {
            switch (event) {
            case 'newgame': 
                socket.join(data); //data: gameid
                console.log(socket.rooms);
                console.log('emit: newgame | ' + data);
                break;
            case 'joingame': 
                socket.join(data); //data: gameid
                console.log(socket.rooms);
                console.log('emit: joingame | ' + data);
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


