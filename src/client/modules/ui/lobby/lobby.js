import { LightningElement, api } from 'lwc';

export default class Lobby extends LightningElement {
    startNewGame(e){
        this.dispatchEvent(new CustomEvent('phase_change', {
            detail: {
                name: 'NewGameStarted'
            }
        }));
    }
}
