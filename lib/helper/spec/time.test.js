const { minutesToMilliseconds } = require('../time')

describe('helper: time', () => {
  describe('minutesToMilliseconds()', () => {
    test('convert minutes to milliseconds', () => {
      expect(minutesToMilliseconds(5)).toBe(300000)
    })
  })
})
