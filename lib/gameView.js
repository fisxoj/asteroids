(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.game = new Asteroids.Game();
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = 'lib/rug.jpg';

    this.bindKeyHandlers();
    var that = this;
    setInterval( function () {
      that.ctx.drawImage(img, 0, 0);
      //that.ctx.clearRect(0,0,img.width,img.height);
      that.game.step();
      that.game.draw(that.ctx);
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    key('up', function() { ship.power(1); });
    key('down', function() { ship.power(-1); });
    key('right', function() { ship.turn(0.05); });
    key('left', function() { ship.turn(-0.05); });

    var game = this.game;
    key('space', function() { game.addBullet(); });
  };

})();