//html card constants

var cardHTML1 = '<div class="answercard">\
                    <div class="ac-answers">';
var cardHTML2 =         '<table class="ac-table" id="actable"><tr><td>Top 1:</td><td></td></tr>\
                        <tr><td>Top 2:</td><td></td></tr><tr><td>Top 3:</td><td></td></tr></table>'
var cardHTML3 =    '</div>\
                    <div class="ac-name" id="acname">';
var cardHTML4 =    '</div><div class="ac-btns">\
                        <button type="button" class="ac-showbtn" id="acshowbtn" onClick = "showAnswers(this.id)">Show Answers</button>\
                        <button type="button" class="ac-revealbtn" id="acrevealbtn" onClick = "revealUser(this.id)">Reveal Name</button>\
                    </div>\
                </div>';

{/* what should the answer cards look like...

    <div class="answercard">
    <div class="ac-answers">"698189"
        <table class="ac-table" id="actable-nnnnn">
                <tr><td>Top 1:</td><td>1</td></tr>
                <tr><td>Top 2:</td><td>2</td></tr>
                <tr><td>Top 3:</td><td>3</td></tr>
        </table>
    </div>
    <div class="ac-name" id="acname-nnnnn">Ian</div>
    <div class="ac-btns">
        <button type="button" class="ac-showbtn" id="acshowbtn-nnnnn" onclick="showAnswers()">Show Answers</button>
        <button type="button" class="ac-revealbtn" id="acsrevealbtn-nnnnn" onclick="revealUser()">Reveal Name</button>
    </div>
</div> 
*/}



var flipcardHTML1 = '<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"></div>\
<div class="flip-card-back"><div class="flip-card-back-top3">';
var flipcardHTML2 = '</div><div class="flip-card-back-username">';
var flipcardHTML3 = '</div></div></div><button type="button" class=cardBtn id="showAnswerBtn" onClick="showAnswer()">\
Show</button><button type="button" class=cardBtn id="revealAnswerBtn" onClick="revealAnswer()">Reveal</button></div>'