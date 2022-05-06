import { LightningElement } from 'lwc';
import { SESSIONSTATES, SESSION } from '../../services/session';
import { io } from "../../../../../node_modules/socket.io-client/dist/socket.io.js"; // whole path for client side
import {log} from '../../utils/log';

const socket = io();

export default class App extends LightningElement {
    sessionGameNum;
    sessionState;
    sessionUserName;
    errorState = false;
    errorMessage;
    gamePlayerCount = 0;
    gamePlayerList;
    gamePlayerScore = 0;
    gamePlayersSubmitted = 0;
    gameTopic;

    connectedCallback(){
        this.addEventListener('state_change', this.handleStateChange);
        this.addEventListener('error_message', this.handleErrorMessage);
        this.sessionState = SESSION.sessionState;


        socket.on("connect", () => {
          log('client.app.socketid', socket.id); 
        });
        socket.onAny((event, data) => {
            log('client.app.event-received', `${event} - ${JSON.stringify(data)}`);
            this.handleSocketEvent(event, data);
        });

    }
    
    //lwc events
    handleStateChange(evt) {
        log('client.app.handleStateChange', evt.detail.name);

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
            socket.emit('joinedgame', SESSION);
            if(!SESSION.host){
                SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_ENTER_TOP3;
                this.sessionGameNum = SESSION.gameNum;
                this.sessionUserName = SESSION.userName;
            }
        }
        if(evt.detail.name === 'TopicSelected'){
            //update topic to all clients in footer
            socket.emit('top3topic', SESSION);
            //update session state and ui
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_ENTER_TOP3;
        }
        if(evt.detail.name === 'Top3Submitted'){
            socket.emit('submittedtop3', SESSION);
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_WAITING_VOTE_START;
        }
        if(evt.detail.name === 'StartVoting'){
            socket.emit('startvoting', SESSION);
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
    get isTop3SubmittedState() {
        return this.sessionState === SESSIONSTATES.IN_WAITING_VOTE_START;
    }
    get isGameStartedState() {
        return this.sessionState === SESSIONSTATES.IN_ENTER_TOP3;
    }
    get isVotingStartedState() {
        return this.sessionState === SESSIONSTATES.IN_VOTING;
    }
    get isErrorMessage(){
        return this.errorState
    }

    //handle socket events
    handleSocketEvent(event, data){

        switch (event) {
            case 'player-joined': 
                //increment player count 
                this.gamePlayerCount = data.length;
                this.gamePlayerList = "";
                for (let i in data) {
                    this.gamePlayerList += data[i].username + '  '
                }
                break;
            case 'top3-topic': 
                this.gameTopic = SESSION.gameTopic = data;
                break;
            case 'top3-submitted': 
                //increment submitted count 
                this.gamePlayersSubmitted = data.length;;
                break;
            case 'voting-started':
                SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_VOTING;
        }
    }

    //error handling
    handleErrorMessage(evt) {
        // console.log('app.handleErrorMessage: ' + evt.detail.errormsg);
        this.errorMessage = evt.detail.errormsg;
        this.errorState = true;
    }

}