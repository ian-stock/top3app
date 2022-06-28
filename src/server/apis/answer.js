const router = require("express").Router();
module.exports = router;
const db = require('../utils/database.js')
const { v4: uuidv4 } = require('uuid');
const log = require('../utils/log');

//crud - post, get, patch, delete, query
//schema - id(36), created (timestamp), userid(30), gameid, player(), vote(36), true/false, score
//userid, gameid, playerid, selectedPlayername

// create/submit answer
router.post('/', async (req, res) => {
    const uuid = uuidv4();
    const userId = req.body.userid;
    const gameId = req.body.gameid;
    const playerId = req.body.playerid;
    const answer = req.body.selectedPlayername;
    const correct = false;
    const score =0;
    const insertSQL = 
        'INSERT INTO public.answer(id, createdby, gameid, playerid, answer, correct, score) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const insertValues = [uuid, userId, gameId, playerId, answer, correct, score];

    //db call    
    db.dbInsert(insertSQL, insertValues)
        .then(insertRes => res.send(insertRes))
        .catch(e => console.error('answer.submit dbInsert', e.stack))
        .then(function(){
            console.log('answer.submit: ' + answer);
        })        
})