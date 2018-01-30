const express = require('express')
const Server = require('http').Server
const SocketServer = require('socket.io')
const path = require('path')

const startServer = () => {
  const app = express()
  const http = Server(app)
  const io = SocketServer(http)

  const dirPublic = path.resolve(__dirname, '../../public')
  let activeSocket

  app.use('/public', express.static(dirPublic))

  app.get('/', function(req, res) {
    const filePath = path.resolve(dirPublic, 'index.html')
    res.sendFile(filePath)
  })

  io.on('connection', function(socket) {
    console.log('a user connected')
    activeSocket = socket
    // socket.emit('news', { hello: 'world' })
  })

  http.listen(3000, function() {
    console.log('server/socket listening on localhost:3000')
  })

  const emitMessage = (type, params) => () => {
    if (activeSocket) {
      // console.log('emit', type, params)
      activeSocket.emit(type, params)
    } else {
      console.log('No socket connection found')
    }
  }

  return {
    emitVideoAccess: emitMessage('video', { action: 'access' }),
    emitVideoRandom: emitMessage('video', { action: 'random' }),
  }
}

module.exports = startServer
