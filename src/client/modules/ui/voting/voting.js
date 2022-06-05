import { LightningElement, api } from 'lwc';
import { SESSION, PLAYERS } from '../../services/session';
import {log} from '../../utils/log';

export default class Voting extends LightningElement {

    playerList;

    connectedCallback(){
        this.playerList = PLAYERS[0];
        log('client.voting.connectedCallback', this.playerList);
        console.log(this.playerList);
        

    }


    vote(e){
        
    }

    nextVote(e){
        //load next player
        
    }

    // UI expressions to dynamically render templates (return true or false)
    get isHost() {
        return SESSION.host;
    }
    
}
