import { LightningElement, track } from 'lwc';
import { STATES, getCurrentSession, createSession } from '../../services/session';
import { io } from "../../../../../node_modules/socket.io-client/dist/socket.io.js"; // whole path for client side

const socket = io();
socket.on("connect", () => {
  console.log("app.socketid: " + socket.id); 
});
socket.onAny((event, data) => {
    console.log(`app.event-received: ${event} - ${JSON.stringify(data)}`);
  });

export default class App extends LightningElement {
    @track session;

    connectedCallback(){
        this.addEventListener('state_change', this.handleStateChange);
        this.session = createSession();
      }
    
    handleStateChange(evt) {
        if(evt.detail.name === 'NewGame'){
            this.session.state = STATES.NEW_GAME;
        }
        if(evt.detail.name === 'JoinGame'){
            socket.emit('joingame', {'gameid5': evt.detail.gameid5, 'userid': evt.detail.userid});
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