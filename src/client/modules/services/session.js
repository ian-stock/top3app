export const SESSIONSTATES = Object.freeze({
    IN_LOBBY: 'InLobby',
    IN_LOGIN: 'InLogin',
    IN_NEWGAME: 'InNewGame',
    IN_JOIN_GAME: 'InJoinGame',
    IN_ENTER_TOP3: 'InEnterTop3',
    IN_WAITING_VOTE_START: 'InWaitingVoteStart',
    IN_VOTING: 'InVoting',
    IN_GAME_RESULTS: 'InGameResults'
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

export const PLAYERS = [];

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