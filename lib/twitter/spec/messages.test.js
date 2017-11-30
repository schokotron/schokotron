const {
  getConfirmationMsg,
  getFriendInfoMsg,
  getGeneralInfoMsg,
  getWelcomeMsg,
  getErrorFriendMsg
} = require('../messages')

describe('helper: messages', () => {
  describe('getConfirmationMsg()', () => {
    test('returns correct message with all parameters', () => {
      expect(getConfirmationMsg('Gunnar_Stenzel')).toEqual(
        "@Gunnar_Stenzel You want it, you get it! Here's some sweet, sweet #chocolate for you!"
      )
    })
  })

  describe('getFriendInfoMsg()', () => {
    test('it returns correct message', () => {
      expect(getFriendInfoMsg('Gunnar_Stenzel')).toEqual(
        '@Gunnar_Stenzel ??? Vouch for someone by tweeting their twitter name and the word "friend" to me. Or tweet "chocolate" to me to get sweets.'
      )
    })
  })

  describe('getGeneralInfoMsg()', () => {
    test('it returns correct message', () => {
      expect(getGeneralInfoMsg('Gunnar_Stenzel')).toEqual(
        '@Gunnar_Stenzel Sorry, only friends get chocolate. Anyone i know can vouch for you by sending me a tweet containing your Twitter name and the word "friend".'
      )
    })
  })

  describe('getWelcomeMsg()', () => {
    test('it returns correct message', () => {
      expect(getWelcomeMsg('Gunnar_Stenzel')).toEqual(
        'Welcome! @Gunnar_Stenzel is now part of the elect circle of chocolaty calorie connoisseurs at XING.'
      )
    })
  })

  describe('getErrorFriendMsg()', () => {
    test('it returns correct message', () => {
      expect(getErrorFriendMsg('Gunnar_Stenzel')).toEqual(
        '@Gunnar_Stenzel ??? Vouch for someone by tweeting their twitter name and the word "friend" to me.'
      )
    })
  })
})
