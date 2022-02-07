const gameRoute = require('./game')
const userRoute = require('./user')

module.exports = app => {
  app.use('/api/game', gameRoute);
  app.use('/api/user', userRoute)
  // etc..
};

