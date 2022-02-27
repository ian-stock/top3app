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

export function playerJoinGame(userid, gameid, host) {
    
    let gameid36;
    let gameResp;
    // need to get game by 6 digit id first...
    return fetch(`/api/game/${gameid}`, {
        method: 'get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response=>response.json())
    .then(data=>{ 
        gameid36 = data.rows[0].id //id(36)
        gameResp = data.rows[0]
    })

    // insert player record
    .then(() => {
        const playerInfo = { userid, gameid, gameid36, host };
        return fetch('/api/game/join', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerInfo)
        })
        .then(function(response) {
            return gameResp;
        })
    })
}   

export function getCurrentSession() {
    //return this.sessionState;
}

export function setSessionState(stateToSet) {

    // return this.STATES.IN_LOBBY;
}