import { Constants } from './../utils/constants';
import "phaser";

export class Player extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);
    }

    init(): void {          

        // physics
        // this.width = Constants.playerWidth * 2;
        // this.height = Constants.playerHeight * 2;
        
        this.scene.physics.world.enable(this);

        // this.displayWidth = Constants.playerWidth;
        // this.displayHeight = Constants.playerHeight;

        this.body
            .setSize(Constants.playerWidth, Constants.playerHeight)
            .setOffset(Constants.playerOffsetX, Constants.playerOffsetY);    

        this.displayOriginX = 0.5;
        this.displayOriginY = 0.5;

        this.setScale(Constants.playerDrawScale, Constants.playerDrawScale);

        this.scene.add.existing(this);
    }

    moveUp(): void {
        this.anims.play('player-front-walk', true);
        this.body.setVelocityY(-Constants.playerSpeed);
    }

    moveDown(): void {
        this.anims.play('player-back-walk', true);
        this.body.setVelocityY(Constants.playerSpeed);
    }

    moveLeft(): void {
        this.anims.play('player-left-walk', true);
        this.body.setVelocityX(-Constants.playerSpeed);
    }

    moveRight(): void {
        this.anims.play('player-right-walk', true);
        this.body.setVelocityX(Constants.playerSpeed);
    }

    stand(): void {
        this.anims.play('player-front', true);
        this.body.setVelocity(0);
    }
}