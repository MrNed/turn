var BasicGame = {};

BasicGame.Boot = function() {

};

BasicGame.Boot.prototype = {

  init: function() {

    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;

  },

  preload: function() {

    this.load.atlas('preloader', 'res/preloader.png', 'res/preloader.json');

  },

  create: function() {

    this.stage.backgroundColor = '#F5F5F5';

    this.state.start('Preload');

  }

};
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
BasicGame.Menu = function() {

};

BasicGame.Menu.prototype = {

  init: function(config) {
    if (!config) {
      config = {

      };
    }

    this.config = config;
  },

  create: function() {

  },

  update: function() {

  },

  startClick: function() {

    this.state.start('Game', true, false, this.config);

  },

};
BasicGame.Preload = function() {

  this.preloadBar = null;
  this.ready = false;

};

BasicGame.Preload.prototype = {

  preload: function() {

    this.preloadBar = this.add.sprite(game.width * 0.5, game.height * 0.5, 'preloader', 0);
    this.preloadBar.anchor.set(0.5, 0.5);

    var preloaderFrames = [],
        i = 0;

    for (i; i < 33; i++) {
      preloaderFrames[i] = i;
    }

    this.preloadBar.animations.add('loading', preloaderFrames, 60, true);
    this.preloadBar.play('loading');

    this.load.image('ball', 'res/ball.png');
    this.load.image('ring-1', 'res/ring-1.png');

    this.load.physics('physicsData', 'res/sprites.json');

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

  },

  create: function() {

    this.preloadBar.cropEnabled = false;

  },

  update: function() {

    if (this.ready) {
      // this.state.start('Menu');
      this.state.start('Game');
    }

  },

  onLoadComplete: function() {

    this.ready = true;

  }

};
var game = new Phaser.Game(300, 420, Phaser.Canvas, 'game_cont');

game.state.add('Boot', BasicGame.Boot);
game.state.add('Preload', BasicGame.Preload);
game.state.add('Menu', BasicGame.Menu);
game.state.add('Game', BasicGame.Game);

game.state.start('Boot');