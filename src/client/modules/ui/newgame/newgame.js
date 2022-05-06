import { LightningElement, api } from 'lwc';
import { SESSION } from '../../services/session';
import { updateGameTopic } from '../../services/game';
import { io } from "../../../../../node_modules/socket.io-client/dist/socket.io.js"; // whole path for client side

const socket = io();

export default class NewGame extends LightningElement {
    
    @api playerlist; //for ui update

    top3Topic(e){
        SESSION.gameTopic = this.template.querySelector('[data-id="topic"]').value;;
        updateGameTopic(SESSION.gameNum, SESSION.gameTopic)
            .then((response) => {
                socket.emit('top3topic', SESSION);
            })
            .catch(e => console.error('newgame.updateGameTopic', e.stack))
    }

    startGame(e){
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'GameStarted'
            }
        }));
    }

    endGame(e){
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'GameEnded'
            }
        }));
    }
}
