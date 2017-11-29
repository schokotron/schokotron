var ACCESS_VIDEOS = [
  '/public/videos/access-01.mp4',
  '/public/videos/access-02.mp4',
  '/public/videos/access-03.mp4',
  '/public/videos/access-04.mp4',
  '/public/videos/access-05.mp4',
  '/public/videos/access-06.mp4',
  '/public/videos/access-07.mp4',
  '/public/videos/access-08.mp4',
  '/public/videos/access-09.mp4',
  '/public/videos/access-10.mp4',
  '/public/videos/access-11.mp4',
  '/public/videos/access-12.mp4',
  '/public/videos/access-13.mp4',
  '/public/videos/access-14.mp4',
  '/public/videos/access-15.mp4',
  '/public/videos/access-16.mp4',
  '/public/videos/access-17.mp4',
  '/public/videos/access-18.mp4',
  '/public/videos/access-19.mp4',
  '/public/videos/access-20.mp4'
]
var RANDOM_VIDEOS = [
  '/public/videos/random-01.mp4',
  '/public/videos/random-02.mp4',
  '/public/videos/random-03.mp4',
  '/public/videos/random-04.mp4',
  '/public/videos/random-05.mp4',
  '/public/videos/random-06.mp4',
  '/public/videos/random-07.mp4',
  '/public/videos/random-08.mp4',
  '/public/videos/random-09.mp4',
  '/public/videos/random-10.mp4',
  '/public/videos/random-11.mp4',
  '/public/videos/random-12.mp4',
  '/public/videos/random-13.mp4'
]

var playAccessVideo = function() {
  var index = Math.floor(Math.random() * ACCESS_VIDEOS.length)
  playVideo(ACCESS_VIDEOS[index])
}

var playRandomVideo = function() {
  var index = Math.floor(Math.random() * RANDOM_VIDEOS.length)
  playVideo(RANDOM_VIDEOS[index])
}

var playVideo = function(url) {
  var video = document.getElementById('video')
  video.getElementsByTagName('source')[0].setAttribute('src', url)
  video.load()
  video.play()
}

var keydownHandler = function(event) {
  // Fullscreen API
  // https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
  // webkit prefixes for Chrome
  if (event.key === 'f' && video.webkitRequestFullscreen) {
    if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen()
    } else {
      video.webkitRequestFullscreen()
    }
  }
}

var socketVideoHandler = function(data) {
  console.log(data)
  switch (data.action) {
    case 'access':
      playAccessVideo()
      break
    case 'random':
      playRandomVideo()
      break
    default:
      console.log('unknown socket action')
      break
  }
}

document.addEventListener('keydown', keydownHandler)

var socket = io('http://localhost:3000')
socket.on('video', socketVideoHandler)
