import { LightningElement } from 'lwc';
import { SESSIONSTATES, SESSION } from '../../services/session';
import { io } from "../../../../../node_modules/socket.io-client/dist/socket.io.js"; // whole path for client side
//import { handleSocketEvent } from '../../utils/socketclient';

const socket = io();

export default class App extends LightningElement {
    sessionGameNum;
    sessionState;
    sessionUserName;
    errorState = false;
    errorMessage;
    gamePlayerCount = 0;
    gamePlayerScore = 0;

    connectedCallback(){
        this.addEventListener('state_change', this.handleStateChange);
        this.addEventListener('error_message', this.handleErrorMessage);
        this.sessionState = SESSION.sessionState;


        socket.on("connect", () => {
          console.log("app.socketid: " + socket.id); 
        });
        socket.onAny((event, data) => {
            console.log(`app.event-received: ${event} - ${JSON.stringify(data)}`);
            this.handleSocketEvent(event, data);
        });

    }
    
    //lwc events
    handleStateChange(evt) {
        // console.log('app.handleStateChange: ' + evt.detail.name);
        // console.log(evt);

        if(evt.detail.name === 'LoginRegister'){
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_LOGIN;
        }
        if(evt.detail.name === 'LoggedIn'){
            this.errorState = false; //if previous login error
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_LOBBY;
            this.sessionUserName = SESSION.userName;
        }
        if(evt.detail.name === 'NewGame'){
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_NEWGAME;
            this.sessionGameNum = SESSION.gameNum;
            this.sessionUserName = SESSION.userName;
            this.template.querySelector('ui-header').updateHost();
        }
        if(evt.detail.name === 'JoinedGame'){
            // socket.emit('joinedgame', {'gameid5': evt.detail.gameid5, 'userid': evt.detail.userid});
            socket.emit('joinedgame', SESSION);
            if(!SESSION.host){
                SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_WAITING_GAME_START;
                this.sessionGameNum = SESSION.gameNum;
                this.sessionUserName = SESSION.userName;
            }
            // console.log({'event':'joinedgame','gameid5': evt.detail.gameid5, 'userid': evt.detail.userid});
        }
        if(evt.detail.name === 'GameEnded'){
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_LOBBY;
            SESSION.gameId = SESSION.gameNum = SESSION.gameState = 'notset';
            SESSION.host = false;
            this.sessionUserName = this.sessionGameNum = '';
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
    get isErrorMessage(){
        return this.errorState
    }

    //handle socket events
    handleSocketEvent(event, data){

        switch (event) {
            case 'player-joined': 
                //increment player count 
                console.log('player.joined: ' + event)
                console.log('data.length: ' + data.length)
                console.log(data)
                this.gamePlayerCount = data.length;
            case 'asdf': 
                //console.log('ws emit: newgame | ' + data);
                break;
        }
    }

    //error handling
    handleErrorMessage(evt) {
        // console.log('app.handleErrorMessage: ' + evt.detail.errormsg);
        this.errorMessage = evt.detail.errormsg;
        this.errorState = true;
    }

}