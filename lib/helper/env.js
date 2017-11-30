const { prop, map, pipe, split, zipObj } = require('ramda')
const { minutesToMilliseconds } = require('./time')

const propConsumerKey = prop('CONSUMER_KEY')
const propConsumerSecret = prop('CONSUMER_SECRET')
const propAccessToken = prop('ACCESS_TOKEN')
const propAccessTokenSecret = prop('ACCESS_TOKEN_SECRET')
const propRandomIntervalDelays = prop('RANDOM_INTERVAL_DELAYS')

// interval helpers
const splitInterval = split('-')
const zipMinMax = zipObj(['min', 'max'])
const parseDelays = pipe(splitInterval, map(minutesToMilliseconds), zipMinMax)

const getRandomIntervalDelays = () => {
  const value = propRandomIntervalDelays(process.env)
  return value ? parseDelays(value) : undefined
}

module.exports = {
  getConsumerKey: () => propConsumerKey(process.env),
  getConsumerSecret: () => propConsumerSecret(process.env),
  getAccessToken: () => propAccessToken(process.env),
  getAccessTokenSecret: () => propAccessTokenSecret(process.env),
  getRandomIntervalDelays
}
