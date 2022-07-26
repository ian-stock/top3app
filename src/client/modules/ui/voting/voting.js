import { LightningElement, api } from 'lwc';
import { SESSION, PLAYERS } from '../../services/session';
import { submitAnswer } from '../../services/answer';
import { updatePlayerScore } from '../../services/player';
import {log} from '../../utils/log';

export default class Voting extends LightningElement {

    playerArray;                //array that drives player top3 cards to display
    playerIndex = 0;            //keep the array index to iterate through
    playerSelectList;           //drives combobox for selecting who to vote for

    currentlyViewedPlayer;      //current player being voted on
    top1;
    top2;
    top3;
    top3PlayerId;               //for submitting to server along with vote, to check true/false
    
    top3SelectedUsername;       //voted for player, submitted with top3PlayerId for server to check true/false

    correctAnswer;
    answeredCorrectly;
    answerMessage;
    completeAnswerMessage;
    revealed = false;

    voteCount = 0;

    voteButtonDisabled = false;
    revealButtonDisabled = true;
    nextButtonDisabled = true;
    didTheyVote = false;
    nextButtonText = 'Next';

    @api updateVotedCount(e){
        this.voteCount++;
    }

    @api revealAnswerUI() {
        if(this.didTheyVote){
            this.completeAnswerMessage =  this.answerMessage + '\n It was: ' + this.correctAnswer;
        } else{
            this.completeAnswerMessage =  "Don't forget to vote! \n" + "No points for slow coaches 😀";
        }
        this.voteButtonDisabled = true;
        this.revealed = true;
    }

    @api loadNextPlayer(){
        this.revealed = false;
        this.playerIndex++;
        this.loadPlayer()
        this.template.querySelector('[data-id="playerSelect"]').value = '-- choose one --';
        this.voteCount = 0;
    }

    loadPlayer(){
        this.currentlyViewedPlayer = this.playerArray[this.playerIndex];
        this.top1 = this.currentlyViewedPlayer.topone;
        this.top2 = this.currentlyViewedPlayer.toptwo;
        this.top3 = this.currentlyViewedPlayer.topthree;
        this.top3PlayerId = this.currentlyViewedPlayer.id;
        this.voteButtonDisabled = false;
        this.revealButtonDisabled = true;
        this.nextButtonDisabled = true;
        this.didTheyVote = false;

        //button texts

    }

    connectedCallback(){
        log('client.voting.connectedCallback', PLAYERS[0]);

        this.playerArray = PLAYERS[0];
        this.playerSelectList = PLAYERS[0].sort();
        this.loadPlayer();

    }

    renderedCallback(){
        //set colours of reveal pane if visible
        let rp = this.template.querySelector('[data-id="revealPane"]');
        if (rp != null){
            if(this.answeredCorrectly){
                rp.style.borderColor = 'green';
                rp.style.backgroundColor = 'rgb(225, 255, 225)';
            }else{
                rp.style.borderColor = 'red';
                rp.style.backgroundColor = 'rgb(255, 225, 225)';
            }
        }
    }

    handleVoteSelectChange(evt){
        this.top3SelectedUsername = evt.target.value;
        log('client.voting.select.change-handler', this.top3SelectedUsername);
    }

    vote(evt){
        //submit vote, check server side, create/save answer & score, return result & score
        log('client.voting.vote.user-SESSION.playerId', SESSION.playerId);                  //user        
        log('client.voting.vote.viewed-top3PlayerId', this.top3PlayerId);                   //being viewed
        log('client.voting.vote.voted-top3SelectedUsername', this.top3SelectedUsername);    //vote

        this.voteButtonDisabled = true;
        this.didTheyVote = true;

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
                this.answerMessage = "Sorry, you didn't get that one.";
            }
            SESSION.gameScore = SESSION.gameScore + response.score;
            //need to update player record too
            updatePlayerScore(SESSION.playerId, SESSION.gameScore)
            .then((response) => {
                log('client.voting.updatePlayerScore.response', JSON.stringify(response));
            })
            .catch(e => console.error('client.voting.updatePlayerScore', e.stack))        

            // lwc event - handled by app.js 
            this.dispatchEvent(new CustomEvent('state_change', {
                detail: {
                    name: 'AnswerSubmitted'
                }
            }));
            this.revealButtonDisabled = false;
        })
        .catch(e => console.error('client.voting.submitAnswer', e.stack))        
    }
    
    hostRevealAnswer(e){
        //do automatically eventually
        // lwc event - handled by app.js 
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: 'AnswerRevealed',
                correctAnswer: this.correctAnswer
            }
        }));
        this.nextButtonDisabled = false;
        this.revealButtonDisabled = true;
        if (this.playerArray.length-1 == this.playerIndex) {
            this.nextButtonText = 'Show Results';
        }
    }

    hostNextVote(evt){
        //load next player
        //probably should control this server side eventually
        let voteEventName = 'NextVote';
        log('client.voting.hostNextVote', `${this.playerArray.length} | ${this.playerIndex}`);
        if (this.playerArray.length-1 == this.playerIndex) {
            voteEventName = 'ShowResults';
        }
        // lwc event - handled by app.js 
        this.dispatchEvent(new CustomEvent('state_change', {
            detail: {
                name: voteEventName
            }
        }));
    }

    // UI expressions for template rendering and button controls
    get isHost() {
        return SESSION.host;
    }
    get isRevealed() {
        return this.revealed;
    }
    get disableVoteButton() {
        return this.voteButtonDisabled;
    }
    get disableRevealButton() {
        return this.revealButtonDisabled;
    }
    get disableNextButton() {
        return this.nextButtonDisabled;
    }
}
