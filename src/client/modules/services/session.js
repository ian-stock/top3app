export const SESSIONSTATES = Object.freeze({
    IN_LOBBY: 'InLobby',
    IN_LOGIN: 'InLogin',
    IN_NEWGAME: 'InNewGame',
    IN_JOIN_GAME: 'InJoinGame',
    IN_WAITING_GAME_START: 'InWaitingGameStart',
    ENTER_TOP3: 'EnterTop3',
    SUBMIT_VOTE: 'SubmitVote',
    REVEAL_ANSWER: 'RevealAnswer',
    GAME_RESULTS: 'GameResults'
});

//session is single-user, game is multi-user
const initUserId = 'anonymous-' + Math.floor(Math.random()*10000);

export const SESSION = {
    "userId": initUserId,
    "sessionState": SESSIONSTATES.IN_LOBBY, 
    "gameId": "notset",
    "gameState": "notset", 
    "host": false,
    "authenticated": false,
    "question1": "notset",
    "question2": "notset",
    "question3": "notset",
    "gameScore": 0
}

export function createSession(){
    return{
        SESSION
    }
}

export function getCurrentSession() {
    //return this.sessionState;
}

export function setSessionState(stateToSet) {

    // return this.STATES.IN_LOBBY;
}