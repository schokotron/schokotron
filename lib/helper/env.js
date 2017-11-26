const { prop } = require('ramda')

propConsumerKey = prop('CONSUMER_KEY')
propConsumerSecret = prop('CONSUMER_SECRET')
propAccessToken = prop('ACCESS_TOKEN')
propAccessTokenSecret = prop('ACCESS_TOKEN_SECRET')

module.exports = {
  getConsumerKey: () => propConsumerKey(process.env),
  getConsumerSecret: () => propConsumerSecret(process.env),
  getAccessToken: () => propAccessToken(process.env),
  getAccessTokenSecret: () => propAccessTokenSecret(process.env)
}
