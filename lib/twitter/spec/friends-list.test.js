const { getScreenNames } = require('../parse/friends-list')
const data = require('./friends_list.json')

describe('getScreenNames()', () => {
  test('returns an array of screen names on valid data', () => {
    expect(getScreenNames(data)).toEqual(['davidbeermann'])
  })
})
