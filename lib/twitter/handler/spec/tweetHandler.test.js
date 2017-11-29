const tweetHandler = require('../tweetHandler')
const tweet = require('./stream_tweet.json')

const twitter = {
  getFriendsList: () => Promise.resolve(['davidbeermann'])
}

describe('tweetHandler()', () => {
  test('returns approved', () => {
    return tweetHandler(twitter, tweet).then(result => {
      expect(result).toEqual('approved')
    })
  })

  test('returns rejected', () => {
    const t = {
      text: '#ScHoKoLaDe',
      user: { screen_name: 'foobar' }
    }
    return tweetHandler(twitter, t).then(result => {
      expect(result).toEqual('rejected')
    })
  })

  test('returns unrecognised tag', () => {
    const t = { text: 'foobar' }
    return tweetHandler(twitter, t).then(result => {
      expect(result).toEqual('unrecognised tag')
    })
  })
})
