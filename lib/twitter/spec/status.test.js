const {
  getStatusConfirmed,
  getStatusUnknownFriend,
  getStatusUnknownRequest,
  isStatusConfirmed,
  isStatusUnknownFriend,
  isStatusUnknownRequest,
} = require('../status')

describe('helper: status', () => {
  describe('getStatusConfirmed()', () => {
    test('returns valid object', () => {
      expect(getStatusConfirmed()).toEqual({ status: 'confirmed' })
    })
  })

  describe('getStatusUnknownFriend()', () => {
    test('returns valid object', () => {
      expect(getStatusUnknownFriend()).toEqual({ status: 'unknown_friend' })
    })
  })

  describe('getStatusUnknownRequest()', () => {
    test('returns valid object', () => {
      expect(getStatusUnknownRequest()).toEqual({ status: 'unknown_request' })
    })
  })

  describe('isStatusConfirmed()', () => {
    test('returns true for valid object', () => {
      const obj = getStatusConfirmed()
      expect(isStatusConfirmed(obj)).toBeTruthy()
    })

    test('returns false for invalid object', () => {
      const obj1 = { status: 'foobar' }
      expect(isStatusConfirmed(obj1)).toBeFalsy()
      const obj2 = { foo: 'bar' }
      expect(isStatusConfirmed(obj2)).toBeFalsy()
    })
  })

  describe('isStatusUnknownFriend()', () => {
    test('returns true for valid object', () => {
      const obj = getStatusUnknownFriend()
      expect(isStatusUnknownFriend(obj)).toBeTruthy()
    })

    test('returns false for invalid object', () => {
      const obj1 = { status: 'foobar' }
      expect(isStatusUnknownFriend(obj1)).toBeFalsy()
      const obj2 = { foo: 'bar' }
      expect(isStatusUnknownFriend(obj2)).toBeFalsy()
    })
  })

  describe('isStatusUnknownRequest()', () => {
    test('returns true for valid object', () => {
      const obj = getStatusUnknownRequest()
      expect(isStatusUnknownRequest(obj)).toBeTruthy()
    })

    test('returns false for invalid object', () => {
      const obj1 = { status: 'foobar' }
      expect(isStatusUnknownRequest(obj1)).toBeFalsy()
      const obj2 = { foo: 'bar' }
      expect(isStatusUnknownRequest(obj2)).toBeFalsy()
    })
  })
})
