const { pipe, prop } = require('ramda')

const getUser = prop('user')
const getScreenName = prop('screen_name')

module.exports.getTweetId = prop('id_str')
module.exports.getTweetSenderId = pipe(getUser, getScreenName)
module.exports.getTweetText = prop('text')
