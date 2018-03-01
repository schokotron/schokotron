const CONFIRMED = 'confirmed'
const IGNORED = 'ignored'
const UNKNOWN_FRIEND = 'unknown_friend'
const UNKNOWN_REQUEST = 'unknown_request'

const getFactory = status => () => ({ status })
const isFactory = value => obj => obj.status === value

module.exports.getStatusConfirmed = getFactory(CONFIRMED)
module.exports.getStatusIgnored = getFactory(IGNORED)
module.exports.getStatusUnknownFriend = getFactory(UNKNOWN_FRIEND)
module.exports.getStatusUnknownRequest = getFactory(UNKNOWN_REQUEST)

module.exports.isStatusConfirmed = isFactory(CONFIRMED)
module.exports.isStatusIgnored = isFactory(IGNORED)
module.exports.isStatusUnknownFriend = isFactory(UNKNOWN_FRIEND)
module.exports.isStatusUnknownRequest = isFactory(UNKNOWN_REQUEST)
