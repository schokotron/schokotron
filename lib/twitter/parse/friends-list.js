const { pipe, prop, map } = require('ramda')

const getUsers = prop('users')
const getScreenName = prop('screen_name')

const getScreenNames = pipe(getUsers, map(getScreenName))

module.exports = {
  getScreenNames
}
