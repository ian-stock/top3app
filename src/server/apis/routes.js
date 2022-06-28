const gameRoute = require('./game')
const userRoute = require('./user')
const playerRoute = require('./player')
const gameStateRoute = require('./gamestate')
const answerRoute = require('./answer')

module.exports = app => {
  app.use('/api/game', gameRoute);
  app.use('/api/user', userRoute);
  app.use('/api/player', playerRoute);
  app.use('/api/gamestate', gameStateRoute);
  app.use('/api/answer', answerRoute);
  // etc..
};

