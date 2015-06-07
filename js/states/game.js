BasicGame.Game = function(game) {

};

BasicGame.Game.prototype = {

  init: function (config) {

    this.config = config;

    game.renderer.renderSession.roundPixels = true;
    this.physics.startSystem(Phaser.Physics.ARCADE);

  },

  create: function() {

    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize(true);

    player = this.add.sprite(160,240,"player");
    player.anchor.setTo(0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.bounce.set(0.8);
    gyro.frequency = 10;
    gyro.startTracking(function(o) {
      player.body.velocity.y += o.beta/20;
      player.body.velocity.x += o.gamma/20;
    });

  },

  update: function() {

  },

  shutdown: function() {

  },

};