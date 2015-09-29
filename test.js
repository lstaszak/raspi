var five = require("../lib/johnny-five.js");
var board = new five.Board();
var firebase = require("firebase");
var firebaseRef = new firebase("https://beelab.firebaseio.com/test");
board.on("ready", function () {
  var sensor = new five.Sensor.Digital(2);
  sensor.on("change", function () {
    console.log(this.value);
  });
  var motion = new five.Motion(7);
  motion.on("calibrated", function () {
    console.log("calibrated");
  });
  motion.on("motionstart", function () {
    console.log("motionstart");
  });
  motion.on("motionend", function () {
    console.log("motionend");
  });
  motion.on("change", function () {
    console.log("change");
  });
  motion.on("data", function (data) {
    console.log("data");
    console.log(data);
  });
});