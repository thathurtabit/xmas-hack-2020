import { Constants }  from './../utils/constants';
import "phaser";

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

        this.anims.play(this.key+'-right-walk', true);
        console.log('hello')
    }

    moveRight(): void {
        this.anims.play(this.key+'-right-walk', true);
    }
}