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