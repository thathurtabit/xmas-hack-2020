import 'phaser';

export class Coffee extends Phaser.GameObjects.Image {
  delay: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.texture, params.frame);
    this.x = params.x;
    this.y = params.y;
    this.texture = params.texture;
    this.scale = 0.2;
    this.delay = params.delay;

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.addTween();
  }

  private addTween() {
    this.scene.tweens.add({
      targets: this,
      y: this.y - 10,
      duration: 1000,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: this.delay * 200,
    });
  }
}
