export const STATES = Object.freeze({
    IN_LOBBY: 'InLobby',
    IN_LOGIN: 'InLogin',
    NEW_GAME: 'NewGame',
    JOIN_GAME: 'JoinGame',
    ENTER_TOP3: 'EnterTop3',
    SUBMIT_VOTE: 'SubmitVote',
    REVEAL_ANSWER: 'RevealAnswer',
    GAME_RESULTS: 'GameResults'
});

export function createSession(){
    const state = STATES.IN_LOBBY; //default state
    return{
        state
    }
}


export function createNewGame(userid, username) {
    const gameInfo = { userid, username };
    return fetch('/api/game', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameInfo)
    })
        .then(function(response) {
            return response.json();
        })
}   

export function getCurrentSession() {
    //return this.sessionState;
}

export function setSessionState(stateToSet) {

    // return this.STATES.IN_LOBBY;
}