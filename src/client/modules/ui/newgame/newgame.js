import { LightningElement, api } from 'lwc';

export default class NewGame extends LightningElement {
    
    @api playerlist; //for ui update

    startGame(e){
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'GameStarted'
            }
        }));
    }

    endGame(e){
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'GameEnded'
            }
        }));
    }
}
