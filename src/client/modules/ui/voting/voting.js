import { LightningElement, api } from 'lwc';
import { SESSION, PLAYERS } from '../../services/session';
import {log} from '../../utils/log';

export default class Voting extends LightningElement {

    playerViewList;
    playerSelectList;
    currentlyViewedPlayer;
    top1;
    top2;
    top3;
    top3PlayerUsername;
    top3PlayerId;
    top3SelectedId;
    top3SelectedUsername;

    connectedCallback(){
        log('client.voting.connectedCallback', PLAYERS[0]);
        this.playerViewList = PLAYERS[0];
        this.playerSelectList = PLAYERS[0].sort();
        this.currentlyViewedPlayer = this.playerViewList[0];

        this.top1 = this.currentlyViewedPlayer.topone;
        this.top2 = this.currentlyViewedPlayer.toptwo;
        this.top3 = this.currentlyViewedPlayer.topthree;
        this.top3PlayerUsername = this.currentlyViewedPlayer.username;
        this.top3PlayerId = this.currentlyViewedPlayer.id;

    }


    vote(e){
        //submit vote, check server side, create/save answer & score, return result & score
        //need client playerid, top3 question playerid (hidden) and selected username (or id) option
        
        //may need to do via an onchange event - onchange={onfieldchange}, 
        this.top3SelectedId = this.template.querySelector('data-id="playerSelect"').key;
        this.top3SelectedUsername = this.template.querySelector('data-id="playerSelect"').value;
        
        
        log('client.voting.vote.top3SelectedId', this.top3SelectedId);
        log('client.voting.vote.top3SelectedUsername', this.top3SelectedUsername);
        log('client.voting.vote.SESSION.playerId', SESSION.playerId);
        log('client.voting.vote.top3PlayerId', this.top3PlayerId);
    
    }

    reveal(e){
        //do automatically

    }

    nextVote(e){
        //load next player
        //how to know when got to last player, should it be client or server side?
        
    }

    // UI expressions to dynamically render templates (return true or false)
    get isHost() {
        return SESSION.host;
    }
    
}
