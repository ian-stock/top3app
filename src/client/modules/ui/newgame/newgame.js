import { LightningElement, api } from 'lwc';
import { SESSION } from '../../services/session';
import { updateGameTopic } from '../../services/game';

export default class NewGame extends LightningElement {
    
    @api playerlist; //for ui update

    top3Topic(e){
        SESSION.gameTopic = this.template.querySelector('[data-id="topic"]').value;;
        updateGameTopic(SESSION.gameNum, SESSION.gameTopic)
            .then((response) => {
                // lwc event - handled by app.js - change host screen to next one
                this.dispatchEvent(new CustomEvent('state_change', {
                    detail: {
                        name: 'TopicSelected'
                    }
                }));    
            })
            .catch(e => console.error('newgame.updateGameTopic', e.stack))
    }

    endGame(e){
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'GameEnded'
            }
        }));
    }
}
