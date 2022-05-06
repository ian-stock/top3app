import { LightningElement, api } from 'lwc';
import { SESSION } from '../../services/session';

export default class WaitingVote extends LightningElement {

    startVoting(e){
        //change game state, new lwc to load all players as cards and allow voting
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'StartVoting',
            }
        })); 
    }
    // UI expressions to dynamically render templates (return true or false)
    get isHost() {
        return SESSION.host;
    }
    
}
