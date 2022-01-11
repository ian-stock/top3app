import { LightningElement, track } from 'lwc';
import { PHASES, getCurrentSession, createSession } from 'services/session';

export default class App extends LightningElement {
    @track session;

    connectedCallback(){
        this.addEventListener('phase_change', this.handlePhaseChange);
        this.session = createSession();
      }
    

    handlePhaseChange(evt) {
        if(evt.detail.name === 'NewGameStarted'){
            this.session.phase = PHASES.NEW_GAME;
        }
        if(evt.detail.name === 'GameEnded'){
            this.session.phase = PHASES.IN_LOBBY;
        }
    }

    // UI expressions to dynamically render templates (return true or false)

    get isInLobbyPhase() {
        return this.session.phase === PHASES.IN_LOBBY;
    }

    get isNewGamePhase() {
        return this.session.phase === PHASES.NEW_GAME;
    }

}