import { LightningElement } from 'lwc';
import { createNewGame, playerJoinGame } from '../../services/game';
import { SESSION } from '../../services/session';

export default class Lobby extends LightningElement {
    gameNum; //for ui update

    loginRegister(){
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'LoginRegister',
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
            .catch(e => console.error('lobby createNewGame', e.stack))
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

        playerJoinGame(SESSION.userId, SESSION.gameNum, SESSION.host)
            .then((response) => {
                SESSION.gameState = response.gamestate;
                this.gameNum = response.gamenum; //update ui
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

}
