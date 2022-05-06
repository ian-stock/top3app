import { LightningElement } from 'lwc';
import { submitPlayerTop3 } from '../../services/player';
import { SESSION } from '../../services/session';
import { io } from "../../../../../node_modules/socket.io-client/dist/socket.io.js"; // whole path for client side
import {log} from '../../utils/log';

const socket = io();

export default class EnterTop3 extends LightningElement {

    submitTop3(){
        const top1 = this.template.querySelector('[data-id="oneInput"]').value;
        const top2 = this.template.querySelector('[data-id="twoInput"]').value;
        const top3 = this.template.querySelector('[data-id="threeInput"]').value;
        submitPlayerTop3(SESSION.playerId,  top1, top2, top3)
        .then((response) => {
            log('client.enterTop3.submitTop3.response', JSON.stringify(response));
            socket.emit('submittedtop3', SESSION);
        })
        .catch(e => console.error('client.enterTop3.submitPlayerTop3', e.stack))
        
    }
    
    // UI expressions to dynamically render templates (return true or false)
    get isHost() {
        return SESSION.host;
    }

}
