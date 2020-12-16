import 'phaser';
import { Player } from '../gameObjects/player';
import { Constants } from '../utils/constants';
import { OfficeWorker } from '../gameObjects/officeWorker';
import Path = Phaser.Curves.Path;
import { ObjectAtlasMappings } from '../gameObjects/objectAtlasMappings';
import PathFollower = Phaser.GameObjects.Components.PathFollower;
import { HealthBar } from '../gameObjects/healthBar';

export default class Game extends Phaser.Scene {
  isGameComplete: boolean;
  isPlayerDead: boolean;
  player: Player;
  coffees: Phaser.GameObjects.Group;
  healthBar: HealthBar;
  officeWorkers: OfficeWorker[] = [];
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  camera: Phaser.Cameras.Scene2D.Camera;
  officeWorker1Path: Path;
  follower: PathFollower;

  constructor() {
    super('game');

    this.isGameComplete = false;
    this.isPlayerDead = false;
  }

  preload(): void {
    this.loadTileMaps();
    this.loadImages();
  }

  create(): void {
    this.createAnims(this.anims, Constants.playerId);
    this.createAnims(this.anims, Constants.officeWorkerOneId);
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

    this.officeWorker1Path = this.add.path(Constants.windowCenterX, Constants.windowCenterY + 120);
    this.officeWorker1Path.lineTo(Constants.windowCenterX + 40, Constants.windowCenterY + 120);
    this.officeWorker1Path.lineTo(Constants.windowCenterX, Constants.windowCenterY + 120);

    this.officeWorkers.push(
      new OfficeWorker({
        scene: this,
        x: Constants.windowCenterX,
        y: Constants.windowCenterY + 120,
        key: Constants.officeWorkerOneId,
      }),
    );
    this.officeWorkers[0].init();

    this.follower = this.add.follower(
      this.officeWorker1Path,
      Constants.windowCenterX,
      Constants.windowCenterY + 120,
      Constants.officeWorkerOneId,
    );
    this.follower.startFollow({
      yoyo: true,
      repeat: -1,
    });

    // TODO: Make this work - for looping NPC paths
    this.tweens.add({
      targets: this.follower,
      t: 1,
      duration: 10000,
      repeat: -1,
    });

    this.player = new Player({
      scene: this,
      x: Constants.windowCenterX,
      y: Constants.windowCenterY + 130,
      key: Constants.playerId,
    });
    this.player.init();

    // Manually adding in coffees, but this should be done through Tiled positioning
    this.coffees = this.physics.add.group({
      key: 'coffee',
      repeat: 5,
      setXY: {
        x: Constants.windowCenterX - 200,
        y: Constants.windowCenterY - 90,
        stepX: 70,
      },
    });

    this.healthBar = new HealthBar(this, 20, 20);

    this.coffees.children.getArray().forEach((coffee: Phaser.GameObjects.Image, index: number) => {
      coffee.scale = 0.2;

      this.tweens.add({
        targets: coffee,
        y: Constants.windowCenterY - 100,
        duration: 1000,
        ease: 'Sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 100,
      });
    });

    this.player.body.velocity.normalize().scale(Constants.playerSpeed);
    this.officeWorkers[0].body.velocity.normalize().scale(Constants.officeNPCSpeed);

    this.camera.startFollow(this.player, true, 1, 1, this.player.displayWidth / 2, this.player.displayHeight / 2);

    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Add collisions to game objects
    this.physics.add.collider(this.player, worldLayer);

    // Trigger event on overlap
    this.physics.add.overlap(this.player, this.coffees, this.takeDamage, null, this);
    this.physics.add.collider(this.officeWorkers[0], worldLayer);

    // Debug graphics
    // Press 'D' during play to see debug mode
    this.input.keyboard.once('keydown_D', () => {
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
    this.officeWorkers[0].moveRight();
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

  private drinkCoffee(player: Player, coffee): void {
    coffee.disableBody(true, true);
    player.speedUp();
  }

  private takeDamage(player: Player, item): void {
    item.disableBody(true, true);

    if (this.healthBar.decrease(20)) {
      this.isPlayerDead = true;
      this.onGameOver();
    }
  }

  private onGameOver(): void {
    alert('GAME OVER: COVID WINS');
  }

  private loadTileMaps() {
    this.load.image('tiles', 'assets/tilesets/tuxmon-sample-32px-extruded.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/tuxemon-town.json');
    this.load.atlas([ObjectAtlasMappings.playerAtlasMapping, ObjectAtlasMappings.officeWorkerOneAtlasMapping]);
  }

  private loadImages() {
    this.load.image('coffee', 'assets/images/coffee.png');
  }

  private createAnims(anims, objectId) {
    anims.create({
      key: objectId + '-left-walk',
      frames: anims.generateFrameNames(objectId, {
        prefix: 'misa-left-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: objectId + '-right-walk',
      frames: anims.generateFrameNames(objectId, {
        prefix: 'misa-right-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: objectId + '-front-walk',
      frames: anims.generateFrameNames(objectId, {
        prefix: 'misa-front-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: objectId + '-back-walk',
      frames: anims.generateFrameNames(objectId, {
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
