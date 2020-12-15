import 'phaser';
import Game from './scenes/game';
//import Splash from './scenes/splash';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#222',
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 }
      },
    },
    debug: true,
    scene: Game
};

const game = new Phaser.Game(config);
