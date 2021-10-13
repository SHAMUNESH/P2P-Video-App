var getUserMedia = require('getusermedia')

getUserMedia({ video: true, audio: false }, function (err, stream) {
  if (err) return console.error(err)

  var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })

  peer.on('signal', function (data) {
    console.log("signal")
    document.getElementById('yourId').value = JSON.stringify(data)
  })

  document.getElementById('connect').addEventListener('click', function () {
      console.log("connect button clicked")
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
  })

  document.getElementById('send').addEventListener('click', function () {
    console.log("send button")  
    var yourMessage = document.getElementById('yourMessage').value
    peer.send(yourMessage)
  })

  peer.on('data', function (data) {
      console.log("data")
    document.getElementById('messages').textContent += data + '\n'
  })

  peer.on('stream', function (stream) {
      console.log("stream")
    var video = document.createElement('video')
    document.body.appendChild(video)

    video.srcObject = stream
    video.play()
  })
})