import { LightningElement, api } from 'lwc';
import { SESSION, PLAYERS } from '../../services/session';
import { submitAnswer } from '../../services/answer';
import {log} from '../../utils/log';

export default class Voting extends LightningElement {

    playerViewList;             //list that drives player top3 cards to display
    playerSelectList;           //drives combobox for selecting who to vote for

    currentlyViewedPlayer;      //current player being voted on
    top1;
    top2;
    top3;
    top3PlayerUsername;         //for testing only, remove
    top3PlayerId;               //for submitting to server along with vote, to check true/false
    
    top3SelectedUsername;       //voted for player, submitted with top3PlayerId for server to check true/false

    connectedCallback(){
        log('client.voting.connectedCallback', PLAYERS[0]);
        this.playerViewList = PLAYERS[0];
        this.playerSelectList = PLAYERS[0].sort();
        this.currentlyViewedPlayer = this.playerViewList[0];

        this.top1 = this.currentlyViewedPlayer.topone;
        this.top2 = this.currentlyViewedPlayer.toptwo;
        this.top3 = this.currentlyViewedPlayer.topthree;
        this.top3PlayerUsername = this.currentlyViewedPlayer.username; //for testing only, remove
        this.top3PlayerId = this.currentlyViewedPlayer.id;

    }


    handleVoteSelectChange(evt){
        this.top3SelectedUsername = evt.target.value;
        log('client.voting.select.change-handler', this.top3SelectedUsername);
    }


    vote(e){
        //submit vote, check server side, create/save answer & score, return result & score
        //need client playerid, top3 question playerid (hidden) and selected username (or id) option
        
        log('client.voting.vote.user-SESSION.playerId', SESSION.playerId);                   //user        
        log('client.voting.vote.viewed-top3PlayerId', this.top3PlayerId);                    //being viewed
        log('client.voting.vote.voted-top3SelectedUsername', this.top3SelectedUsername);     //vote

        //call the answers server API 
        //userid, gameid, playerid, selectedPlayername
        submitAnswer(SESSION.playerId, SESSION.gameId, this.top3PlayerId, this.top3SelectedUsername)
        .then((response) => {
            log('client.voting.submitAnswer.response', JSON.stringify(response));
            // lwc event - handled by app.js 
            this.dispatchEvent(new CustomEvent('state_change', {
                detail: {
                    name: 'AnswerSubmitted',
                }
            }));    
        })
        .catch(e => console.error('client.enterTop3.submitPlayerTop3', e.stack))        

    
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
