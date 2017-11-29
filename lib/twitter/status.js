const CONFIRMED = 'confirmed'
const UNKNOWN_FRIEND = 'unknown_friend'
const UNKNOWN_REQUEST = 'unknown_request'

const getFactory = status => () => ({ status })
const isFactory = value => obj => obj.status === value

getStatusConfirmed = getFactory(CONFIRMED)
getStatusUnknownFriend = getFactory(UNKNOWN_FRIEND)
getStatusUnknownRequest = getFactory(UNKNOWN_REQUEST)

isStatusConfirmed = isFactory(CONFIRMED)
isStatusUnknownFriend = isFactory(UNKNOWN_FRIEND)
isStatusUnknownRequest = isFactory(UNKNOWN_REQUEST)

module.exports = {
  getStatusConfirmed,
  getStatusUnknownFriend,
  getStatusUnknownRequest,
  isStatusConfirmed,
  isStatusUnknownFriend,
  isStatusUnknownRequest
}
