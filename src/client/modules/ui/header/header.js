import { LightningElement, api } from 'lwc';
import { SESSION } from '../../services/session';
import {log} from '../../utils/log';

export default class Header extends LightningElement {
    @api sessiongamenum;
    @api sessionusername;
    hostOrPlayer = 'Player';
    menuPanel;
    anchors;
    aboutModal;

    @api 
    updateHost(playerType) {
        this.hostOrPlayer = playerType;
    }
    
    connectedCallback(){
        this.aboutModal = this.template.querySelector('[data-id="aboutModal"]');
    }

    openMenu(){
        this.menuPanel = this.template.querySelector('[data-id="menuPanel"]');
        log('client.header.openMenu: ', this.menuPanel);
        if(this.menuPanel.style.height == 0 || this.menuPanel.style.height == '0px'){
            let menuHeight = SESSION.sessionState == "InLobby" && !SESSION.authenticated ? '55px' : '90px';
            this.template.querySelector('[data-id="menuPanel"]').style.height = menuHeight;
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

    menuAction(evt){
        //leaveGame, endGame, logOut, popAbout
        let clicked = evt.target.dataset.id;
        let menuEvent = clicked.slice(0, -6)
        log('client.header.menuAction: ', menuEvent);

        if (menuEvent == 'endGame'|| menuEvent == 'leaveGame'){
            this.dispatchEvent(new CustomEvent('state_change', {
                detail: {
                    name: 'GameEnded'
                }
            }));
            this.closeMenu();
        } else if (menuEvent == 'logOut'){
            this.dispatchEvent(new CustomEvent('state_change', {
                detail: {
                    name: 'LoggedOut'
                }
            }));
            this.closeMenu();
        } else if (menuEvent == 'popAbout'){
            console.log('popAbout')
            this.template.querySelector('[data-id="aboutModal"]').style.display = "block";
            this.template.querySelectorAll('.aboutA').forEach(element => {
                element.style.display = "contents";
            });

        }

    }

    closeModal(){
        this.template.querySelector('[data-id="aboutModal"]').style.display = "none";
        this.closeMenu();
    }

    // UI expressions for template rendering and button controls
    get isHost() {
        if(this.hostOrPlayer == 'Host' && SESSION.sessionState != "InLobby"){
            return true;
        } else {
            return false;
        }
    }
    get isPlayer() {
        if(this.hostOrPlayer == 'Player' && SESSION.sessionState != "InLobby"){
            return true;
        } else {
            return false;
        }
    }
    get isLoggedInLobby() {
        if(SESSION.sessionState == "InLobby" && SESSION.authenticated){
            return true;
        } else {
            return false;
        }
    }
}
