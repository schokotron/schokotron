const { curry, replace } = require('ramda')

const replaceReceiverId = replace(/RECEIVER_ID/)

const CONFIRMATION =
  "@RECEIVER_ID You want it, you get it! Here's some sweet, sweet #chocolate for you!"
const FRIEND_INFO =
  '@RECEIVER_ID ??? Vouch for someone by tweeting their twitter name and the word "friend" to me. Or tweet "chocolate" to me to get sweets.'
const GENERAL_INFO =
  '@RECEIVER_ID Sorry, only friends get chocolate. Anyone i know can vouch for you by sending me a tweet containing your Twitter name and the word "friend".'
const WELCOME =
  'Welcome! @RECEIVER_ID is now part of the elect circle of chocolaty calorie connoisseurs at XING.'
const ERROR_FRIEND =
  '@RECEIVER_ID ??? Vouch for someone by tweeting their twitter name and the word "friend" to me.'

const getMessage = curry((msg, receiverId) => {
  if (!receiverId) return null
  return replaceReceiverId(receiverId, msg)
})

module.exports.getConfirmationMsg = getMessage(CONFIRMATION)
module.exports.getFriendInfoMsg = getMessage(FRIEND_INFO)
module.exports.getGeneralInfoMsg = getMessage(GENERAL_INFO)
module.exports.getWelcomeMsg = getMessage(WELCOME)
module.exports.getErrorFriendMsg = getMessage(ERROR_FRIEND)
