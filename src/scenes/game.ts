import 'phaser';
import { Player } from '../gameObjects/player';
import { Constants } from '../utils/constants';

export default class Game extends Phaser.Scene {
  player: Player;
  coffees: Phaser.GameObjects.Group;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  camera: Phaser.Cameras.Scene2D.Camera;

  constructor() {
    super('game');
  }

  preload(): void {
    this.loadTileMaps();
    this.loadImages();
  }

  create(): void {
    this.createAnims(this.anims);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.camera = this.cameras.main;

    const map = this.make.tilemap({ key: 'map' });

    const tileset = map.addTilesetImage('tuxmon-sample-32px-extruded', 'tiles');

    const belowLayer = map.createStaticLayer('Below Player', tileset, 0, 0);
    const worldLayer = map.createStaticLayer('World', tileset, 0, 0);
    const aboveLayer = map.createStaticLayer('Above Player', tileset, 0, 0);

    aboveLayer.setDepth(10);

    worldLayer.setCollisionByProperty({ collides: true });

    // Where the player will start ("Spawn Point" should be an object in Tiled)
    const spawnPoint = map.findObject('Objects', (obj) => obj.name === 'Spawn Point');

    this.player = new Player({
      scene: this,
      x: Constants.windowCenterX,
      y: Constants.windowCenterY + 130,
      key: 'playerAtlas',
    });
    this.player.init();

    // Manually adding in coffees, but this should be done through Tiled positioning
    this.coffees = this.physics.add.group({
      key: 'coffee',
      repeat: 5,
      setXY: {
        x: Constants.windowCenterX - 200,
        y: Constants.windowCenterY + 150,
        stepX: 70,
      },
    });

    this.coffees.children.getArray().forEach((coffee: Phaser.GameObjects.Image, index: number) => {
      coffee.scale = 0.2;

      this.tweens.add({
        targets: coffee,
        y: Constants.windowCenterY + 160,
        duration: 1000,
        ease: 'Sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 100,
      });
    });

    this.player.body.velocity.normalize().scale(Constants.playerSpeed);

    this.camera.startFollow(this.player, true, 1, 1, this.player.displayWidth / 2, this.player.displayHeight / 2);

    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.collider(this.player, worldLayer);

    // Debug graphics
    // Press 'D' during play to see debug mode
    this.input.keyboard.once('keydown_D', (event) => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      worldLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
      });
    });
  }

  update(): void {
    // Move player / camera
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    } else if (this.cursors.down.isDown) {
      this.player.moveDown();
    } else if (this.cursors.up.isDown) {
      this.player.moveUp();
    } else {
      this.player.stand();
      this.player.anims.stop();
    }
  }

  private loadTileMaps() {
    this.load.image('tiles', 'assets/tilesets/tuxmon-sample-32px-extruded.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/tuxemon-town.json');
    this.load.atlas('playerAtlas', 'assets/atlas/atlas.png', 'assets/atlas/atlas.json');
  }

  private loadImages() {
    this.load.image('coffee', 'assets/images/coffee.png');
  }

  private createAnims(anims) {
    anims.create({
      key: 'player-left-walk',
      frames: anims.generateFrameNames('playerAtlas', {
        prefix: 'misa-left-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: 'player-right-walk',
      frames: anims.generateFrameNames('playerAtlas', {
        prefix: 'misa-right-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: 'player-front-walk',
      frames: anims.generateFrameNames('playerAtlas', {
        prefix: 'misa-front-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: 'player-back-walk',
      frames: anims.generateFrameNames('playerAtlas', {
        prefix: 'misa-back-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
