//background scheduled job for clean ups
//Heroku Scheduler
//Job Command: node /app/src/server/utils/jobs.js

const log = require('./log');

//clear out old games every night
function gameDelete(){
    //call database.js - separate call to single delete function
    //mass delete game, player, answer where created date was yesterday / at least 4 hours before
    //heroku scheduler job runs at 4am utc every day

    log('server.housekeeping.gameDelete.start', new Date().toISOString())

    log('server.housekeeping.gameDelete.complete', new Date().toISOString())

}

gameDelete();
