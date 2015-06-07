BasicGame.Game = function(game) {

  this.ball = null;

};

BasicGame.Game.prototype = {

  init: function (config) {

    this.config = config;

    game.renderer.renderSession.roundPixels = true;
    this.physics.startSystem(Phaser.Physics.P2JS);

  },

  create: function() {

    var spriteMaterial = this.physics.p2.createMaterial('spriteMaterial');
    var worldMaterial = this.physics.p2.createMaterial('worldMaterial');
    var contactMaterial = this.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { restitution: 0.25, friction: 0.3 });

    this.physics.p2.setWorldMaterial(worldMaterial);

    this.ring1 = this.add.sprite(game.width * 0.5, game.height * 0.5, 'ring-1');
    this.ring1.anchor.setTo(0.5);
    this.physics.p2.enable(this.ring1);
    this.ring1.body.static = true;
    this.ring1.body.clearShapes();
    this.ring1.body.loadPolygon('physicsData', 'ring-1');
    this.ring1.body.setMaterial(worldMaterial);

    this.ring2 = this.add.sprite(game.width * 0.5, game.height * 0.5, 'ring-2');
    this.ring2.anchor.setTo(0.5);
    this.physics.p2.enable(this.ring2);
    this.ring2.body.static = true;
    this.ring2.body.clearShapes();
    this.ring2.body.loadPolygon('physicsData', 'ring-2');
    this.ring2.body.setMaterial(worldMaterial);
    this.ring2.body.angle = 90;

    this.ring3 = this.add.sprite(game.width * 0.5, game.height * 0.5, 'ring-3');
    this.ring3.anchor.setTo(0.5);
    this.physics.p2.enable(this.ring3);
    this.ring3.body.static = true;
    this.ring3.body.clearShapes();
    this.ring3.body.loadPolygon('physicsData', 'ring-3');
    this.ring3.body.setMaterial(worldMaterial);
    this.ring3.body.angle = -90;

    this.ring4 = this.add.sprite(game.width * 0.5, game.height * 0.5, 'ring-4');
    this.ring4.anchor.setTo(0.5);
    this.physics.p2.enable(this.ring4);
    this.ring4.body.static = true;
    this.ring4.body.clearShapes();
    this.ring4.body.loadPolygon('physicsData', 'ring-4');
    this.ring4.body.setMaterial(worldMaterial);
    this.ring4.body.angle = 360;

    this.ring5 = this.add.sprite(game.width * 0.5, game.height * 0.5, 'ring-5');
    this.ring5.anchor.setTo(0.5);
    this.physics.p2.enable(this.ring5);
    this.ring5.body.static = true;
    this.ring5.body.clearShapes();
    this.ring5.body.loadPolygon('physicsData', 'ring-5');
    this.ring5.body.setMaterial(worldMaterial);
    this.ring5.body.angle = 180;

    this.ball = this.add.sprite(game.width * 0.5, game.height * 0.5, 'ball');
    this.ball.anchor.setTo(0.5);
    this.physics.p2.enable(this.ball);
    this.ball.body.setCircle(16);
    this.ball.body.setMaterial(spriteMaterial);

    var self = this;

    gyro.frequency = 10;
    gyro.startTracking(function(o) {
      self.ball.body.velocity.y += o.beta / 10;
      self.ball.body.velocity.x += o.gamma / 10;
    });

  },

  update: function() {

  },

  shutdown: function() {

  },

};