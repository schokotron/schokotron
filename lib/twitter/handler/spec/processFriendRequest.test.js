const processFriendRequest = require('../processFriendRequest')
const { getWelcomeMsg, getErrorFriendMsg } = require('../../messages')
const data = require('./friend_request.json')

let addFriend, sendTweet, twitter

describe('processFriendRequest()', () => {
  beforeEach(() => {
    addFriend = jest.fn(id => {
      return Promise.resolve()
    })
    sendTweet = jest.fn((msg, tweetId) => {
      return Promise.resolve()
    })
    twitter = { addFriend, sendTweet }
  })

  test('works with a single friend request', () => {
    return processFriendRequest(twitter, data).then(() => {
      expect(addFriend).toHaveBeenCalledTimes(1)
      expect(addFriend).toHaveBeenCalledWith('Gunnar_Stenzel')
      expect(sendTweet).toHaveBeenCalledTimes(1)
      expect(sendTweet).toHaveBeenCalledWith(
        getWelcomeMsg('Gunnar_Stenzel', 'davidbeermann'),
        '935990746309713920'
      )
    })
  })

  test('works with two friends in weird tweet', () => {
    const temp = Object.assign({}, data, {
      text: 'Hey @schokotron! friend @Gunnar_Stenzel  foo @foobar   bar   '
    })
    return processFriendRequest(twitter, temp).then(() => {
      expect(addFriend).toHaveBeenCalledTimes(2)
      expect(addFriend).toHaveBeenLastCalledWith('foobar')
      expect(sendTweet).toHaveBeenCalledTimes(2)
      expect(sendTweet).toHaveBeenLastCalledWith(
        getWelcomeMsg('foobar', 'davidbeermann'),
        '935990746309713920'
      )
    })
  })

  test('fails with no friend id mentioned', () => {
    const temp = Object.assign({}, data, {
      text: 'Hey @schokotron! friend'
    })
    return processFriendRequest(twitter, temp).then(() => {
      expect(addFriend).toHaveBeenCalledTimes(0)
      expect(sendTweet).toHaveBeenCalledTimes(1)
      expect(sendTweet).toHaveBeenCalledWith(
        getErrorFriendMsg('davidbeermann'),
        '935990746309713920'
      )
    })
  })
})
