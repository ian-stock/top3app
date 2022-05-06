export const SESSIONSTATES = Object.freeze({
    IN_LOBBY: 'InLobby',
    IN_LOGIN: 'InLogin',
    IN_NEWGAME: 'InNewGame',
    IN_JOIN_GAME: 'InJoinGame',
    IN_WAITING_GAME_START: 'InWaitingGameStart',
    IN_ENTER_TOP3: 'InEnterTop3',
    SUBMIT_VOTE: 'SubmitVote',
    REVEAL_ANSWER: 'RevealAnswer',
    GAME_RESULTS: 'GameResults'
});

//session is single-user, game is multi-user
const initUserId = 'anonymous-' + Math.floor(Math.random()*10000);

export const SESSION = {
    "userId": "notset",
    "userName": initUserId,
    "sessionState": SESSIONSTATES.IN_LOBBY, 
    "gameId": "notset",
    "gameNum": "notset",
    "gameState": "notset", 
    "gameTopic": "notset", 
    "playerId": "notset",
    "host": false,
    "authenticated": false,
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