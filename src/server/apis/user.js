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
    const userName = req.body.username;
    const password = req.body.pwd;
    const insertSQL = 
        'INSERT INTO public.user(id, createdby, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const insertValues = [uuid, uuid, userName, password];

    //db call    
    db.dbInsert(insertSQL, insertValues)
        .then(insertRes => res.send(insertRes))
        .catch(e => console.error('user.registration dbInsert', e.stack))
        .then(function(){
            log('user.register', userName);
        })        
})

// login user
router.post('/login', async (req, res) => {
    const params = [req.body.username, req.body.pwd]
    const result = await db.dbQuery('SELECT id, username FROM public.user WHERE username = $1 and password = $2', params)
    //add handling for no rows being returned - wrong username, wrong password
    res.send(result)
    
})
