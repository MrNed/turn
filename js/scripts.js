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

    game.renderer.roundPixels = true;
    this.physics.startSystem(Phaser.Physics.P2JS);

  },

  create: function() {

    var spriteMaterial = this.physics.p2.createMaterial('spriteMaterial');
    var worldMaterial = this.physics.p2.createMaterial('worldMaterial');
    var contactMaterial = this.physics.p2.createContactMaterial(spriteMaterial, worldMaterial, { restitution: 0.25, friction: 0.3 });

    this.physics.p2.setWorldMaterial(worldMaterial);

    if (!this.config.empty) {
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
    }

    this.ball = this.add.sprite(game.width * 0.5, game.height * 0.5, 'ball');
    this.ball.anchor.setTo(0.5);
    this.physics.p2.enable(this.ball);
    this.ball.body.setCircle(8);
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
BasicGame.Menu = function() {

};

BasicGame.Menu.prototype = {

  init: function(config) {
    if (!config) {
      config = {
        empty: false
      };
    }

    this.config = config;
  },

  create: function() {

    this.start = this.add.button(game.width * 0.5, game.height * 0.5 - 50, 'start', this.startClick, this);
    this.start.anchor.set(0.5);
    this.start.input.useHandCursor = true;

    this.startEmpty = this.add.button(game.width * 0.5, game.height * 0.5 + 50, 'start-empty', this.startClickEmpty, this);
    this.startEmpty.anchor.set(0.5);
    this.startEmpty.input.useHandCursor = true;

  },

  update: function() {

  },

  startClick: function() {

    this.state.start('Game', true, false, this.config);

  },

  startClickEmpty: function() {

    this.config.empty = true;
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
    this.load.image('ring-2', 'res/ring-2.png');
    this.load.image('ring-3', 'res/ring-3.png');
    this.load.image('ring-4', 'res/ring-4.png');
    this.load.image('ring-5', 'res/ring-5.png');

    this.load.image('start', 'res/start.png');
    this.load.image('start-empty', 'res/start-empty.png');

    this.load.physics('physicsData', 'res/sprites.json');

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

  },

  create: function() {

    this.preloadBar.cropEnabled = false;

  },

  update: function() {

    if (this.ready) {
      this.state.start('Menu');
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