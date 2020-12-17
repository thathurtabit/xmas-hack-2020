import { Constants } from './../utils/constants';
import 'phaser';
import { Player } from './player';
import { Game, Scene } from 'phaser';

export class OfficeWorker extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  key: string;
  velocityX: number;
  velocityY: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    this.key = params.key;

    this.velocityX = Math.floor(Math.random() * 200) + 50;
    this.velocityY = Math.floor(Math.random() * 200) + 50;
  }

  init(): void {
    this.scene.physics.world.enable(this);

    this.body
      .setSize(Constants.officeNPCWidth, Constants.officeNPCHeight)
      .setOffset(Constants.officeNPCOffsetX, Constants.officeNPCOffsetY);

    this.setScale(Constants.officeNPCDrawScale, Constants.officeNPCDrawScale);

    this.scene.add.existing(this);

    this.start();
    this.body.setBounce(1, 1);
    this.body.setCollideWorldBounds(true);
  }

  pause(duration): void {
    this.body.setVelocity(0, 0);
    this.scene.time.delayedCall(3000, this.start, null, this);
  }

  start(): void {
    this.body.setVelocity(this.velocityX, this.velocityY);
    this.body.velocity.normalize().scale(Constants.playerSpeed);
  }

  isPaused(): boolean {
    return this.body.velocity.x === 0 && this.body.velocity.y === 0;
  }

}
