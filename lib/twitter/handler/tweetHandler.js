const {
  contains,
  curry,
  either,
  equals,
  not,
  pipe,
  prop,
  test,
  toLower,
} = require('ramda')
const { getConfirmationMsg, getFriendInfoMsg, getGeneralInfoMsg } = require('../messages')
const {
  getStatusConfirmed,
  getStatusIgnored,
  getStatusUnknownFriend,
  getStatusUnknownRequest,
} = require('../status')
const processFriendRequest = require('./processFriendRequest')

const getTweetId = prop('id_str')
const getText = prop('text')
const testChocolate = test(/chocolate/)
const testFriend = test(/friend/)
const getUser = prop('user')
const getScreenName = prop('screen_name')

const wantsSchoki = pipe(getText, toLower, testChocolate)
const suggestsFriend = pipe(getText, toLower, testFriend)
const getUserId = pipe(getUser, getScreenName)
const isSchokotron = pipe(toLower, equals('schokotron'))

const isTweetBySchokotron = pipe(getUserId, isSchokotron)
const isTweetAddressedToSchokotron = pipe(getText, toLower, test(/@schokotron/))
const shouldIgnoreTweet = either(
  isTweetBySchokotron,
  pipe(isTweetAddressedToSchokotron, not)
)

const replyTweetFactory = curry((twitter, tweetId, msg) => {
  return twitter.sendTweet(msg, tweetId)
})

module.exports = (twitter, tweet) => {
  if (shouldIgnoreTweet(tweet)) {
    return Promise.resolve(getStatusIgnored())
  }

  const userId = getUserId(tweet)
  const sendTweet = replyTweetFactory(twitter, getTweetId(tweet))

  return new Promise((resolve, reject) => {
    let status = null
    if (suggestsFriend(tweet)) {
      processFriendRequest(twitter, tweet)
    } else if (wantsSchoki(tweet)) {
      twitter
        .getFriendsList()
        .then(list => {
          const confirmed = contains(userId, list)
          const msg = confirmed ? getConfirmationMsg(userId) : getFriendInfoMsg(userId)
          status = confirmed ? getStatusConfirmed() : getStatusUnknownFriend()
          return sendTweet(msg)
        })
        .then(tweet => {
          console.log(`Posted tweet: ${getText(tweet)}`)
          resolve(status)
        })
        .catch(reject)
    } else {
      sendTweet(getGeneralInfoMsg(userId))
        .then(tweet => {
          console.log(`Posted tweet: ${getText(tweet)}`)
          resolve(getStatusUnknownRequest())
        })
        .catch(reject)
    }
  })
}
