import {Constants} from "../utils/constants";
import "phaser";

export default class Splash extends Phaser.Scene {
  private starField = {
    name: "stars",
    width: 800,
    height: 600,
    centerX: 400,
    centerY: 300,
  };

  private logo = {
    name: "logo",
    width: 412,
    height: 93,
    centerX: 206,
    centerY: 46
  };

  constructor() {
    super("demo");
  }

  preload() {
    this.load.image(this.logo.name, "assets/phaser3-logo.png");
    this.load.glsl(this.starField.name, "assets/starfields.glsl.js");
  }

  create() {
    this.add
      .shader(
        "RGB Shift Field",
        Constants.windowCenterX - this.starField.centerX,
        Constants.windowCenterY - this.starField.centerY,
        this.starField.width,
        this.starField.height
      )
      .setOrigin(0);

    const logo = this.add.image(
      Constants.windowCenterX,
      Constants.windowCenterY,
      this.logo.name
    );

    this.tweens.add({
      targets: logo,
      y: Constants.windowCenterY + 100,
      duration: 1500,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }
}
