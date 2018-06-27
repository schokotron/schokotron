const { getRandomIntervalDelays } = require('./helper/env')
const { minutesToMilliseconds } = require('./helper/time')
const { getTweetSenderHandle, getTweetText } = require('./helper/tweet')
const initTwitter = require('./twitter')
const startServer = require('./server')
const gpio = require('./gpio')
const handleTweet = require('./twitter/handler/tweetHandler')
const { isStatusConfirmed } = require('./twitter/status')

const TIMEOUT_DELAY = 10000
const DEFAULT_MIN_DELAY = minutesToMilliseconds(60)
const DEFAULT_MAX_DELAY = minutesToMilliseconds(90)
const ENV_DELAYS = getRandomIntervalDelays()
const MIN_INTERVAL_DELAY = ENV_DELAYS ? ENV_DELAYS.min : DEFAULT_MIN_DELAY
const MAX_INTERVAL_DELAY = ENV_DELAYS ? ENV_DELAYS.max : DEFAULT_MAX_DELAY

console.log(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY)

let twitter, server, timeoutId, randomTimeout

const clearRandomInterval = () => {
  if (randomTimeout) {
    clearTimeout(randomTimeout)
  }
}

const startRandomInterval = () => {
  clearRandomInterval()
  const diff = MAX_INTERVAL_DELAY - MIN_INTERVAL_DELAY
  const delay = MIN_INTERVAL_DELAY + Math.round(Math.random() * diff)
  console.log(`delay: ${delay}`)
  randomTimeout = setTimeout(randomTimeoutDone, delay)
}

const randomTimeoutDone = () => {
  server.emitVideoRandom()
  startRandomInterval()
}

const startExternalSensorCheck = () => {
  if(gpio.pendingSensorRequest()){
    console.log("External sensor was HIGH. Granting access.")
    grantAccess()
  }else{
    console.log("All external sensors are LOW")
  }
  setTimeout(startExternalSensorCheck, 2000)
}

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
  startRandomInterval()
}

const revokeAccess = () => {
  console.log(new Date(), 'Access revoked')
  gpio.closeDoor()
  clearRevokeTimeout()
}

const followCallback = data => console.log(data)
const tweetCallback = data => {
  handleTweet(twitter, data)
    .then(response => {
      console.log('##################################################')
      console.log(`Sender: @${getTweetSenderHandle(data)}`)
      console.log(`Tweet: ${getTweetText(data)}`)
      console.log(`Status: ${response.status}`)
      if (response && isStatusConfirmed(response)) {
        grantAccess()
      }
    })
    .catch(console.error)
}

const startTestInterval = () => {
  // setInterval(() => {
  //   server.emitVideoAccess()
  // }, 2000)
  setInterval(() => {
    grantAccess()
  }, 10000)
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
      startRandomInterval()
      startExternalSensorCheck()
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
  run,
}
