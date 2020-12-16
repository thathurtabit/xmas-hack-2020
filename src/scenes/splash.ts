import { Constants } from '../utils/constants';
import 'phaser';

export default class Splash extends Phaser.Scene {
    private logo = {
        name: 'logo',
        width: 412,
        height: 93,
        centerX: 206,
        centerY: 46,
    };

    constructor() {
          super('demo');
    }

    preload() {
        this.load.image(this.logo.name, 'assets/phaser3-logo.png');
    }

    create() {
        const logo = this.add.image(Constants.windowCenterX, Constants.windowCenterY, this.logo.name);

        this.tweens.add({
            targets: logo,
            y: Constants.windowCenterY + 100,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1,
        });
    }


}
