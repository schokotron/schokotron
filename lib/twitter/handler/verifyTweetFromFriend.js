const { contains } = require('ramda')
const { getTweetSenderId } = require('../helper')

module.exports = (twitter, tweet) => {
  return new Promise((resolve, reject) => {
    const senderId = getTweetSenderId(tweet)
    twitter
      .getFriendsList()
      .then(list => resolve(contains(senderId, list)))
      .catch(reject)
  })
}
