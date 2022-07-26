const router = require("express").Router();
module.exports = router;
const db = require('../utils/database.js')
const { v4: uuidv4 } = require('uuid');
const log = require('../utils/log');

const GAMESTATES = Object.freeze({
    NEW_GAME: 'NewGame',
    ENTER_TOP3: 'EnterTop3',
    ANSWERING: 'Answering',
    GAME_OVER: 'GameOver'
});

//crud - post, get, patch, delete, query
//game schema - id(36), created (timestamp), createdby(36), gamenum(10), hostid(36), hostname(30), gamestate(20)

router.get('/:gamenum', async (req, res) => {
    const params = [req.params.gamenum]
    const result = await db.dbQuery('SELECT * FROM game WHERE gamenum = $1', params)
    //add handling for no rows being returned
    res.send(result)
})

// create game
router.post('/', async (req, res) => {
    const uuid = uuidv4();
    const userId = req.body.userid;
    // const gameNum = Math.floor(10000 + Math.random() * 90000).toString(); //random 5 digit number
    const gameNum = Math.floor(1000 + Math.random() * 9000).toString(); //random 4 digit number
    const gameState = GAMESTATES.NEW_GAME; 
    const insertSQL = 
        'INSERT INTO game(id, createdby, gamenum, hostid, gamestate) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const insertValues = [uuid, userId, gameNum, userId, gameState];
    //const io = req.app.get('io');

    //db call    
    db.dbInsert(insertSQL, insertValues)
        .then(insertRes => res.send(insertRes))
        .catch(e => console.error('game dbInsert', e.stack))
        //web socket call to update all clients
        .then(function(){
            // io.emit('newgame', gameNum);
            log('server.game.newgame', gameNum);
        })        
})

const gameUpdateStatement = 
        `UPDATE game SET topic=$2 WHERE gamenum = $1  RETURNING *`;

//update game / set topic
router.post('/update/:gamenum', async (req, res) => {
    const updateValues = [req.params.gamenum, req.body.topic];
    //db call    
    db.dbUpdate(gameUpdateStatement, updateValues)
        .then(updateRes => res.send(updateRes))
        .catch(e => console.error('server.game.updateTopic dbUpdate', e.stack))
        .then(function(){
            log('server.game.updateTopic: ', req.params.gamenum);
        })        
})


//player schema - id(36), created (timestamp), createdby(36), userid(36) gameid(36), host(boolean)

// join game - create a PLAYER record - SHOULD MOVE TO PLAYER.JS
router.post('/join', async (req, res) => {
    const uuid = uuidv4();
    const userId = req.body.userid;
    const gameNum = req.body.gamenum; //5 digit
    const gameId36 = req.body.gameid36; //36 digit
    const host = req.body.host; //boolean
    const insertSQL = 
        'INSERT INTO player(id, createdby, userid, gameid, host) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const insertValues = [uuid, userId, userId, gameId36, host];
    //db call    
    db.dbInsert(insertSQL, insertValues)
        .then(insertRes => res.send(insertRes))
        .catch(e => console.error('game dbInsert', e.stack))
        //web socket call to update all clients
        .then(function(){
            log('server.game.joingame', gameNum);
        })        
})


// leave game - delete a PLAYER record