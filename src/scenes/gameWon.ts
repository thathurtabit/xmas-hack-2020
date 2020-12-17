import 'phaser';

export default class GameWon extends Phaser.Scene {
  private logo = {
    name: 'logo',
  };

  constructor() {
    super('gameWon');
  }

  preload() {
    this.load.image(this.logo.name, 'assets/images/autotrader.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#313c53');
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.add.image(screenCenterX, 60, this.logo.name).setScale(0.5);

    this.add
      .text(screenCenterX, screenCenterY - 30, `Congratulations! You've managed to find\n all 10 hidden items whilst avoiding covid!`, {
        font: '30px Poppins',
        fill: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.add
      .text(screenCenterX, screenCenterY + 30, `You win!`, {
        font: '40px Poppins',
        fill: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.add
      .text(screenCenterX, 500, `Play again`, {
        font: '40px Poppins',
        fill: '#000000',
        padding: { x: 20, y: 10 },
        backgroundColor: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.input.on(
      'pointerup',
      () => {
        const Game = this.scene.get('game');
        Game.scene.restart();
        this.scene.start('game');
      },
      this,
    );
  }
}
