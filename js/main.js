window.addEventListener('orientationchange', function () {

  if (window.innerHeight > window.innerWidth) {
    document.getElementsByTagName('body').style.transform = "rotate(90deg)";
  }

});

var game = new Phaser.Game(300, 420, Phaser.Canvas, 'game_cont');

game.state.add('Boot', BasicGame.Boot);
game.state.add('Preload', BasicGame.Preload);
game.state.add('Menu', BasicGame.Menu);
game.state.add('Game', BasicGame.Game);

game.state.start('Boot');