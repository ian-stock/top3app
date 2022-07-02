import { LightningElement, api } from 'lwc';
import { SESSION, PLAYERS } from '../../services/session';
import { submitAnswer } from '../../services/answer';
import {log} from '../../utils/log';

export default class Voting extends LightningElement {

    playerArray;                //array that drives player top3 cards to display
    playerIndex = 0;            //keep the array index to iterate through
    playerSelectList;           //drives combobox for selecting who to vote for

    currentlyViewedPlayer;      //current player being voted on
    top1;
    top2;
    top3;
    top3PlayerUsername;         //for testing only, remove
    top3PlayerId;               //for submitting to server along with vote, to check true/false
    
    top3SelectedUsername;       //voted for player, submitted with top3PlayerId for server to check true/false

    correctAnswer;
    answeredCorrectly;
    answerMessage;
    revealed = false;

    voteCount = 0;

    @api revealAnswerUI() {
        this.revealed = true;
    }

    @api loadNextPlayer(){
        this.revealed = false;
        this.playerIndex++;
        this.loadPlayer()
        this.template.querySelector('[data-id="playerSelect"]').value = '-- choose one --';
    }

    loadPlayer(){
        this.currentlyViewedPlayer = this.playerArray[this.playerIndex];
        this.top1 = this.currentlyViewedPlayer.topone;
        this.top2 = this.currentlyViewedPlayer.toptwo;
        this.top3 = this.currentlyViewedPlayer.topthree;
        this.top3PlayerUsername = this.currentlyViewedPlayer.username; //for testing only, remove
        this.top3PlayerId = this.currentlyViewedPlayer.id;
    }

    connectedCallback(){
        log('client.voting.connectedCallback', PLAYERS[0]);

        this.playerArray = PLAYERS[0];
        this.playerSelectList = PLAYERS[0].sort();

        this.loadPlayer();

    }

    handleVoteSelectChange(evt){
        this.top3SelectedUsername = evt.target.value;
        log('client.voting.select.change-handler', this.top3SelectedUsername);
    }

    vote(evt){
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
            this.correctAnswer = response.correctAnswer
            if (response.correct){
                this.answeredCorrectly = true;
                this.answerMessage = "Yeah, you were right!";
            } else
            {
                this.answeredCorrectly = false;
                this.answerMessage = "Sorry, you didn't get that one";
            }
            

            // lwc event - handled by app.js 
            this.dispatchEvent(new CustomEvent('state_change', {
                detail: {
                    name: 'AnswerSubmitted',
                }
            }));    
        })
        .catch(e => console.error('client.voting.submitAnswer', e.stack))        
    }
    
    hostRevealAnswer(e){
        //do automatically eventually
        // lwc event - handled by app.js 
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'AnswerRevealed',
            }
        }));

    }

    hostNextVote(evt){
        //load next player
        //probably should control this server side eventually
        let voteEventName = 'NextVote';
        log('client.voting.hostNextVote', `${this.playerArray.length} | ${this.playerIndex}`);
        if (this.playerArray.length-2 == this.playerIndex) {
            log('client.voting.hostNextVote', 'length-2');
            this.template.querySelector('[data-id="nextButton"]').value = 'Last Vote';
        }
        if (this.playerArray.length-1 == this.playerIndex) {
            log('client.voting.hostNextVote', 'length-1');
            this.template.querySelector('[data-id="nextButton"]').value = 'Show Results';
        }
        if (this.playerArray.length-1 == this.playerIndex) {
            log('client.voting.hostNextVote.lastPlayer', 'lastplayer');
            voteEventName = 'ShowResults';
        }

        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: voteEventName,
            }
        }));
    }

    // UI expressions to dynamically render templates (return true or false)
    get isHost() {
        return SESSION.host;
    }
    get isRevealed() {
        return this.revealed;
    }
}
