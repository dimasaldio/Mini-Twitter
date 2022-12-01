const passport = require('./config')

const authenticationJwt = passport.authenticate('jwt', {
  session: false
})

module.exports = authenticationJwt