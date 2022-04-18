export function createNewGame(userid) {
    const gameInfo = { userid };
    return fetch('/api/game', {
        method: 'POST',
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
    console.log('client.game.getGame');
    // need to get game by 6 digit id first...
    return fetch(`/api/game/${gamenum}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response=>response.json())
    .then(data=>{ 
        return data.rows[0];
    })
}
