import { LightningElement, api } from 'lwc';
import { SESSION, PLAYERS } from '../../services/session';
import { getPlayerList } from '../../services/player';
import { newGameLogic, joinGameLogic } from '../../services/gamelogic';
import {log} from '../../utils/log';

import { createNewGame, getGame } from '../../services/game';
import { playerJoinGame } from '../../services/player';

export default class Results extends LightningElement {
    
    playerScoresList = [];
    hostHint = '(Another Game keeps the same players)';
    playerHint = '(Or wait for host to start another game)';
    displayedHint = SESSION.host ? this.hostHint : this.playerHint;
    endButtonText = '';

    connectedCallback(){
        log('client.results.connectedCallback', PLAYERS[0].length);
        this.endButtonText = SESSION.host ? 'End Game' : 'Leave Game';

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
        //above function then issues AnotherGame event to join all others
    }

    @api joinAnotherGame(gameNum, event){
        joinGameLogic.call(this, gameNum, event);
    }

    // UI expressions for template rendering and button controls
    get isHost() {
        return SESSION.host;
    }

}
