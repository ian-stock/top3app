import { SESSION, } from '../services/session';

//use cookies for long term (e.g. login)
//use sessionStorage for in game

export function setCookies(){

    document.cookie = "userName" +"="+ SESSION.userName;
    document.cookie = "userId" +"="+ SESSION.userId;
    document.cookie = "authenticated" +"="+ SESSION.authenticated;

    sessionStorage.setItem('host', SESSION.host);
    sessionStorage.setItem('sessionState', SESSION.sessionState);
    sessionStorage.setItem('gameId', SESSION.gameId);
    sessionStorage.setItem('gameNum', SESSION.gameNum);
    sessionStorage.setItem('gameTopic', SESSION.gameTopic);
    sessionStorage.setItem('playerId', SESSION.playerId);
    sessionStorage.setItem('gameScore', SESSION.gameScore);
}

function getCookies(){

    let allcookies = document.cookie;
    let jsonCookies = {};
    allcookies.split(/\s*;\s*/).forEach(function(pair) {
        pair = pair.split(/\s*=\s*/);
        jsonCookies[pair[0]] = pair.splice(1).join('=');
    });
    
    // add all sessionStorage items to jsonCookies
    Object.keys(sessionStorage).forEach((key) => {
        // bug with session state and refresh needs fixing...
        // jsonCookies[key] = sessionStorage.getItem(key);
    });

    return jsonCookies;
}

export function resetSessionFromCookies(){

    let jsonCookies = getCookies();
    Object.keys(jsonCookies).forEach((key) => {
        SESSION[key] = jsonCookies[key];
    });

}

export function deleteCookies(){
    document.cookie = "userName" + "=; Max-Age=0";
    document.cookie = "userId" + "=; Max-Age=0";
    document.cookie = "authenticated" + "=; Max-Age=0";
}