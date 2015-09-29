var five = require("../lib/johnny-five.js");
var board = new five.Board();
var firebase = require("firebase");
var firebaseRef = new firebase("https://beelab.firebaseio.com/test");
board.on("ready", function () {
  var sensor = new five.Sensor.Digital(7);
  sensor.on("change", function () {
    console.log(this.value);
  });
});