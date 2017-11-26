const initTwitter = require('./twitter')
const handleTweet = require('./handler/tweetHandler')

let twitter

const followCallback = data => console.log(data)
const tweetCallback = data => handleTweet(twitter, data).then(console.log)

const run = () => {
  initTwitter(followCallback, tweetCallback)
    .then(inst => {
      twitter = inst
      return twitter.getFriendsList()
    })
    .then(console.log)
    .catch(console.error)
}

module.exports = {
  followCallback,
  tweetCallback,
  run
}
