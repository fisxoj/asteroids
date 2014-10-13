(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.DIM_X = 500;
    this.DIM_Y = 721;
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
    this.allObjects().forEach( function (obj) {
      obj.draw(ctx);
    });
    //
    // this.bullets.forEach(function (bullet) {
    //   bullet.draw(ctx);
    // })
    //
    // this.ship.draw(ctx);
  };

  Game.prototype.moveObjects = function () {
    var that = this;
    this.allObjects().forEach ( function(obj) {
      obj.move();

      if (that.isOutOfBounds(obj)) {
        if (obj.isWrappable) {
         that.wrap(obj);
       } else {
         that.remove(obj);
       }
      }
    });
  };

  Game.prototype.isOutOfBounds = function (obj) {
    var tooLow = obj.pos[0] < -obj.radius || obj.pos[1] < -obj.radius;
    var tooHighX = obj.pos[0] > this.DIM_X + obj.radius;
    var tooHighY = obj.pos[1] > this.DIM_Y + obj.radius;

    return tooLow || tooHighX || tooHighY;
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
    if (index === -1) return;

    array.splice(index, 1);
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
                    vel: [ 2*Math.cos(this.ship.angle),
                           2*Math.sin(this.ship.angle) ] }; //fix later

    var bullet = new Asteroids.Bullet(options);

    this.add(bullet);
  };
})();