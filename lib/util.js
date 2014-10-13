(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function (parent, child) {
    var Surrogate = function () {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  Util.randomVec = function (scaleFactor, negative) {
    var sign = 1
    if (negative) {
      if (Math.random() < 0.5) {
        sign = -1;
      } else {
        sign = 1;
      }
    };


    return [Math.random() * scaleFactor * sign,
            Math.random() * scaleFactor * sign];
  };

  Util.distance = function(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  };
})();

