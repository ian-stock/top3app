export function playerJoinGame(userid, gamenum, gameid36, host) {
    
    const playerInfo = { userid, gamenum, gameid36, host };
    return fetch('/api/game/join', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerInfo)
    })
    .then(response=>response.json())
    .then(data=>{ 
        console.log('game.insertPlayer');
        console.log(JSON.stringify(data.rows));
        return data;
    })

}   
