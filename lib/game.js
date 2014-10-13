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
    this.bullets = [];
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

    this.bullets.forEach(function (bullet) {
      bullet.draw(ctx);
    })

    this.ship.draw(ctx);
  };

  Game.prototype.moveObjects = function () {
    that = this;
    this.allObjects().forEach ( function(obj) {
      obj.move();
      that.wrap(obj);
    });
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
    var removedObjs = [];

    var ship = this.ship;
    var bullets = this.bullets;

    this.allAsteroids.forEach(function (asteroid) {
      if (ship.isCollidedWith(asteroid)) {
        ship.relocate();
      }

      bullets.forEach(function (bullet) {
        if (bullet.isCollidedWith(asteroid)) {
          removedObjs.push(bullet, asteroid);
        }
      });

    });

    var that = this;
    removedObjs.forEach(function (obj) {
      that.remove(obj);
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (movingObject) {
    var array;
    var index;

    if (movingObject instanceof Asteroids.Bullet) {
      array = this.bullets;
    } else if (movingObject instanceof Asteroids.Asteroid) {
      array = this.allAsteroids;
    }

    index = array.indexOf(movingObject);

    var firstPart = array.slice(0, index);
    var secondPart = array.slice(index + 1);

    if (movingObject instanceof Asteroids.Bullet) {
      this.bullets = firstPart.concat(secondPart);
    } else if (movingObject instanceof Asteroids.Asteroid) {
      this.allAsteroids = firstPart.concat(secondPart);
    }
  };

  Game.prototype.allObjects = function () {
    return this.allAsteroids.concat([this.ship]).concat(this.bullets);
  };

  Game.prototype.add = function (movingObject) {
    if (movingObject instanceof Asteroids.Bullet) {
      this.bullets.push(movingObject);
    } else if (movingObject instanceof Asteroids.Asteroid) {
      this.allAsteroids.push(movingObject);
    } else {
      throw "Can't add this object";
    }
  };

  Game.prototype.addBullet = function () {
    var options = { pos: this.ship.pos.slice(),
                    vel: this.ship.vel.slice() };

    var bullet = new Asteroids.Bullet(options);

    this.add(bullet);
  };
})();