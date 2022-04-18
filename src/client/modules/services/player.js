export function playerJoinGame(userid, gamenum, gameid36, host) {
    const playerInfo = { userid, gamenum, gameid36, host };
    console.log('client.player.playerJoinGame');
    return fetch('/api/game/join', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerInfo)
    })
    .then(response=>response.json())
    .then(data=>{ 
        return data;
    })

}   

export function submitPlayerTop3(playerid, top1, top2, top3) {
    const top3Info = { top1, top2, top3 };
    return fetch(`/api/player/update/${playerid}`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(top3Info)
    })
    .then(response=>response.json())
    .then(data=>{ 
        console.log('player.updateTop3 response');
        console.log(JSON.stringify(data));
        return data;
    })

}   
