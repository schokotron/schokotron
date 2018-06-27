const rpio = require('rpio')
const isPi = require('detect-rpi')
const {pipe, any, map} = require('ramda')

const DOOR_PIN = 12 //GPIO = 18
const EXTERNAL_PINS = [11,13,15] // GPIO 17,27,22

const init = () => {
  if (isPi()) {
    rpio.open(DOOR_PIN, rpio.OUTPUT, rpio.LOW)

    EXTERNAL_PINS.forEach(function(pin) {
      rpio.open(pin, rpio.INPUT)
      console.log('setting up pin ' + pin);
    });
  } else {
    console.log('gpio.init(): not running on RaspberryPi')
  }
}

const readPin = (pin) => {
  const val = rpio.read(pin);
  console.log("Pin " + pin + " has value " + val);
  return val;
}

const pendingSensorRequest = () => {
  const readPins = map(readPin)
  const hasTrue = any(x => !!x)
  transform = pipe(readPins,hasTrue)
  return transform(EXTERNAL_PINS)
}

const openDoor = () => {
  if (isPi()) {
    rpio.write(DOOR_PIN, rpio.HIGH)
  } else {
    console.log('gpio.openDoor(): not running on RaspberryPi')
  }
}

const closeDoor = () => {
  if (isPi()) {
    rpio.write(DOOR_PIN, rpio.LOW)
  } else {
    console.log('gpio.closeDoor(): not running on RaspberryPi')
  }
}

module.exports = {
  init,
  openDoor,
  closeDoor,
  pendingSensorRequest,
}
