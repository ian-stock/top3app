const router = require("express").Router();
module.exports = router;
const db = require('../utils/database.js')
const { v4: uuidv4 } = require('uuid');
//const ws = require('../utils/sockets.js');
//const io = app.get("io");


//crud - post, get, patch, delete, query
//schema - id(36), created (timestamp), createdby(36), gameid(10), hostid(36), hostname(30), gamestate(20)

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await db.query('SELECT * FROM game WHERE id = $1', [id])
    res.send(rows[0])
})

// create game
router.post('/', async (req, res) => {
    const uuid = uuidv4();
    const userId = req.body.userid;
    const userName = req.body.username;
    const gameId = Math.floor(10000 + Math.random() * 90000).toString(); //random 6 digit number
    const gameState = 'New'; //???
    const insertSQL = 
        'INSERT INTO game(id, createdby, gameid, hostid, gamestate) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const insertValues = [uuid, 'userId', gameId, 'userId', gameState];
    const io = req.app.get('io');

    //db call    
    db.dbInsert(insertSQL, insertValues)
        .then(insertRes => res.send(insertRes))
        .catch(e => console.error('game dbInsert', e.stack))
        //web socket call to update all clients
        //.then(ws.wsEmitter('newgame', gameId))
        .then(console.log('pre-emit'))
        .then(function(){
            io.emit('newgame', gameId);
            // socket.join(gameId); //data: gameid
            // console.log(socket.rooms);
            console.log('emit: newgame | ' + gameId);
        })
        .then(console.log('post-emit'))
        
})


