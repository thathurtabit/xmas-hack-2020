import 'phaser';
import { Constants } from '../utils/constants';

export class ItemCounter extends Phaser.GameObjects.GameObject {
  itemCounter: Phaser.GameObjects.Text;
  totalItemsToCollect = Constants.totalItemsToCollectToWin;
  currentItemTotal = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, 'text');
    this.itemCounter = scene.add
      .text(30, 0, `Items: ${this.currentItemTotal} / ${this.totalItemsToCollect}`, {
        font: '14px Poppins',
        fill: '#000000',
        padding: { x: 3, y: 5 },
        backgroundColor: '#fff',
      })
      .setScrollFactor(0)
      .setDepth(20);

    this.itemCounter.x = x;
    this.itemCounter.y = y;

    scene.add.existing(this.itemCounter);
  }

  public increment(amount: number): void {
    this.currentItemTotal += amount;
    this.itemCounter.text = `Items: ${this.currentItemTotal} / ${this.totalItemsToCollect}`;
  }
}
