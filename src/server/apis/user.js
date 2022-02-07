const router = require("express").Router();
module.exports = router;
const db = require('../utils/database.js')
const { v4: uuidv4 } = require('uuid');


//crud - post, get, patch, delete, query
//schema - id(36), created (timestamp), username(30), email(), password(), currentgame(36)
    //db or just client side? - Authenticated(boolean), inGame(boolean)


//login - create and/or update