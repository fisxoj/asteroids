(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options = options || {};
    this.COLOR = "#AA4400";
    this.RADIUS = Math.random() * 50;
    options.color = options.color || this.COLOR;
    options.radius = options.radius || this.RADIUS;

    options.vel = options.vel || Asteroids.Util.randomVec(10, true);
    options.pos = options.pos || Asteroids.Util.randomVec(500, true);

    options.avel = options.avel || Math.random()/10;
    options.angle = options.angle || Math.random() * 2 * Math.PI;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroid);

  Asteroid.image = new Image();
  Asteroid.image.src = "lib/yarn.png";

  Asteroid.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1])
    ctx.rotate(this.angle);
    ctx.drawImage(Asteroid.image,
           - this.radius,  - this.radius,
          this.radius * 2, this.radius * 2);
    ctx.restore();
  };
})();