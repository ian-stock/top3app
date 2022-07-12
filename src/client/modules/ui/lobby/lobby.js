import { LightningElement } from 'lwc';
import { createNewGame, getGame } from '../../services/game';
import { playerJoinGame } from '../../services/player';
import { SESSION } from '../../services/session';
import {log} from '../../utils/log';

export default class Lobby extends LightningElement {
    gameNum; //for ui update

    loginRegister(){
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'LoginRegister'
            }
        }));
        
    }

    newGame(){

        //pass in username, return game object with host:userid and gamenum
        createNewGame(SESSION.userId)
            .then((response) => {
                SESSION.gameNum = response.gamenum;
                SESSION.gameId = response.id;
                SESSION.gameState = response.gamestate;
            })
            .catch(e => console.error('client.lobby.createNewGame', e.stack))
            .then(() => {
                this.joinGame()
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
    }

    joinGame(event){
        //if join game get the game id, if not it's create game and set host = true
        if (event != null){
            if(event.target.dataset.id='joinGameBtn'){
                SESSION.gameNum = this.template.querySelector('[data-id="gameNumInput"]').value;
            }
        } else {
            SESSION.host = true;
        }
        getGame(SESSION.gameNum)
        .then((response) => {
            log('client.lobby.getGame.reponse',JSON.stringify(response));
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
                log('client.lobby.joingame', 'pre-playerJoinGame');
                playerJoinGame(SESSION.userId, SESSION.gameNum, SESSION.gameId, SESSION.host)
                    .then((response) => {
                        SESSION.playerId = response.id;
                        this.gameNum = SESSION.gameNum; //update ui
                    })
                    .catch(e => console.error('lobby.createNewGame', e.stack))
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
    // UI expressions for template rendering and button controls
    get disableLoginButton() {
        return SESSION.authenticated;
    }
    get disableGameControls() {
        return !SESSION.authenticated;;
    }
    
}
