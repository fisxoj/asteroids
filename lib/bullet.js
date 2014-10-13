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

  Bullet.image = new Image();
  Bullet.image.src = "lib/smallpaw.png";

  Bullet.prototype.draw = function (ctx) {
    ctx.drawImage(Bullet.image,
          this.pos[0] - this.radius, this.pos[1] - this.radius,
          this.radius * 2, this.radius * 2);
  };

})();