const { contains, pipe, prop, test, toLower } = require('ramda')

const propText = prop('text')
const testSchokolade = test(/#schokolade/)
const getUser = prop('user')
const getScreenName = prop('screen_name')

const wantsSchoki = pipe(propText, toLower, testSchokolade)
const getUserId = pipe(getUser, getScreenName)

module.exports = (twitter, tweet) => {
  return new Promise((resolve, rejected) => {
    if (wantsSchoki(tweet)) {
      twitter
        .getFriendsList()
        .then(list => {
          const userId = getUserId(tweet)
          if (contains(userId, list)) {
            resolve('approved')
          } else {
            resolve('rejected')
          }
        })
        .catch(console.error)
    } else {
      resolve('unrecognised tag')
    }
  })
}
