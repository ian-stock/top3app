const { Pool } = require('pg');
const config = {};
const log = require('../utils/log');

if (process.env.DATABASE_URL){}

const pool = new Pool({ 
  connectionString: 
    process.env.DATABASE_URL || "postgres://istock@localhost:5432/top3-local",
    ssl: process.env.DATABASE_URL ?  {rejectUnauthorized: false}  : false // heroku or local
    //ssl: {rejectUnauthorized: false} //heroku
});

//get, create, update, delete
// Returns a promise, when promise is fulfilled, results received, when rejected, error received

async function dbQuery(statement, params) {
  try{
    qryRes = await pool.query(statement, params);  
    log('server.database.dbquery.statement', statement) 
    log('server.database.dbquery.params', params) 
    log('server.database.dbquery.rowslength', qryRes.rows.length) 
    log('server.database.dbquery.row0', JSON.stringify(qryRes.rows[0])) 
    return qryRes; 
  }catch(e){
    console.error('dbQuery error', e.stack);
  }
}

async function dbInsert(statement, params) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN')
    insertRes = await client.query(statement, params)
    await client.query('COMMIT')

    log('server.database.dbinsert.statement', statement) 
    log('server.database.dbinsert.params', params) 
    log('server.database.dbinsert.rowslength', insertRes.rows.length) 
    log('server.database.dbinsert.row0', JSON.stringify(insertRes.rows[0])) 

    return insertRes.rows[0]
  }catch(e){
    await client.query('ROLLBACK')
    console.error('dbInsert error', e.stack);
  } finally {
    client.release()
  }
}

async function dbUpdate(statement, params) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN')
    updateRes = await client.query(statement, params)
    await client.query('COMMIT')
    return updateRes.rows[0]
  }catch(e){
    await client.query('ROLLBACK')
    console.error('dbUpdate error', e.stack);
  } finally {
    client.release()
  }
}

function dbDelete() {
  //include delete statement logic
}

//for server-side db call (not express api)
const playerListQry1 = 
    `SELECT player.id, public.user.username, player.host
    FROM game
    INNER JOIN public.player ON game.id = player.gameid
    INNER JOIN public.user ON player.userid = public.user.id
    where game.gamenum = $1`;
const playerListQry2 =   ` and player.playerstate = 'Submitted'`;
const playerListQry3 =   ` ORDER BY player.created asc`;
    
async function getPlayerList(gamenum, event){
  log(`server.database.getPlayerList.${event}`, gamenum);
  let playerListQryUsed = (event=='submittedtop3') ? playerListQry1+playerListQry2+playerListQry3 : 
    playerListQry1+playerListQry3;
  log(`server.database.getPlayerList.${event}.qry`, playerListQryUsed);
  const params = [gamenum];
  const result = await dbQuery(playerListQryUsed, params);
  return result;
}


exports.dbQuery = dbQuery;
exports.dbInsert = dbInsert;
exports.dbUpdate = dbUpdate;
exports.dbDelete = dbDelete;

// module.exports = getPlayerList;
exports.getPlayerList = getPlayerList;