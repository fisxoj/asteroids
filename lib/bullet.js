(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(options) {
    options = options || {};
    Asteroids.MovingObject.call(this, options);
    this.isWrappable = false;
  };

  Asteroids.Util.inherits(Asteroids.MovingObject, Bullet);

})();