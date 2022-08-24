import { LightningElement } from 'lwc';
import { SESSIONSTATES, SESSION, PLAYERS } from '../../services/session';
import { io } from "../../../../../node_modules/socket.io-client/dist/socket.io.js"; // whole path for client side
import { setCookies, resetSessionFromCookies, deleteCookies } from '../../utils/cookies';
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
    votingRevealed;

    connectedCallback(){
        this.addEventListener('state_change', this.handleStateChange);
        this.addEventListener('error_message', this.handleErrorMessage);
        //refresh safe
        if (!SESSION.initialised){
            resetSessionFromCookies();
            this.sessionUserName = SESSION.userName;
            this.sessionGameNum = SESSION.gameNum!='notset' ? SESSION.gameNum : '';
        }

        SESSION.initialised=true;
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
            this.errorState = false; //if previous login error, reset
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_LOBBY;
            this.sessionUserName = SESSION.userName;
        }
        if(evt.detail.name === 'LoggedOut'){
            this.errorState = false; //if previous login error, reset
            deleteCookies();
            this.sessionUserName = SESSION.userName = '';
            SESSION.userId = '';
            SESSION.authenticated = false;
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_LOBBY;
            this.template.querySelector('ui-lobby').rerenderLobby();
        }
        if(evt.detail.name === 'NewGame'){
            this.errorState = false; //if previous error, reset
            this.gamePlayerCount = 0; //reset if AnotherGame
            SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_NEWGAME;
            this.sessionGameNum = SESSION.gameNum;
            this.sessionUserName = SESSION.userName;
            this.template.querySelector('ui-header').updateHost('Host');
        }
        if(evt.detail.name === 'JoinedGame'){
            this.errorState = false; //if previous error, reset
            socket.emit('joinedgame', SESSION);
            //if host, already set by newgame
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
        if(evt.detail.name === 'AnswerSubmitted'){
            //for vote count updates
            socket.emit('answersubmitted', SESSION);
        }
        if(evt.detail.name === 'AnswerRevealed'){
            socket.emit('answerrevealed', SESSION);
            //socket.emit('answerrevealed', SESSION, evt.detail.correctAnswer);
        }
        if(evt.detail.name === 'NextVote'){
            socket.emit('nextvote', SESSION);
        }
        if(evt.detail.name === 'ShowResults'){
            socket.emit('showresults', SESSION);
        }
        if(evt.detail.name === 'GameEnded'){
            socket.emit('endgame', SESSION);
        }
        if(evt.detail.name === 'AnotherGame'){
            //joins all existing players to another game
            //passes old gameNum and newGameNum
            socket.emit('anothergame', [SESSION, evt.detail]);
        }

        //refresh safe 
        setCookies();
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
    get isGameResultsState() {
        return this.sessionState === SESSIONSTATES.IN_GAME_RESULTS;
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
                //set session.players array
                PLAYERS.push(data);
                log('client.app.voting-started', PLAYERS[0].length);
                SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_VOTING;
                break;
            case 'answer-submitted': 
                this.template.querySelector('ui-voting').updateVotedCount();
                break;
            case 'answer-revealed': 
                //reveal answer
                log('client.app.answer-revealed', event);
                this.template.querySelector('ui-voting').revealAnswerUI();
                this.gamePlayerScore = SESSION.gameScore;
                break;
            case 'next-vote': 
                //next vote/player
                log('client.app.next-vote', event);
                this.template.querySelector('ui-voting').loadNextPlayer();
                break;
            case 'show-results': 
                //show-results
                log('client.app.show-results', event);
                SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_GAME_RESULTS;
                break;
            case 'end-game': 
                //end-game
                log('client.app.end-game', event);
                SESSION.sessionState = this.sessionState = SESSIONSTATES.IN_LOBBY;
                SESSION.gameId = SESSION.gameNum = SESSION.gameState = SESSION.gameTopic = 'notset';
                SESSION.playerId = 'notset';
                SESSION.host = false;
                this.template.querySelector('ui-header').updateHost('Player');
                this.sessionGameNum = '';
                this.gameTopic = '';
                PLAYERS.length = 0; //clear players array
                this.gamePlayerCount = 0;
                this.gamePlayerScore = 0;
                this.gamePlayersSubmitted = 0;
                break;
            case 'another-game': 
                //another-game
                log('client.app.another-game', data);
                SESSION.gameTopic = 'notset';
                this.gameTopic = '';
                this.gamePlayerScore = SESSION.gameScore = 0;
                this.gamePlayersSubmitted = 0;
                PLAYERS.length = 0; //clear players array
                if(!SESSION.host){
                    this.template.querySelector('ui-results').joinAnotherGame(data, event);
                }
                break;
        }
        //refresh safe 
        setCookies();
    }

    //error handling
    handleErrorMessage(evt) {
        log('client.app.handleErrorMessage: ' + evt.detail.errormsg);
        this.errorMessage = evt.detail.errormsg;
        this.errorState = true;
    }

}