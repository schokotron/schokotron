const rpio = require('rpio')

const PIN = 12 //GPIO = 18

const init = () => {
  rpio.open(PIN, rpio.OUTPUT, rpio.LOW)
}

const openDoor = () => {
  rpio.write(PIN, rpio.HIGH)
}

const closeDoor = () => {
  rpio.write(PIN, rpio.LOW)
}
