import 'phaser';
import { Constants } from '../utils/constants';

export class HealthBar extends Phaser.GameObjects.GameObject {
  healthBar: Phaser.GameObjects.Graphics;
  healthBarX: number;
  healthBarY: number;
  healthBarValue: number;
  healthBarOffset: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, 'graphic');
    this.healthBar = new Phaser.GameObjects.Graphics(scene).setScrollFactor(0).setDepth(20);

    this.healthBarX = x;
    this.healthBarY = y;
    this.healthBarValue = 100;
    this.healthBarOffset = 76 / 100;

    this.drawHealthBar();

    scene.add.existing(this.healthBar);
  }

  public decrease(amount: number): boolean {
    this.healthBarValue -= amount;

    if (this.healthBarValue < 0) {
      this.healthBarValue = 0;
    }

    this.drawHealthBar();

    return this.healthBarValue === 0;
  }

  public increase(amount: number): boolean {
    this.healthBarValue += amount;

    if (this.healthBarValue > Constants.healthBarMax) {
      this.healthBarValue = Constants.healthBarMax;
    }

    this.drawHealthBar();

    return this.healthBarValue === Constants.healthBarMax;
  }

  private drawHealthBar(): void {
    this.healthBar.clear();

    //  BG
    this.healthBar.fillStyle(0x000000);
    this.healthBar.fillRect(this.healthBarX, this.healthBarY, 80, 16);

    //  Health
    this.healthBar.fillStyle(0xffffff);
    this.healthBar.fillRect(this.healthBarX + 2, this.healthBarY + 2, 76, 12);

    if (this.healthBarValue < 30) {
      this.healthBar.fillStyle(0xff0000);
    } else {
      this.healthBar.fillStyle(0x00ff00);
    }

    const healthBarWidth = Math.floor(this.healthBarOffset * this.healthBarValue);

    this.healthBar.fillRect(this.healthBarX + 2, this.healthBarY + 2, healthBarWidth, 12);
  }
}
