import { LightningElement, api } from 'lwc';
import { createNewGame, playerJoinGame } from '../../services/game';
import { SESSION } from '../../services/session';

export default class Lobby extends LightningElement {
    gameId; //for ui update

    loginRegister(e){
        // console.log(JSON.stringify(SESSION));
        console.log(SESSION);
    }

    newGame(e){

        //pass in username, return game object with host:userid and gameid
        createNewGame(SESSION.userId)
            .then((response) => {
                SESSION.gameId = response.gameid;
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
                        gameid5: SESSION.gameId, 
                        userid: SESSION.userId
                    }
                }));    
            })
    }

    joinGame(event){
        //if join game get the game id, if not it's create game and set host = true
        if (event != null){
            if(event.target.dataset.id='joinGameBtn'){
                SESSION.gameId = this.template.querySelector('[data-id="gameIdInput"]').value;
            }
        } else {
            SESSION.host = true;
        }

        playerJoinGame(SESSION.userId, SESSION.gameId, SESSION.host)
            .then((response) => {
                SESSION.gameState = response.gamestate;
                this.gameId = response.gameid; //update ui
            })
            .catch(e => console.error('lobby createNewGame', e.stack))
            .then(() => {
                // lwc event - handled by app.js
                this.dispatchEvent(new CustomEvent('state_change', {
                    detail: {
                        name: 'JoinedGame',
                        gameid5: SESSION.gameId, 
                        userid: SESSION.userId
                    }
                }));    
            })
    }

}
