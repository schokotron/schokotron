const initTwitter = require('./twitter')
const startServer = require('./server')
const gpio = require('./gpio')
const handleTweet = require('./twitter/handler/tweetHandler')
const { isStatusConfirmed } = require('./twitter/status')

const TIMEOUT_DELAY = 5000
let twitter, server, timeoutId

const clearRevokeTimeout = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
}

const startRevokeTimeout = () => {
  clearRevokeTimeout()
  timeoutId = setTimeout(revokeAccess, TIMEOUT_DELAY)
}

const grantAccess = () => {
  console.log(new Date(), 'Access granted')
  server.emitVideoAccess()
  gpio.openDoor()
  startRevokeTimeout()
}

const revokeAccess = () => {
  console.log(new Date(), 'Access revoked')
  gpio.closeDoor()
  clearRevokeTimeout()
}

const followCallback = data => console.log(data)
const tweetCallback = data => {
  // console.log(data)
  handleTweet(twitter, data)
    .then(status => {
      if (status && isStatusConfirmed(status)) {
        // console.log(status)
        grantAccess()
      }
    })
    .catch(console.error)
}

const startTestInterval = () => {
  setInterval(() => {
    server.emitVideoAccess()
  }, 2000)
}

const testFollowFriend = () => {
  twitter
    .addFriend('Gunnar_Stenzel')
    .then(console.log)
    .catch(console.error)
}

const run = () => {
  initTwitter(followCallback, tweetCallback)
    .then(inst => {
      twitter = inst
      server = startServer()
      gpio.init()
      console.log('Schokotron is running')

      // startTestInterval()
      // testFollowFriend()
      // grantAccess()
    })
    .catch(console.error)
}

module.exports = {
  followCallback,
  tweetCallback,
  run
}
