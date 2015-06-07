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