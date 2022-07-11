import { LightningElement, api } from 'lwc';

export default class Header extends LightningElement {
    @api sessiongamenum;
    @api sessionusername;
    hostOrPlayer = 'Player';

    @api 
    updateHost(playerType) {
        this.hostOrPlayer = playerType;
    }


}
