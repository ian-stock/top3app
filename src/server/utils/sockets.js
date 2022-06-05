//for handling game/session state updates back to clients
const db = require('./database.js');
const log = require('../utils/log.js');
const utils = require('./utils.js')

module.exports = function (io) {
    
    io.on('connection', async function(socket){

        log('server.sockets.userConnected', socket.id);
      
        //catch all listener
        socket.onAny((event, data) => {
            log('server.sockets.emit', `${event}, ${data.gameNum}, ${data.userName}`);

            switch (event) {
            case 'newgame': 
                //console.log('ws emit: newgame | ' + data);
                break;
            case 'joinedgame': 
                socket.join(data.gameNum); //data: gameid, userid
                log('server.sockets.joinedgame', socket.rooms);

                db.getPlayerList(data.gameNum, event)
                    .then((players) => {
                        log('server.sockets.getPlayerList.joinedgame', players);
                        io.to(data.gameNum).emit('player-joined', players.rows)
                    })
                break;
            // case 'topicselected': 
            //     io.to(data.gameNum).emit('topic-selected')
            //     break;
            case 'top3topic': 
                io.to(data.gameNum).emit('top3-topic', data.gameTopic)
                break;
            case 'submittedtop3': 
                db.getPlayerList(data.gameNum, event)
                .then((players) => {
                    log('server.sockets.getPlayerList.submittedtop3', players);
                    io.to(data.gameNum).emit('top3-submitted', players.rows)    
                })
                break;
            case 'startvoting': 
                db.getPlayerList(data.gameNum, event)
                .then((players) => {
                    log('server.sockets.getPlayerList.startvoting', players);
                    //randomise list of players before sending back to client
                    io.to(data.gameNum).emit('voting-started', utils.shuffle(players.rows))  
                })  
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
