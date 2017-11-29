const { curry } = require('ramda')

const CONFIRMATION =
  "You want it, you get it! Here's some sweet, sweet #chocolate for you!"
const FRIEND_INFO =
  '??? Vouch for someone by tweeting their twitter name and the word "friend" to me. Or tweet "chocolate" to me to get sweets.'
const GENERAL_INFO =
  'Sorry, only friends get chocolate. Anyone i know can vouch for you by sending me a tweet containing your Twitter name and the word "friend".'

const getMessage = curry((msg, userId) => `@${userId} ${msg}`)

const getConfirmation = getMessage(CONFIRMATION)
const getFriendInfo = getMessage(FRIEND_INFO)
const getGeneralInfo = getMessage(GENERAL_INFO)

module.exports = { getConfirmation, getFriendInfo, getGeneralInfo }
