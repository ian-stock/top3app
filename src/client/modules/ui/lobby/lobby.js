import { LightningElement, api } from 'lwc';
import { newGameLogic, joinGameLogic } from '../../services/gamelogic';
import { SESSION } from '../../services/session';
import {log} from '../../utils/log';

export default class Lobby extends LightningElement {
    gameNum; //for ui update

    loginRegister(){
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'LoginRegister'
            }
        }));
    }

    //moved most logic to gamelogic.js so could be called by ui-results at end for another game as well
    newGame(){
        //.call and 'this' passes in the context of this component so dispatchEvent still works
        newGameLogic.call(this, 'fromLobby');
    }

    joinGame(event){
        let gameNum = this.template.querySelector('[data-id="gameNumInput"]').value;
        if (gameNum == null || gameNum == ''){
            this.dispatchEvent(new CustomEvent('error_message', {
                detail: {
                    name: 'raiseUIError',
                    errormsg: 'Please enter a GameID' 
                }
            }));
        } else{
            joinGameLogic.call(this, gameNum, event);
        }
    }

    // UI expressions for template rendering and button controls
    get disableLoginButton() {
        return SESSION.authenticated;
    }
    get disableGameControls() {
        return !SESSION.authenticated;;
    }
    
}
