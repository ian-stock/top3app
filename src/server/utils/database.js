const { Pool } = require('pg');
const config = {};

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
     return qryRes.rows; 
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
    return insertRes.rows[0]
  }catch(e){
    await client.query('ROLLBACK')
    console.error('dbInsert error', e.stack);
  } finally {
    client.release()
  }
}

function dbUpdate() {
  //include update statement logic
}

function dbDelete() {
  //include delete statement logic
}


exports.dbQuery = dbQuery;
exports.dbInsert = dbInsert;
exports.dbUpdate = dbUpdate;
exports.dbDelete = dbDelete;


//module.exports = {
//     query: (text, params) => pool.query(text, params),
//}