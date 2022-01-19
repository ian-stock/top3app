export const PHASES = Object.freeze({
    IN_LOBBY: 'InLobby',
    NEW_GAME: 'NewGame',
    JOIN_GAME: 'JoinGame',
    ENTER_TOP3: 'EnterTop3',
    SUBMIT_VOTE: 'SubmitVote',
    REVEAL_ANSWER: 'RevealAnswer',
    GAME_RESULTS: 'GameResults'
});

export function createSession(){
    const phase = PHASES.IN_LOBBY; //default phase
    return{
        phase
    }
}


export function createNewGame(userid) {
    const gameInfo = { userid };
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
    //return this.sessionPhase;
}

export function setSessionPhase(phaseToSet) {

    // return this.PHASES.IN_LOBBY;
}