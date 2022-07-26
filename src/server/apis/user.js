const router = require("express").Router();
module.exports = router;
const db = require('../utils/database.js')
const { v4: uuidv4 } = require('uuid');
const log = require('./../utils/log')

//crud - post, get, patch, delete, query
//schema - id(36), created (timestamp), username(30), email(), password(), currentgame(36)

// create/register user
router.post('/register', async (req, res) => {
    const uuid = uuidv4();
    const userName = req.body.username.toLowerCase(); //make username case insensitive
    const password = req.body.pwd;
    const insertSQL = 
        'INSERT INTO public.user(id, createdby, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const insertValues = [uuid, uuid, userName, password];

    //db call    
    db.dbInsert(insertSQL, insertValues)
        .then(insertRes => res.send(insertRes))
        .catch(e => {
            console.error('user.registration dbInsert', e.stack);
            res.send({error: e.message});
        })
        .then(function(){
            log('user.register', userName);
        })        
})

// login user
router.post('/login', async (req, res) => {
    const params = [req.body.username.toLowerCase(), req.body.pwd] //make username case insensitive
    const result = await db.dbQuery('SELECT id, username FROM public.user WHERE username = $1 and password = $2', params)
    //add handling for no rows being returned - wrong username, wrong password
    res.send(result)
    
})

//for server-side db calls (not express api)
const userListQry = 
    `SELECT public.user.id, public.user.username, player.gamescore,
    public.user.totalscore, public.user.noofgames FROM game
    FULL OUTER JOIN public.player ON game.id = player.gameid
    FULL OUTER JOIN public.user ON player.userid = public.user.id
    where game.gamenum = $1`;

async function updateUserScores(gamenum, event){
    log(`server.user.updateUserScores.${event}`, gamenum);
    const params = [gamenum];
    try{
        const response = await db.dbQuery(userListQry, params);
        const userList = response.rows;
        log(`server.user.updateUserScores.response`, JSON.stringify(userList));
        //for each record, update the user scores
        for (let i=0; i < userList.length; i++) {
            log(`server.user.updateUserScores.updateUser.${i}`, userList[i].id);
            updateUser(userList[i].id, userList[i].gamescore, userList[i].totalscore, userList[i].noofgames)
        }
    }
    catch(e){
        console.error('server.user.updateUserScores.error', e.stack)
    }
  }
  
  const userUpdateStatement = 
        `UPDATE public.user SET totalscore=$2, noofgames=$3 WHERE id = $1  RETURNING *`;

  function updateUser(userid, gamescore, totalscore, noofgames){
    totalscore = gamescore+totalscore;
    noofgames++;
    log(`server.user.updateUser`, userid);
    const updateValues = [userid, totalscore, noofgames];
    db.dbUpdate(userUpdateStatement, updateValues)
    .catch(e => console.error('server.user.updateUser dbUpdate', e.stack))
  }

  module.exports.updateUserScores = updateUserScores;