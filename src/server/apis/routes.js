const gameRoute = require('./game')
const userRoute = require('./user')
const playerRoute = require('./player')
const gameStateRoute = require('./gamestate')

module.exports = app => {
  app.use('/api/game', gameRoute);
  app.use('/api/user', userRoute);
  app.use('/api/player', playerRoute);
  app.use('/api/gamestate', gameStateRoute);
  // etc..
};

