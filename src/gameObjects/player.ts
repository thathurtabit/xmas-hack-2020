import { Constants } from './../utils/constants';
import 'phaser';

export class Player extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;
  playerSpeed: number;
  key: string;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.frame);
    this.playerSpeed = Constants.playerSpeed;
    this.key = params.key;
  }

  init(): void {
    // physics
    this.scene.physics.world.enable(this);

    this.body
      .setSize(Constants.playerWidth, Constants.playerHeight)
      .setOffset(Constants.playerOffsetX, Constants.playerOffsetY);

    this.displayOriginX = 0.5;
    this.displayOriginY = 0.5;

    this.setScale(Constants.playerDrawScale, Constants.playerDrawScale);
    this.body.setCollideWorldBounds(true);
    this.scene.add.existing(this);
  }

  speedUp(): void {
    this.playerSpeed = this.playerSpeed += Constants.playerSpeedBoost;
    // Reset
    this.scene.time.delayedCall(2000, this.speedReset);
  }

  speedReset(): void {
    this.playerSpeed = Constants.playerSpeed;
  }

  moveUp(): void {
    this.anims.play(this.key + '-back-walk', true);
    this.body.setVelocityY(-this.playerSpeed);
  }

  moveDown(): void {
    this.anims.play(this.key + '-front-walk', true);
    this.body.setVelocityY(this.playerSpeed);
  }

  moveLeft(): void {
    this.anims.play(this.key + '-left-walk', true);
    this.body.setVelocityX(-this.playerSpeed);
  }

  moveRight(): void {
    this.anims.play(this.key + '-right-walk', true);
    this.body.setVelocityX(this.playerSpeed);
  }

  stand(): void {
    this.body.setVelocity(0);
  }
}
