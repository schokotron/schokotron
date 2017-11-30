const {
  getConsumerKey,
  getConsumerSecret,
  getAccessToken,
  getAccessTokenSecret,
  getRandomIntervalDelays
} = require('../env')

const backup = Object.assign({}, process.env)

describe('helper: env', () => {
  afterEach(() => {
    process.env = Object.assign({}, backup)
  })

  describe('getConsumerKey()', () => {
    test('is undefined when CONSUMER_KEY is not set', () => {
      expect(getConsumerKey()).toBeUndefined()
    })

    test('is defined when CONSUMER_KEY is set', () => {
      process.env.CONSUMER_KEY = 'foobar'
      expect(getConsumerKey()).toEqual('foobar')
    })
  })

  describe('getConsumerSecret()', () => {
    test('is undefined when CONSUMER_SECRET is not set', () => {
      expect(getConsumerSecret()).toBeUndefined()
    })

    test('is defined when CONSUMER_SECRET is set', () => {
      process.env.CONSUMER_SECRET = 'foobar'
      expect(getConsumerSecret()).toEqual('foobar')
    })
  })

  describe('getAccessToken()', () => {
    test('is undefined when ACCESS_TOKEN is not set', () => {
      expect(getAccessToken()).toBeUndefined()
    })

    test('is defined when ACCESS_TOKEN is set', () => {
      process.env.ACCESS_TOKEN = 'foobar'
      expect(getAccessToken()).toEqual('foobar')
    })
  })

  describe('getAccessTokenSecret()', () => {
    test('is undefined when ACCESS_TOKEN_SECRET is not set', () => {
      expect(getAccessTokenSecret()).toBeUndefined()
    })

    test('is defined when ACCESS_TOKEN_SECRET is set', () => {
      process.env.ACCESS_TOKEN_SECRET = 'foobar'
      expect(getAccessTokenSecret()).toEqual('foobar')
    })
  })

  describe('getRandomIntervalDelays()', () => {
    test('is undefined when RANDOM_INTERVAL_DELAYS is not set', () => {
      expect(getRandomIntervalDelays()).toBeUndefined()
    })

    test('is defined when RANDOM_INTERVAL_DELAYS is set', () => {
      process.env.RANDOM_INTERVAL_DELAYS = '5-8'
      expect(getRandomIntervalDelays()).toEqual({ min: 300000, max: 480000 })
    })
  })
})
