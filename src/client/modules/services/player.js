import {log} from '../utils/log';

export function getPlayerList(gamenum) {
    log('client.player.getPlayerList', gamenum);
    return fetch(`/api/player/list/${gamenum}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response=>response.json())
    .then(data=>{ 
        log('client.player.getPlayerList.response', JSON.stringify(data.rows));
        return data.rows;
    })
}


export function playerJoinGame(userid, gamenum, gameid36, host) {
    const playerInfo = { userid, gamenum, gameid36, host };
    log('client.player.playerJoinGame', JSON.stringify(playerInfo));
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
        log('client.player.playerJoinGame.response', JSON.stringify(data));
        return data;
    })

}   

export function submitPlayerTop3(playerid, top1, top2, top3) {
    const top3Info = { top1, top2, top3 };
    //post, as there's a bug with PATCH and upper/lower case
    return fetch(`/api/player/update/${playerid}`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(top3Info)
    })
    .then(function(response) {
        log('client.player.submitPlayerTop3.response', JSON.stringify(response));
        return response.json();
    })

}   

export function updatePlayerScore(playerid, gamescore) {
    const scoreInfo = { gamescore };
    //post, as there's a bug with PATCH and upper/lower case
    return fetch(`/api/player/updatescore/${playerid}`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(scoreInfo)
    })
    .then(function(response) {
        log('client.player.updatePlayerScore.response', JSON.stringify(response));
        return response.json();
    })

}   
