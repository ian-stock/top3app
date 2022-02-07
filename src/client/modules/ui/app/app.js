import { LightningElement, track } from 'lwc';
import { STATES, getCurrentSession, createSession } from 'services/session';
//import { io } from "socket.io-client"; // doesn't work with rollup, leave in html
// const { io } = require("socket.io-client");
// const socket = io();


export default class App extends LightningElement {
    @track session;

    connectedCallback(){
        this.addEventListener('state_change', this.handleStateChange);
        this.session = createSession();
      }
    
    handleStateChange(evt) {
        if(evt.detail.name === 'NewGameStarted'){
            this.session.state = STATES.NEW_GAME;
        }
        if(evt.detail.name === 'GameEnded'){
            this.session.state = STATES.IN_LOBBY;
        }
    }

    // UI expressions to dynamically render templates (return true or false)

    get isInLobbyState() {
        return this.session.state === STATES.IN_LOBBY;
    }
    
    get isLoginRegState() {
        return this.session.state === STATES.IN_LOGIN;
    }

    get isNewGameState() {
        return this.session.state === STATES.NEW_GAME;
    }

}