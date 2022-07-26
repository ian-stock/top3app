import { LightningElement, api } from 'lwc';
import { SESSION, PLAYERS } from '../../services/session';

export default class Footer extends LightningElement {
    @api playercount;
    @api playerscore;

    printSession(e){
        console.log(SESSION);    
    }
    printPlayers(e){
        console.log(PLAYERS);    
    }

    // UI expressions to dynamically render templates (return true or false)
    get isDebugDisplayed() {
        // return SESSION.host;
        //  /?debug=true
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('debug') === "true";
    }

}