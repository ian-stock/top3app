import { LightningElement, api } from 'lwc';
import { createNewGame, playerJoinGame } from '../../services/session';

export default class Lobby extends LightningElement {
    game;
    gameId;
    host = false;
    userId = 'anonymous-' + Math.floor(Math.random()*10000);

    loginRegister(e){
        console.log(this.game.id);
    }

    newGame(e){

        //pass in username, return game object with host:userid and gameid
        createNewGame(this.userId)
            .then((response) => {
                this.game = response;
                this.gameId = response.gameid;
            })
            .then(() => {
                this.joinGame()
            })
            .catch(e => console.error('lobby createNewGame', e.stack))
    }

    joinGame(event){
        //if join game get the game id, if not it's create game and set host = true
        if (event != null){
            if(event.target.dataset.id='joinGameBtn'){
                this.gameId = this.template.querySelector('[data-id="gameIdInput"]').value;
            }
        } else {
            this.host = true;
        }

        playerJoinGame(this.userId, this.gameId, this.host)
            .then((response) => {
                this.game = response;
            })
            .catch(e => console.error('lobby createNewGame', e.stack))
            .then(() => {
                // lwc event - handled by app.js
                this.dispatchEvent(new CustomEvent('state_change', {
                    detail: {
                        name: 'JoinGame',
                        gameid5: this.gameId, 
                        userid: this.userId
                    }
                }));    
            })
    }

}
