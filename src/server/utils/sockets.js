//for handling game/session state updates back to clients
// const getPlayerList = require('../apis/player.js');
const db = require('./database.js');

module.exports = function (io) {
    
    io.on('connection', async function(socket){

        console.log('sockets.userConnected: ' + socket.id);
      
        //catch all listener
        socket.onAny((event, data) => {
            console.log(`ws emit: ${event}, ${data.gameNum}, ${data.userName}`);

            switch (event) {
            case 'newgame': 
                //console.log('ws emit: newgame | ' + data);
                break;
            case 'joinedgame': 
                socket.join(data.gameNum); //data: gameid, userid
                console.log(socket.rooms);

                db.getPlayerList(data.gameNum)
                    .then((players) => {
                        io.to(data.gameNum).emit('player-joined', players.rows)
                    })
                break;
            case 'startedgame': 
                io.to(data.gameNum).emit('game-started')
                break;
            case 'leavegame': 
                socket.leave(data); //data: gameid
                break;
            case 'disconnect': 
                console.log("user disconnected: socketid: " + socket.id);
                break;
            default: 
                io.to(data[0]).emit(event, data);
                console.log('emit default: ' + event + " | " + data);
            }
        });
      
    })
}

 


