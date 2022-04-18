import { LightningElement } from 'lwc';
import { submitPlayerTop3 } from '../../services/player';
import { SESSION } from '../../services/session';

export default class EnterTop3 extends LightningElement {

    submitTop3(){
        const top1 = this.template.querySelector('[data-id="oneInput"]').value;
        const top2 = this.template.querySelector('[data-id="twoInput"]').value;
        const top3 = this.template.querySelector('[data-id="threeInput"]').value;
        submitPlayerTop3(SESSION.playerId,  top1, top2, top3)
        .then((response) => {
            console.log('enterTop3.submitTop3.response');
            console.log(JSON.stringify(response));
        })
        .catch(e => console.error('enterTop3 submitPlayerTop3', e.stack))
        
    }
    
}
