const { contains, curry, equals, pipe, prop, test, toLower } = require('ramda')
const {
  getConfirmationMsg,
  getFriendInfoMsg,
  getGeneralInfoMsg
} = require('../messages')
const {
  getStatusConfirmed,
  getStatusUnknownFriend,
  getStatusUnknownRequest
} = require('../status')

const getTweetId = prop('id_str')
const propText = prop('text')
const testSchokolade = test(/chocolate/)
const getUser = prop('user')
const getScreenName = prop('screen_name')

const wantsSchoki = pipe(propText, toLower, testSchokolade)
const getUserId = pipe(getUser, getScreenName)
const isSchokotron = pipe(toLower, equals('schokotron'))

const replyTweetFactory = curry((twitter, tweetId, msg) => {
  return twitter.sendTweet(msg, tweetId)
})

module.exports = (twitter, tweet) => {
  const userId = getUserId(tweet)
  const sendTweet = replyTweetFactory(twitter, getTweetId(tweet))

  if (isSchokotron(userId)) {
    console.log('Ignored tweet of myself')
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    let status = null
    if (wantsSchoki(tweet)) {
      twitter
        .getFriendsList()
        .then(list => {
          const confirmed = contains(userId, list)
          const msg = confirmed
            ? getConfirmationMsg(userId)
            : getFriendInfoMsg(userId)
          status = confirmed ? getStatusConfirmed() : getStatusUnknownFriend()
          return sendTweet(msg)
        })
        .then(tweet => {
          console.log(`Posted tweet: ${propText(tweet)}}`)
          resolve(status)
        })
        .catch(reject)
    } else {
      sendTweet(getGeneralInfoMsg(userId))
        .then(tweet => {
          console.log(`Posted tweet: ${propText(tweet)}}`)
          resolve(getStatusUnknownRequest())
        })
        .catch(reject)
    }
  })
}
