const Twit = require('twit')
const env = require('../helper/env')
const { getScreenNames } = require('./parse/friends-list')

const config = {
  consumer_key: env.getConsumerKey(),
  consumer_secret: env.getConsumerSecret(),
  access_token: env.getAccessToken(),
  access_token_secret: env.getAccessTokenSecret(),
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
}

const isValidConfig = () =>
  !!config.consumer_key &&
  !!config.consumer_secret &&
  !!config.access_token &&
  !!config.access_token_secret

const getFriendsList = T => () => {
  return new Promise((resolve, reject) => {
    T.get('friends/list', (error, data, response) => {
      if (error) reject(error)
      else {
        resolve(getScreenNames(data))
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
      getFriendsList: getFriendsList(T),
      stream
    })
  } else {
    return Promise.reject('Invalid Twitter configuration')
  }
}

module.exports = initTwitter
