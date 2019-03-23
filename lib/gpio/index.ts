import rpio from 'rpio';
import {detectPi} from './detect-rpi';
import {pipe, any, map} from 'ramda';

const DOOR_PIN = 12 //GPIO = 18
const EXTERNAL_PINS = [11,13,15] // GPIO 17,27,22

const init = ():void => {
  if (detectPi()) {
    rpio.open(DOOR_PIN, rpio.OUTPUT, rpio.LOW)

    EXTERNAL_PINS.forEach(function(pin) {
      rpio.open(pin, rpio.INPUT)
      console.log('setting up pin ' + pin);
    });
  } else {
    console.log('gpio.init(): not running on RaspberryPi')
  }
}

const readPin = (pin:number):number => {
  const val = rpio.read(pin);
  console.log("Pin " + pin + " has value " + val);
  return val;
}

const pendingSensorRequest = ():boolean => {
  const readPins = map(readPin)
  const hasTrue = any(x => !!x)
  const transform = pipe(readPins,hasTrue)
  return transform(EXTERNAL_PINS)
}

const openDoor = ():void => {
  if (detectPi()) {
    rpio.write(DOOR_PIN, rpio.HIGH)
  } else {
    console.log('gpio.openDoor(): not running on RaspberryPi')
  }
}

const closeDoor = ():void => {
  if (detectPi()) {
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
