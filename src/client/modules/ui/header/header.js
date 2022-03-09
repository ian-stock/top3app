import { LightningElement, api } from 'lwc';

export default class Header extends LightningElement {
    @api sessiongameid;
    @api sessionuserid;
    hostOrPlayer = 'Player';

    @api 
    updateHost() {
        this.hostOrPlayer = 'Host';
    }


}
