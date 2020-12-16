import 'phaser';
import Game from './scenes/game';
import GameOver from './scenes/gameOver';
import Splash from './scenes/splash';
//import Splash from './scenes/splash';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#e4e7d7',
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  debug: true,
  scene: [Splash, Game, GameOver],
};

const game = new Phaser.Game(config);
