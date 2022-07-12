import { LightningElement, api } from 'lwc';

export default class Header extends LightningElement {
    @api sessiongamenum;
    @api sessionusername;
    hostOrPlayer = 'Player';
    menuPanel;
    anchors;

    @api 
    updateHost(playerType) {
        this.hostOrPlayer = playerType;
    }

    openMenu(){
        this.menuPanel = this.template.querySelector('[data-id="menuPanel"]');
        if(this.menuPanel.style.height == 0 || this.menuPanel.style.height == '0px'){
            this.template.querySelector('[data-id="menuPanel"]').style.height = '170px';
            this.anchors = this.template.querySelectorAll('a');
            this.anchors.forEach(a => {
                a.style.display = 'block';
            });
        } else {
            this.closeMenu();
        }
    }
    closeMenu(){
        this.template.querySelector('[data-id="menuPanel"]').style.height = '0';
        this.anchors = this.template.querySelectorAll('a');
        this.anchors.forEach(a => {
            a.style.display = 'none';
        });
    }
}
