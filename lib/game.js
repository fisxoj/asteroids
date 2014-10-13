(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 500;
    this.START_ASTEROID_COUNT = 10;
    this.addAsteroids(this.START_ASTEROID_COUNT);
    this.ship = new Asteroids.Ship();
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
    this.ship.draw(ctx);
  };

  Game.prototype.moveObjects = function () {
    that = this;
    this.allAsteroids.forEach ( function(asteroid) {
      asteroid.move();
      that.wrap(asteroid);
    });
    this.ship.move();
    this.wrap(this.ship);
  };

  Game.prototype.wrap = function (movingObject) {
    var width = this.DIM_X + 2 * movingObject.radius;
    var height = this.DIM_Y + 2 * movingObject.radius;
    if (movingObject.pos[0] < -movingObject.radius) {
      movingObject.pos[0] %= width;
      movingObject.pos[0] += width;
    }
    if (movingObject.pos[1] < -movingObject.radius) {
      movingObject.pos[1] %= height;
      movingObject.pos[1] += height;
    }
    movingObject.pos[0] %= width;
    movingObject.pos[1] %= height;
  };

  Game.prototype.checkCollisions = function () {
    // total = this.allAsteroids.length;
    // var removedIdxs = [];
    //
    // for (var i = 0; i < total; i++) {
    //   for (var j = 0; j < i; j++) {
    //     if (this.allAsteroids[i].isCollidedWith(this.allAsteroids[j])) {
    //       if(removedIdxs.indexOf(i) === -1) {
    //         removedIdxs.push(i);
    //       }
    //       if(removedIdxs.indexOf(j) === -1) {
    //         removedIdxs.push(j);
    //       }
    //     }
    //   };
    // };
    //
    // var that = this;
    // removedIdxs.sort().reverse();     // should be unique
    // removedIdxs.forEach( function(idx) {
    //   that.remove(idx);
    // });
    var ship = this.ship;

    this.allAsteroids.forEach(function (asteroid) {
      if (ship.isCollidedWith(asteroid)) {
        ship.relocate();
      }
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

  Game.prototype.allObjects = function () {
    return this.allAsteroids.concat([this.ship]);
  };

})();