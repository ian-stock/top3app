import { LightningElement } from 'lwc';
import { SESSION, PLAYERS } from '../../services/session';
import { getPlayerList } from '../../services/player';
import {log} from '../../utils/log';

export default class NewGame extends LightningElement {
    
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

    endGame(e){
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'GameEnded'
            }
        }));
    }
}
