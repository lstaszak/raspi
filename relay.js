var five = require("../lib/johnny-five.js");
var board = new five.Board();
var firebase = require("firebase");
var firebaseRef = new firebase("https://beelab.firebaseio.com/test");
board.on("ready", function () {
  var light = firebaseRef.child("light");
  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 7
  });
  var relay1 = new five.Relay(9);
  var relay2 = new five.Relay(10);
  proximity.on("data", function () {
    if (this.cm > 200) {
      light.update({"one": "1 off", "two": "2 off"});
    } else if (this.cm > 100) {
      light.update({"one": "1 on", "two": "2 on"});
    }
  });
  relay1.on();
  relay2.on();
  this.repl.inject({
    relay: relay1,
    relay: relay2
  });
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