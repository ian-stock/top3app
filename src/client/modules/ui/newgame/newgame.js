import { LightningElement, api } from 'lwc';

export default class NewGame extends LightningElement {
    endGame(e){
        this.dispatchEvent(new CustomEvent('phase_change', {
            detail: {
                name: 'GameEnded'
            }
        }));
    }
}
