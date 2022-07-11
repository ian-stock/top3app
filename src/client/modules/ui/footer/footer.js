import { LightningElement, api } from 'lwc';
import { SESSION, PLAYERS } from '../../services/session';

export default class Footer extends LightningElement {
    @api playercount;
    @api playerscore;
    @api playerssubmitted;

    printSession(e){
        console.log(SESSION);    
    }
    printPlayers(e){
        console.log(PLAYERS);    
    }

    // UI expressions to dynamically render templates (return true or false)
    get isHost() {
        return SESSION.host;
    }

}