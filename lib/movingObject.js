(function () {

  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos || Asteroids.Util.randomVec(10);
    this.vel = options.val || Asteroids.Util.randomVec(10);
    this.radius = options.radius || 0;
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
    this.pos[0] %= 800;
    this.pos[1] += this.vel[1];
    this.pos[1] %= 500;           //UNHARDCODE THIS LATER!!
  };

})();