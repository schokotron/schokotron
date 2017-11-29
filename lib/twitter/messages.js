const { curry } = require('ramda')

const CONFIRMATION = 'chocolate confirmation message'
const FRIEND_INFO = 'friend instructions'
const GENERAL_INFO = 'general instructions'

const getMessage = curry((msg, userId) => `@${userId} ${msg}`)

const getConfirmation = getMessage(CONFIRMATION)
const getFriendInfo = getMessage(FRIEND_INFO)
const getGeneralInfo = getMessage(GENERAL_INFO)

module.exports = { getConfirmation, getFriendInfo, getGeneralInfo }
