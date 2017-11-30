const rpio = require('rpio')
const isPi = require('detect-rpi')

const PIN = 12 //GPIO = 18

const init = () => {
  if (isPi()) {
    rpio.open(PIN, rpio.OUTPUT, rpio.LOW)
  } else {
    console.log('gpio.init(): not running on RaspberryPi')
  }
}

const openDoor = () => {
  if (isPi()) {
    rpio.write(PIN, rpio.HIGH)
  } else {
    console.log('gpio.openDoor(): not running on RaspberryPi')
  }
}

const closeDoor = () => {
  if (isPi()) {
    rpio.write(PIN, rpio.LOW)
  } else {
    console.log('gpio.closeDoor(): not running on RaspberryPi')
  }
}

module.exports = {
  init,
  openDoor,
  closeDoor
}
