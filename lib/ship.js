(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(options) {
    options = options || {};
    options.color = options.color || "#AAFF00";
    options.radius = options.radius || 20;
    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroids.MovingObject, Ship);


  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Util.randomVec(500);
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };
})();