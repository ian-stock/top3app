const router = require("express").Router();
module.exports = router;
const db = require('../utils/database.js')
const { v4: uuidv4 } = require('uuid');

const GAMESTATES = Object.freeze({
    NEW_GAME: 'NewGame',
    ENTER_TOP3: 'EnterTop3',
    ANSWERING: 'Answering',
    GAME_OVER: 'GameOver'
});

//crud - post, get, patch, delete, query
//game schema - id(36), created (timestamp), createdby(36), gameid(10), hostid(36), hostname(30), gamestate(20)

router.get('/:gameid', async (req, res) => {
    const params = [req.params.gameid]
    const result = await db.dbQuery('SELECT * FROM game WHERE gameid = $1', params)
    //add handling for no rows being returned
    res.send(result)
})

// create game
router.post('/', async (req, res) => {
    const uuid = uuidv4();
    const userId = req.body.userid;
    const gameId = Math.floor(10000 + Math.random() * 90000).toString(); //random 6 digit number
    const gameState = GAMESTATES.NEW_GAME; 
    const insertSQL = 
        'INSERT INTO game(id, createdby, gameid, hostid, gamestate) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const insertValues = [uuid, userId, gameId, userId, gameState];
    const io = req.app.get('io');

    //db call    
    db.dbInsert(insertSQL, insertValues)
        .then(insertRes => res.send(insertRes))
        .catch(e => console.error('game dbInsert', e.stack))
        //web socket call to update all clients
        .then(function(){
            // io.emit('newgame', gameId);
            console.log('game.newgame: ' + gameId);
        })        
})


//player schema - id(36), created (timestamp), createdby(36), userid(36) gameid(36), host(boolean)

// join game - create a PLAYER record
router.post('/join', async (req, res) => {
    const uuid = uuidv4();
    const userId = req.body.userid;
    const gameId = req.body.gameid; //5 digit
    const gameId36 = req.body.gameid36; //36 digit
    const host = req.body.host; //boolean
    const insertSQL = 
        'INSERT INTO player(id, createdby, userid, gameid, host) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const insertValues = [uuid, userId, userId, gameId36, host];
    const io = req.app.get('io');

    //db call    
    db.dbInsert(insertSQL, insertValues)
        .then(insertRes => res.send(insertRes))
        .catch(e => console.error('game dbInsert', e.stack))
        //web socket call to update all clients
        .then(function(){
            console.log('game.joingame: ' + gameId);
        })        
})


// leave game - delete a PLAYER record