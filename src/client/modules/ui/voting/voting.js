import { LightningElement, api } from 'lwc';
import { SESSION } from '../../services/session';

export default class Voting extends LightningElement {

    vote(e){
        //load all players as cards and allow voting
        
    }

    nextVote(e){
        //load next player
        
    }

    // UI expressions to dynamically render templates (return true or false)
    get isHost() {
        return SESSION.host;
    }
    
}
