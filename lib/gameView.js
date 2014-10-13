(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    that = this;
    setInterval( function () {
      that.ctx.clearRect(0,0,800,500);
      that.game.moveObjects();
      that.game.draw(that.ctx);
    }, 20);
  };

})();