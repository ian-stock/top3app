import { LightningElement, track } from 'lwc';
import { SESSIONSTATES, SESSION, createSession } from '../../services/session';
import { io } from "../../../../../node_modules/socket.io-client/dist/socket.io.js"; // whole path for client side

const socket = io();
socket.on("connect", () => {
  console.log("app.socketid: " + socket.id); 
});
socket.onAny((event, data) => {
    console.log(`app.event-received: ${event} - ${JSON.stringify(data)}`);
  });

export default class App extends LightningElement {
    sessionGameId;
    sessionState;
    sessionUserId;

    connectedCallback(){
        this.addEventListener('state_change', this.handleStateChange);
        this.sessionState = SESSION.sessionState;
      }
    
    handleStateChange(evt) {
        if(evt.detail.name === 'NewGame'){
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_NEWGAME;
            this.sessionGameId = SESSION.gameId;
            this.sessionUserId = SESSION.userId;
            this.template.querySelector('ui-header').updateHost();
        }
        if(evt.detail.name === 'JoinedGame'){
            socket.emit('joinedgame', {'gameid5': evt.detail.gameid5, 'userid': evt.detail.userid});
            if(!SESSION.host){
                SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_WAITING_GAME_START;
                this.sessionGameId = SESSION.gameId;
                this.sessionUserId = SESSION.userId;
            }
            // console.log({'event':'joinedgame','gameid5': evt.detail.gameid5, 'userid': evt.detail.userid});
        }
        if(evt.detail.name === 'GameEnded'){
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_LOBBY;
        }
    }

    // UI expressions to dynamically render templates (return true or false)

    get isInLobbyState() {
        return this.sessionState === SESSIONSTATES.IN_LOBBY;
    }
    get isLoginRegState() {
        return this.sessionState === SESSIONSTATES.IN_LOGIN;
    }
    get isNewGameState() {
        return this.sessionState === SESSIONSTATES.IN_NEWGAME;
    }
    get isJoinedGameState() {
        return this.sessionState === SESSIONSTATES.IN_WAITING_GAME_START;
    }

}