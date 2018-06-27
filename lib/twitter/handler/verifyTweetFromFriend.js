const { contains } = require('ramda')
const { getTweetSenderHandle } = require('../../helper/tweet')

module.exports = (twitter, tweet) => {
  return new Promise((resolve, reject) => {
    const senderId = getTweetSenderHandle(tweet)
    twitter
      .getFriendsList()
      .then(list => resolve(contains(senderId, list)))
      .catch(reject)
  })
}
