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

export function getGame(gamenum) {
    
    // need to get game by 6 digit id first...
    return fetch(`/api/game/${gamenum}`, {
        method: 'get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response=>response.json())
    .then(data=>{ 
        console.log('game.getgamenum');
        console.log(JSON.stringify(data.rows));
        return data.rows[0];
    })
}
