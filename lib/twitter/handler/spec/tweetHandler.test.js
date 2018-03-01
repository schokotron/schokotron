const tweetHandler = require('../tweetHandler')
const tweet = require('./stream_tweet.json')

const sendTweet = jest.fn(tweet => {
  return Promise.resolve({ text: tweet })
})
const twitter = {
  getFriendsList: () => Promise.resolve(['davidbeermann']),
  sendTweet,
}

describe('tweetHandler()', () => {
  beforeEach(() => {
    sendTweet.mockClear()
  })

  test('ignores tweets which are not addressed at schokotron', async () => {
    const tweet = {
      user: { screen_name: 'foobar' },
      text: '@somebody you need to take a look at this...',
    }
    const result = await tweetHandler(twitter, tweet)
    expect(result).toEqual({ status: 'ignored' })
  })

  test('ignores tweets by schokotron', async () => {
    const tweet = {
      user: { screen_name: 'schokotron' },
      text: "@somebody here's your schoki...",
    }
    const result = await tweetHandler(twitter, tweet)
    expect(result).toEqual({ status: 'ignored' })
  })

  test('rejects people who are not friends', async () => {
    const tweet = {
      user: { screen_name: 'foobar' },
      text: '@schokotron please give me chocolate.',
    }
    const response =
      '@foobar ??? Vouch for someone by tweeting their twitter name and the word "friend" to me. Or tweet "chocolate" to me to get sweets.'
    const result = await tweetHandler(twitter, tweet)
    expect(result).toEqual({ status: 'unknown_friend' })
    expect(sendTweet).toHaveBeenCalledTimes(1)
    // expect(sendTweet).toHaveBeenCalledWith(response)
  })

  test('answers people who are friends and use correct wording', async () => {
    const tweet = {
      user: { screen_name: 'davidbeermann' },
      text: '@schokotron please give me chocolate.',
    }
    const response =
      "@davidbeermann You want it, you get it! Here's some sweet, sweet #chocolate for you!"
    const result = await tweetHandler(twitter, tweet)
    expect(result).toEqual({ status: 'confirmed' })
    expect(sendTweet).toHaveBeenCalledTimes(1)
    // expect(sendTweet).toHaveBeenCalledWith(response)
  })

  test('answers people who are friends with instructions', async () => {
    const tweet = {
      user: { screen_name: 'davidbeermann' },
      text: '@schokotron please give me #ScHoKoLaDe.',
    }
    const response =
      '@davidbeermann Sorry, only friends get chocolate. Anyone i know can vouch for you by sending me a tweet containing your Twitter name and the word "friend".'
    const result = await tweetHandler(twitter, tweet)
    expect(result).toEqual({ status: 'unknown_request' })
    expect(sendTweet).toHaveBeenCalledTimes(1)
    // expect(sendTweet).toHaveBeenCalledWith(response)
  })
})
