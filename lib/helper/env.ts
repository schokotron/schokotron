import { prop, propOr, map, pipe, split, zipObj } from 'ramda'
import { minutesToMilliseconds } from './time'

// interval helpers
const splitInterval = split('-')
const zipMinMax = zipObj(['min', 'max'])
const parseDelays = pipe(splitInterval, map(minutesToMilliseconds), zipMinMax)

const getRandomIntervalDelays = () => {
  const value = process.env['RANDOM_INTERVAL_DELAYS']
  return value ? parseDelays(value) : undefined
}

const getConsumerKey = ():string => propOr('CONSUMER_KEY', '')(process.env);
const getConsumerSecret = ():string => propOr('CONSUMER_SECRET', '')(process.env);
const getAccessToken = ():string => propOr('ACCESS_TOKEN','')(process.env);
const getAccessTokenSecret = ():string => propOr('ACCESS_TOKEN_SECRET','')(process.env);

export {
  getConsumerKey,
  getConsumerSecret, 
  getAccessToken,
  getAccessTokenSecret, 
  getRandomIntervalDelays,
}
