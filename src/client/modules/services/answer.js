import {log} from '../utils/log';


export function submitAnswer(userid, gameid, playerid, selectedPlayername) {
    const answerInfo = { userid, gameid, playerid, selectedPlayername };
    return fetch(`/api/answer/`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answerInfo)
    })
    .then(function(response) {
        log('client.answers.submitAnswer.response', JSON.stringify(response));
        return response.json();
    })

}   