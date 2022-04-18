const router = require("express").Router();
module.exports = router;
const db = require('../utils/database.js')

const playerListQry = 
    `SELECT player.id, public.user.username, player.host
    FROM game
    INNER JOIN public.player ON game.id = player.gameid
    INNER JOIN public.user ON player.userid = public.user.id
    where game.gamenum = $1
    ORDER BY player.created asc`;

const playerUpdateStatement = 
        `UPDATE player SET topone=$2, toptwo=$3, topthree=$4 WHERE id = $1`;

//get player detail

//get list of players
router.get('/:gamenum', async (req, res) => {
    const params = [req.params.gamenum];
    console.log('server.player.get');
    const result = await db.dbQuery(playerListQry, params);
    //add handling for no rows being returned
    res.send(result);
})

//update player / submit top 3
router.post('/update/:playerid', async (req, res) => {
    const updateValues = [req.params.playerid, req.body.top1, req.body.top2, req.body.top3];
    //db call    
    db.dbUpdate(playerUpdateStatement, updateValues)
        .then(updateRes => res.send(updateRes))
        .catch(e => console.error('player.submitTop3 dbUpdate', e.stack))
        .then(function(){
            console.log('player.top3update: ' + req.params.playerid);
        })        
})