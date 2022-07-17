//for handling game/session state updates back to clients
const db = require('./database.js');
const usr = require('../apis/user');

const log = require('./log.js');
const utils = require('./utils.js')

module.exports = function (io) {
    
    io.on('connection', async function(socket){

        log('server.sockets.userConnected', socket.id);
      
        //catch all listener
        socket.onAny((event, data) => {
            log('server.sockets.emit', `${event}, ${data.gameNum}, ${data.userName}`);

            switch (event) {
            case 'newgame': 
                log('server.sockets.newgame', event);
                break;
            case 'joinedgame': 
                socket.join(data.gameNum); //data: gameid, userid
                log('server.sockets.joinedgame', JSON.stringify([data.gameNum, socket.rooms]));

                db.getPlayerList(data.gameNum, event)
                    .then((players) => {
                        log('server.sockets.getPlayerList.joinedgame', players);
                        io.to(data.gameNum).emit('player-joined', players.rows)
                    })
                break;
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
            case 'answersubmitted': 
                io.to(data.gameNum).emit('answer-submitted')
                break;    
            case 'answerrevealed': 
                io.to(data.gameNum).emit('answer-revealed')
                break;                    
            case 'leavegame': 
                socket.leave(data.gameNum); //data: gameid
                break;
            case 'nextvote': 
                io.to(data.gameNum).emit('next-vote')
                break;                    
            case 'showresults': 
            log('server.sockets.showresults.updateUserScores', data.gameNum);    
            usr.updateUserScores(data.gameNum, event)
                .then(() => {
                    log('server.sockets.showresults.emit', data.gameNum);
                    io.to(data.gameNum).emit('show-results')
                })  
                break;     
            case 'endgame': 
                io.to(data.gameNum).emit('end-game', data.gameNum)
                log('server.sockets.endgame',  event + " | " + data);
                //to-do: delete game, players and answers                
                break;        
            case 'anothergame': 
                let newGameNum = data[0].gameNum;
                let previousGameNum = data[1].previousgamenum;
                log('server.sockets.anothergame.newGameNum', newGameNum);
                log('server.sockets.anothergame.previousGameNum', previousGameNum);
                //emit to old game room to add to new game and socket room
                socket.broadcast.to(previousGameNum).emit('another-game', newGameNum); //to all, except sender (host)
                // io.to(previousGameNum).emit('another-game', newGameNum); //to all, including sender (host)
                break;        
            case 'disconnect': 
                log('server.sockets.user-disconnected', socket.id);
                break;
            default: 
                io.to(data[0]).emit(event, data);
                log('server.sockets.default',  event + " | " + data);
            }
        });
      
    })
}
