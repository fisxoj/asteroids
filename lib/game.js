(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 500;
    this.START_ASTEROID_COUNT = 10;
    this.addAsteroids(this.START_ASTEROID_COUNT);
  };

  Game.prototype.addAsteroids = function (count) {
    this.allAsteroids = [];
    for (var i = 0; i < count; i++) {
      this.allAsteroids.push( new Asteroids.Asteroid({}) );
    };
  };

  Game.prototype.draw = function (ctx) {
    this.allAsteroids.forEach( function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allAsteroids.forEach ( function(asteroid) {
      asteroid.move();
    });
  };

})();