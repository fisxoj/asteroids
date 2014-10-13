(function() {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(options) {
    options = options || {};
    options.color = options.color || "#AAFF00";
    options.radius = options.radius || 50;
    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroids.MovingObject, Ship);


  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Util.randomVec(500);
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse * Math.cos(this.angle);
    this.vel[1] += impulse * Math.sin(this.angle);
    //
    // this.vel[0] += impulse[0];
    // this.vel[1] += impulse[1];
  };

  Ship.prototype.turn = function (dangle) {
    this.avel += dangle;
  };

  Ship.image = new Image();
  Ship.image.src = "lib/cat.png";

  Ship.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1])
    ctx.rotate(this.angle);
    ctx.drawImage(Ship.image,
           - this.radius,  -this.radius,
          this.radius * 2, this.radius * 2);
    ctx.restore();
  };

})();