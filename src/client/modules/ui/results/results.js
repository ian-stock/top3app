import { LightningElement, api } from 'lwc';
import { SESSION, PLAYERS } from '../../services/session';
import { getPlayerList } from '../../services/player';
import { newGameLogic, joinGameLogic } from '../../services/gamelogic';
import {log} from '../../utils/log';

import { createNewGame, getGame } from '../../services/game';
import { playerJoinGame } from '../../services/player';

export default class Results extends LightningElement {
    
    playerScoresList = [];

    connectedCallback(){
        log('client.results.connectedCallback', PLAYERS[0]);

        getPlayerList(SESSION.gameNum)
        .then((response) => {
            log('client.results.getPlayerList.response', JSON.stringify(response));
            this.playerScoresList = response.sort((a,b) => b.gamescore - a.gamescore); // b - a for reverse sort
        })
        .catch(e => console.error('client.results.getPlayerList', e.stack))        
    }

    endGame(){
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'GameEnded',
            }
        }));
    }

    startAnotherGame(){
        let existingGameNum = SESSION.gameNum;
        newGameLogic.call(this, 'fromResults', existingGameNum);
        // this.newGameLogicInside('fromResults', existingGameNum);
        //above function then issues AnotherGame event
    }

    @api joinAnotherGame(gameNum, event){
        joinGameLogic.call(this, gameNum, event);
    }

}
