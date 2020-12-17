import { Constants } from './../utils/constants';
import 'phaser';

export default class Splash extends Phaser.Scene {
  private logo = {
    name: 'logo',
    image: undefined,
  };
  private covid = {
    name: 'covid',
    image: undefined,
  };
  constructor() {
    super('splash');
  }

  preload() {
    this.load.image(this.logo.name, 'assets/images/autotrader.png');
    this.load.image(this.covid.name, 'assets/images/covid.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#313c53');
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.logo.image = this.add.image(screenCenterX, 60, this.logo.name).setScale(0.5);

    this.covid.image = this.add.image(screenCenterX, 200, this.covid.name).setScale(0.5);

    this.add
      .text(screenCenterX, screenCenterY + 30, `Collect ${Constants.totalItemsToCollectToWin} special items.`, {
        font: '30px Poppins',
        fill: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.add
      .text(screenCenterX, screenCenterY + 80, `Stay Covid-Free.`, {
        font: '40px Poppins',
        fill: '#fff',
      })
      .setOrigin(0.5)
      .setAlign('center');

    this.add
      .text(screenCenterX, 500, `Play`, {
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
        this.scene.start('game');
      },
      this,
    );
  }

  update(): void {
    this.covid.image.angle += 0.5;
  }
}
