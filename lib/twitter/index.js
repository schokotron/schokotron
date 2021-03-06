const Twit = require('twit')
const env = require('../helper/env')
const { getScreenNames } = require('./parse/friends-list')

const config = {
  consumer_key: env.getConsumerKey(),
  consumer_secret: env.getConsumerSecret(),
  access_token: env.getAccessToken(),
  access_token_secret: env.getAccessTokenSecret(),
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
}

const isValidConfig = () =>
  !!config.consumer_key &&
  !!config.consumer_secret &&
  !!config.access_token &&
  !!config.access_token_secret

const addFriend = T => userId => {
  return new Promise((resolve, reject) => {
    const params = { screen_name: userId, follow: true }
    T.post('friendships/create', params, (error, data, response) => {
      if (error) reject(error)
      else {
        resolve(data)
      }
    })
  })
}

const getFriendsList = T => () => {
  return new Promise((resolve, reject) => {
    // NOTE: This endpoint currently can retrieve a maximum of 200 friends at once!
    // https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-friends-list
    T.get('friends/list', { count: 200 }, (error, data, response) => {
      if (error) reject(error)
      else {
        resolve(getScreenNames(data))
      }
    })
  })
}

const sendTweet = T => (msg, replyId = undefined) => {
  return new Promise((resolve, reject) => {
    const params = { status: msg, in_reply_to_status_id: replyId }
    T.post('statuses/update', params, (error, data, response) => {
      if (error) reject(error)
      else {
        resolve(data)
      }
    })
  })
}

const initTwitter = (followCallback, tweetCallback) => {
  if (isValidConfig()) {
    const T = new Twit(config)

    const stream = T.stream('user')
    stream.on('follow', followCallback)
    stream.on('tweet', tweetCallback)

    return Promise.resolve({
      addFriend: addFriend(T),
      getFriendsList: getFriendsList(T),
      sendTweet: sendTweet(T),
      stream,
    })
  } else {
    return Promise.reject('Invalid Twitter configuration')
  }
}

module.exports = initTwitter
