var five = require("../lib/johnny-five.js");
var board = new five.Board();
var firebase = require("firebase");
var firebaseRef = new firebase("https://beelab.firebaseio.com/test");
board.on("ready", function () {
  var relay1 = new five.Relay(9);
  var relay2 = new five.Relay(10);
  relay1.on();
  relay2.on();
  this.repl.inject({
    relay: relay1,
    relay: relay2
  });
  var light = firebaseRef.child("light");
  light.on("value", function (snapshot) {
    console.log(snapshot.val());
    if (snapshot.val().one == "1 on") {
      relay1.off();
    }
    if (snapshot.val().one == "1 off") {
      relay1.on();
    }
    if (snapshot.val().two == "2 on") {
      relay2.off();
    }
    if (snapshot.val().two == "2 off") {
      relay2.on();
    }
  });
});