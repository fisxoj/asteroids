(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options = options || {};
    this.COLOR = "#AA4400";
    this.RADIUS = Math.random() * 5;
    options.color = options.color || this.COLOR;
    options.radius = options.radius || this.RADIUS;

    options.vel = options.vel || Asteroids.Util.randomVec(10);
    options.pos = options.pos || Asteroids.Util.randomVec(500);

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroid);
})();