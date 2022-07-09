import { LightningElement, api } from 'lwc';
import { submitPlayerTop3 } from '../../services/player';
import { SESSION } from '../../services/session';
import {log} from '../../utils/log';

export default class EnterTop3 extends LightningElement {

    @api gametopic;

    submitTop3(){
        const top1 = this.template.querySelector('[data-id="oneInput"]').value;
        const top2 = this.template.querySelector('[data-id="twoInput"]').value;
        const top3 = this.template.querySelector('[data-id="threeInput"]').value;
        submitPlayerTop3(SESSION.playerId,  top1, top2, top3)
        .then((response) => {
            log('client.enterTop3.submitTop3.response', JSON.stringify(response));
            // lwc event - handled by app.js 
            this.dispatchEvent(new CustomEvent('state_change', {
                detail: {
                    name: 'Top3Submitted',
                }
            }));    
        })
        .catch(e => console.error('client.enterTop3.submitPlayerTop3', e.stack))        
    }
}
