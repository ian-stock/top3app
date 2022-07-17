import { createNewGame, getGame } from './game';
import { playerJoinGame } from './player';
import { SESSION } from './session';
import {log} from '../utils/log';

//moved to seperate module so can be called from lobby and end results to start another game 

export function newGameLogic(context, existingGameNum){
        //pass in username, return game object with host:userid and gamenum
        createNewGame(SESSION.userId)
        .then((response) => {
            SESSION.gameNum = response.gamenum;
            SESSION.gameId = response.id;
            SESSION.gameState = response.gamestate;
        })
        .catch(e => console.error('client.gameLogic.createNewGame', e.stack))
        .then(() => {
            joinGameLogic.call(this, SESSION.gameNum, 'fromNewGame')
        })
        .then(() => {
            // lwc event - handled by app.js
            this.dispatchEvent(new CustomEvent('state_change', {
                detail: {
                    name: 'NewGame',
                    gamenum: SESSION.gameNum, 
                    userid: SESSION.userId
                }
            }));    
        })
        .then(() => {
            // lwc event - handled by app.js
            if (context == 'fromResults'){
                this.dispatchEvent(new CustomEvent('state_change', {
                    detail: {
                        name: 'AnotherGame',
                        gamenum: SESSION.gameNum, 
                        userid: SESSION.userId,
                        previousgamenum: existingGameNum
                    }
                }));  
            }  
        })
}

export function joinGameLogic(gameNum, event){
    //if join game get the game id, if not it's create game and set host = true
    log('client.gameLogic.joinGameLogic',JSON.stringify(event));
    SESSION.gameNum = gameNum;
    //if called from new game, set host
    if (event == 'fromNewGame'){
        SESSION.host = true;
    }
    log('client.gameLogic.preGetGame',SESSION.gameNum);
    getGame(SESSION.gameNum)
    .then((response) => {
        log('client.gameLogic.getGame.reponse',JSON.stringify(response));
        if(response == null){
            this.dispatchEvent(new CustomEvent('error_message', {
                detail: {
                    name: 'raiseUIError',
                    errormsg: 'GameID not found' 
                }
            }));
        } else {
            SESSION.gameId = response.id;
            SESSION.gameState = response.gamestate;
            // userid, gamenum, gameid36, host
            log('client.gameLogic.joingame', 'pre-playerJoinGame');
            playerJoinGame(SESSION.userId, SESSION.gameNum, SESSION.gameId, SESSION.host)
                .then((response) => {
                    SESSION.playerId = response.id;
                    // this.gameNum = SESSION.gameNum; //update ui
                })
                .catch(e => console.error('gameLogic.createNewGame', e.stack))
                .then(() => {
                    // lwc event - handled by app.js
                    this.dispatchEvent(new CustomEvent('state_change', {
                        detail: {
                            name: 'JoinedGame',
                            gamenum: SESSION.gameNum, 
                            userid: SESSION.userId
                        }
                    }));    
                })
        }
    })
}