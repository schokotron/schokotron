const CONFIRMED = 'confirmed'
const UNKNOWN_FRIEND = 'unknown_friend'
const UNKNOWN_REQUEST = 'unknown_request'

const getFactory = status => () => ({ status })
const isFactory = value => obj => obj.status === value

module.exports.getStatusConfirmed = getFactory(CONFIRMED)
module.exports.getStatusUnknownFriend = getFactory(UNKNOWN_FRIEND)
module.exports.getStatusUnknownRequest = getFactory(UNKNOWN_REQUEST)

module.exports.isStatusConfirmed = isFactory(CONFIRMED)
module.exports.isStatusUnknownFriend = isFactory(UNKNOWN_FRIEND)
module.exports.isStatusUnknownRequest = isFactory(UNKNOWN_REQUEST)
