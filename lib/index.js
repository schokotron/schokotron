const initTwitter = require('./twitter')
const startServer = require('./server')
const handleTweet = require('./twitter/handler/tweetHandler')
const { isStatusConfirmed } = require('./twitter/status')

let twitter, server

const followCallback = data => console.log(data)
const tweetCallback = data =>
  handleTweet(twitter, data)
    .then(status => {
      if (status && isStatusConfirmed(status)) {
        console.log(status)
        server.emitVideoAccess()
      }
    })
    .catch(console.error)

const run = () => {
  initTwitter(followCallback, tweetCallback)
    .then(inst => {
      twitter = inst
      server = startServer()
      console.log('Schokotron is running')
      // twitter
      //   .sendTweet('test')
      //   .then(console.log)
      //   .catch(console.error)
    })
    .catch(console.error)
}

module.exports = {
  followCallback,
  tweetCallback,
  run
}
