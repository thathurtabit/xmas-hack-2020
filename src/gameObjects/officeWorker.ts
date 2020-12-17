import { Constants } from './../utils/constants';
import 'phaser';
import { Player } from './player';
import { Game, Scene } from 'phaser';

export class OfficeWorker extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  key: string;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    this.key = params.key;
  }

  init(): void {
    // physics
    this.scene.physics.world.enable(this);

    this.body
      .setSize(Constants.officeNPCWidth, Constants.officeNPCHeight)
      .setOffset(Constants.officeNPCOffsetX, Constants.officeNPCOffsetY);

    this.setScale(Constants.officeNPCDrawScale, Constants.officeNPCDrawScale);

    this.scene.add.existing(this);

    this.body.setVelocity(100, 200);
    this.body.setBounce(1, 1);
    this.body.setCollideWorldBounds(true);

    this.body.velocity.normalize().scale(Constants.playerSpeed);
  }

  stop() {
    this.body.setVelocity(0)
  }
}
