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
    that = this;
    this.allAsteroids.forEach ( function(asteroid) {
      asteroid.move();
      that.wrap(asteroid.pos);
    });
  };

  Game.prototype.wrap = function (pos) {
    if (pos[0] < 0) {
      pos[0] %= this.DIM_X;
      pos[0] += this.DIM_X;
    }
    if (pos[1] < 0) {
      pos[1] %= this.DIM_X;
      pos[1] += this.DIM_X;
    }
    pos[0] %= this.DIM_X;
    pos[1] %= this.DIM_Y;
  };

  Game.prototype.checkCollisions = function () {
    total = this.allAsteroids.length;
    var removedIdxs = [];

    for (var i = 0; i < total; i++) {
      for (var j = 0; j < i; j++) {
        if (this.allAsteroids[i].isCollidedWith(this.allAsteroids[j])) {
          if(removedIdxs.indexOf(i) === -1) {
            removedIdxs.push(i);
          }
          if(removedIdxs.indexOf(j) === -1) {
            removedIdxs.push(j);
          }
        }
      };
    };

    var that = this;
    removedIdxs.sort().reverse();     // should be unique
    removedIdxs.forEach( function(idx) {
      that.remove(idx);
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroidIdx) {
    var firstPart = this.allAsteroids.slice(0, asteroidIdx);
    var secondPart = this.allAsteroids.slice(asteroidIdx + 1);

    this.allAsteroids = firstPart.concat(secondPart);
  };

})();