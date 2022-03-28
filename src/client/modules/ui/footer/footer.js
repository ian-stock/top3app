import { LightningElement, api } from 'lwc';
import { SESSION } from '../../services/session';

export default class Footer extends LightningElement {
    @api playercount;
    @api playerscore;

    printSession(e){
        // console.log(JSON.stringify(SESSION));
        console.log(SESSION);    
    }

}