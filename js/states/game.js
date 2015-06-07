BasicGame.Game = function(game) {

  this.ball = null;

};

BasicGame.Game.prototype = {

  init: function (config) {

    this.config = config;

    game.renderer.renderSession.roundPixels = true;
    this.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.gravity.y = 300;

  },

  create: function() {

    var spriteMaterial = this.physics.p2.createMaterial('spriteMaterial');
    var worldMaterial = this.physics.p2.createMaterial('worldMaterial');
    var contactMaterial = this.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { restitution: 1.0 });

    this.physics.p2.setWorldMaterial(worldMaterial);


    this.ball = this.add.sprite(game.width * 0.5, game.height * 0.5, 'ball');
    this.ball.anchor.setTo(0.5);

    this.physics.p2.enable(this.ball);
    this.ball.body.setCircle(16);
    this.ball.restitution = 1.0;

    this.ball.body.setMaterial(spriteMaterial);

    var self = this;

    gyro.frequency = 10;
    gyro.startTracking(function(o) {
      self.ball.body.velocity.y += o.beta / 20;
      self.ball.body.velocity.x += o.gamma / 20;
    });

  },

  update: function() {

  },

  shutdown: function() {

  },

};