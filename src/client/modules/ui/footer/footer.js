import { LightningElement, api } from 'lwc';
import { SESSION } from '../../services/session';

export default class Footer extends LightningElement {
    @api playercount;
    @api playerscore;
    @api playerssubmitted;
    @api gametopic;

    printSession(e){
        console.log(SESSION);    
    }
    
    // UI expressions to dynamically render templates (return true or false)
    get isHost() {
        return SESSION.host;
    }

}