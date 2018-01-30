const { contains, curry, equals, pipe, prop, test, toLower } = require('ramda')
const { getConfirmationMsg, getFriendInfoMsg, getGeneralInfoMsg } = require('../messages')
const {
  getStatusConfirmed,
  getStatusUnknownFriend,
  getStatusUnknownRequest,
} = require('../status')
const processFriendRequest = require('./processFriendRequest')

const getTweetId = prop('id_str')
const propText = prop('text')
const testSchokolade = test(/chocolate/)
const testFriend = test(/friend/)
const getUser = prop('user')
const getScreenName = prop('screen_name')

const wantsSchoki = pipe(propText, toLower, testSchokolade)
const suggestsFriend = pipe(propText, toLower, testFriend)
const getUserId = pipe(getUser, getScreenName)
const isSchokotron = pipe(toLower, equals('schokotron'))

const replyTweetFactory = curry((twitter, tweetId, msg) => {
  return twitter.sendTweet(msg, tweetId)
})

module.exports = (twitter, tweet) => {
  const userId = getUserId(tweet)
  const sendTweet = replyTweetFactory(twitter, getTweetId(tweet))

  if (isSchokotron(userId)) {
    // console.log('Ignored my own tweet...')
    return Promise.resolve()
  }

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
