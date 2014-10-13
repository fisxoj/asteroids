(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var that = this;
    setInterval( function () {
      that.ctx.clearRect(0,0,800,500);
      that.game.step();
      that.game.draw(that.ctx);
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function() { ship.power([0,-1]); });
    key('down', function() { ship.power([0,1]); });
    key('right', function() { ship.power([1,0]); });
    key('left', function() { ship.power([-1,0]); });

    var game = this.game;
    key('space', function() { game.addBullet(); });
  };

})();