const router = require("express").Router();
module.exports = router;
const db = require('../utils/database.js')
const log = require('./../utils/log')

const playerListQry = 
    `SELECT player.id, public.user.username, player.host
    FROM game
    INNER JOIN public.player ON game.id = player.gameid
    INNER JOIN public.user ON player.userid = public.user.id
    where game.gamenum = $1
    ORDER BY player.created asc`;

const playerDetailQry = 
    `SELECT * FROM public.player where id = $1`;

const playerUpdateStatement = 
        `UPDATE player SET topone=$2, toptwo=$3, topthree=$4, playerstate=$5 WHERE id = $1  RETURNING *`;

//get player detail
router.get('/:playerid', async (req, res) => {
    const params = [req.params.playerid];
    log('server.player.getplayer-detail', req.params.playerid);
    const result = await db.dbQuery(playerDetailQry, params);
    //add handling for no rows being returned
    res.send(result);
})

//get list of players
router.get('/:gamenum', async (req, res) => {
    const params = [req.params.gamenum];
    log('server.player.getplayers', req.params.gamenum);
    const result = await db.dbQuery(playerListQry, params);
    //add handling for no rows being returned
    res.send(result);
})

//update player / submit top 3
router.post('/update/:playerid', async (req, res) => {
    const updateValues = [req.params.playerid, req.body.top1, req.body.top2, req.body.top3, 'Submitted'];
    //db call    
    db.dbUpdate(playerUpdateStatement, updateValues)
        .then(updateRes => res.send(updateRes))
        .catch(e => console.error('server.player.submitTop3 dbUpdate', e.stack))
        .then(function(){
            log('server.player.top3update: ', req.params.playerid);
        })        
})