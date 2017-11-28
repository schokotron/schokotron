var socket = io('http://localhost:3000')

socket.on('news', function(data) {
  console.log(data)
})
