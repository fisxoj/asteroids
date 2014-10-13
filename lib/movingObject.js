(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos || Asteroids.Util.randomVec(10);
    this.vel = options.vel || Asteroids.Util.randomVec(10, true);
    this.radius = options.radius || 5;
    this.color = options.color || "#000000";
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc (
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.closePath();
    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var radSum = this.radius + otherObject.radius;

    return radSum > Asteroids.Util.distance(this.pos, otherObject.pos);
  };

})();