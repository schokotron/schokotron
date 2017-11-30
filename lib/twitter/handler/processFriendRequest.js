const { filter, map, pipe, replace, split, test, trim } = require('ramda')
const verifyTweetFromFriend = require('./verifyTweetFromFriend')
const { getTweetId, getTweetSenderId, getTweetText } = require('../helper')
const {
  getWelcomeMsg,
  getErrorFriendMsg,
  getGeneralInfoMsg
} = require('../messages')

const removeSchokotron = replace(/@schokotron/gi, '')
const removeFriendKeyword = replace(/friend/gi, '')
const cleanupText = pipe(removeSchokotron, removeFriendKeyword, trim)

const splitWords = split(' ')
const testForAtSign = test(/^@/)
const filterNonUserIds = filter(testForAtSign)
const mapTrim = map(trim)
const mapRemoveAtSign = map(value => value.substring(1))
const extractUserIds = pipe(
  splitWords,
  filterNonUserIds,
  mapTrim,
  mapRemoveAtSign
)

const getUserIdsFromTweet = pipe(getTweetText, cleanupText, extractUserIds)

const addFriends = (twitter, userIds) => {
  // FIXME send tweets with Bluebird on after another?
  return Promise.all(map(userId => twitter.addFriend(userId), userIds))
}

const sendFriendTweets = (twitter, userIds, tweetId) => {
  // FIXME send tweets with Bluebird on after another?
  return Promise.all(
    map(userId => twitter.sendTweet(getWelcomeMsg(userId), tweetId), userIds)
  )
}

module.exports = (twitter, tweet) => {
  const tweetId = getTweetId(tweet)
  const senderId = getTweetSenderId(tweet)
  const userIds = getUserIdsFromTweet(tweet)

  return new Promise((resolve, reject) => {
    if (userIds.length === 0) {
      twitter
        .sendTweet(getErrorFriendMsg(senderId), tweetId)
        .then(resolve)
        .catch(reject)
    } else {
      verifyTweetFromFriend(twitter, tweet)
        .then(result => {
          return result
            ? addFriends(twitter, userIds).then(() =>
                sendFriendTweets(twitter, userIds, tweetId)
              )
            : twitter.sendTweet(getGeneralInfoMsg(senderId), tweetId)
        })
        .then(answers => resolve())
        .catch(reject)
    }
  })
}
