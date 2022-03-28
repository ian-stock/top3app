const router = require("express").Router();
module.exports = router;
const db = require('../utils/database.js')

//get player detail


//get list of players
const playerListQry = 
`SELECT player.id, public.user.username, player.host
FROM game
INNER JOIN public.player ON game.id = player.gameid
INNER JOIN public.user ON player.userid = public.user.id
where game.gamenum = $1
ORDER BY player.created asc`

router.get('/:gamenum', async (req, res) => {
    const params = [req.params.gamenum]
    const result = await db.dbQuery(playerListQry, params)
    //add handling for no rows being returned
    res.send(result)
})

//for server-side db call (not express api)
async function getPlayerList(gamenum){
    const params = [gamenum]
    const result = await db.dbQuery(playerListQry, params);
    return result;
}

module.exports = getPlayerList;