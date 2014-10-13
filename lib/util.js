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

  Util.randomVec = function (scaleFactor) {
    return [Math.random() * scaleFactor, Math.random() * scaleFactor];
  };
})();

