import 'phaser';
import { Player } from '../gameObjects/player';
import { Constants } from '../utils/constants';
import { Paths } from '../utils/paths';
import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import { OfficeWorker } from '../gameObjects/officeWorker';
import Path = Phaser.Curves.Path;
import { ObjectAtlasMappings } from '../utils/objectAtlasMappings';
import PathFollower = Phaser.GameObjects.Components.PathFollower;
import { HealthBar } from '../gameObjects/healthBar';

export default class Game extends Phaser.Scene {
  isGameComplete: boolean;
  isPlayerDead: boolean;
  player: Player;
  coffees = [];
  healthBar: HealthBar;
  officeWorkers: OfficeWorker[] = [];
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  camera: Phaser.Cameras.Scene2D.Camera;

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
    this.cursors = this.input.keyboard.createCursorKeys();
    this.camera = this.cameras.main;

    const map = this.make.tilemap({ key: 'map' });

    const carpetTileset = map.addTilesetImage('Carpet', 'carpet');
    const carTileset1 = map.addTilesetImage('campervan', 'cars1');
    const carTileset2 = map.addTilesetImage('cars copy 2', 'cars2');
    const carTileset3 = map.addTilesetImage('cars copy 3', 'cars3');
    const interiorsTileset = map.addTilesetImage('Interiors_16x16', 'interiors');
    const officeTileset = map.addTilesetImage('office', 'office');
    const wallTileset = map.addTilesetImage('walls_floors', 'walls');
    const objectsTileset = map.addTilesetImage('top-down interior v2', 'objects');

    const tilesets = [carpetTileset, carTileset1, carTileset2, carTileset3, interiorsTileset, officeTileset, wallTileset, objectsTileset];

    const floorLayer = map.createStaticLayer('Floor', tilesets, 0, 0);
    const roomsLayer = map.createStaticLayer('Rooms', tilesets, 0, 0);
    const balconyLayer = map.createStaticLayer('balcony', tilesets, 0, 0);
    const edgesLayer = map.createStaticLayer('edges', tilesets, 0, 0);
    const DoorsAndWindowsLayer = map.createStaticLayer('DoorsAndWindows', tilesets, 0, 0);
    const conciergeLayer = map.createStaticLayer('concierge', tilesets, 0, 0);
    const liftsLayer = map.createStaticLayer('lifts', tilesets, 0, 0);
    const UserDeskLayer = map.createStaticLayer('User desk', tilesets, 0, 0);
    const ChairsLayer = map.createStaticLayer('Chairs', tilesets, 0, 0);
    const TablesLayer = map.createStaticLayer('Tables', tilesets, 0, 0);
    const carsLayer = map.createStaticLayer('cars', tilesets, 0, 0);
    const DecorLayer = map.createStaticLayer('Decor', tilesets, 0, 0);
    const handGelLayer = map.createStaticLayer('hand gel', tilesets, 0, 0);
    const CoffeeMachineLayer = map.createStaticLayer('Coffee Machine', tilesets, 0, 0);
    const ToiletLayer = map.createStaticLayer('Toilet', tilesets, 0, 0);
    const printerLayer = map.createStaticLayer('printer', tilesets, 0, 0);
    const postStationaryLayer = map.createStaticLayer('post stationary', tilesets, 0, 0);
    const TopChairsLayer = map.createStaticLayer('Top chairs', tilesets, 0, 0);

    const collidingLayers: Array<StaticTilemapLayer> = [balconyLayer, edgesLayer, conciergeLayer, ChairsLayer, TablesLayer, carsLayer, DecorLayer, handGelLayer, CoffeeMachineLayer, ToiletLayer, printerLayer, postStationaryLayer, TopChairsLayer]
    this.setCollision(collidingLayers);

    // Where the player will start ("Spawn Point" should be an object in Tiled)
    const spawnPoint = map.findObject('Objects', (obj) => obj.name === 'Spawn Point');

    this.spawnCoffee(map);

    this.player = new Player({
      scene: this,
      // @ts-ignore
      x: spawnPoint.x,
      // @ts-ignore
      y: spawnPoint.y,
      key: Constants.playerId,
    });
    this.player.init();

    this.createOfficeWorkers(floorLayer, collidingLayers);

    this.healthBar = new HealthBar(this, 20, 20);

    this.coffees.forEach(coffee => coffee.children.getArray().forEach((coffee: Phaser.GameObjects.Image, index: number) => {
      coffee.scale = 0.2;

      this.tweens.add({
        targets: coffee,
        y: coffee.y - 10,
        duration: 1000,
        ease: 'Sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 100,
      });
    }));

    this.player.body.velocity.normalize().scale(Constants.playerSpeed);

    this.camera.startFollow(this.player, true, 1, 1, this.player.displayWidth / 2, this.player.displayHeight / 2);

    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Add collisions to game objects
    this.physics.add.collider(this.player, floorLayer);
    collidingLayers.forEach(layer => {
      this.physics.add.collider(this.player, layer);
    })

    // Trigger event on overlap
    this.physics.add.overlap(this.player, this.coffees, this.drinkCoffee, null, this);

    // Debug graphics
    // Press 'D' during play to see debug mode
    this.input.keyboard.once('keydown_D', () => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      collidingLayers.forEach(layer => {
        layer.renderDebug(graphics, {
          tileColor: null, // Color of non-colliding tiles
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
        });
      })
    });
  }

  private createOfficeWorkers(floorLayer, collidingLayers) {

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorkerOneId, 
      Paths.getPath1(this),
      0,
      10 * 1000,
      100,
      100
    ));

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorkerTwoId, 
      Paths.getPath1(this),
      0.5,
      8 * 1000,
      500,
      500
    ));

  }

  private createOfficeWorker(floorLayer, collidingLayers, id, path, startAt, duration, x, y): OfficeWorker {
    this.createAnims(this.anims, id);

    const officeWorker = new OfficeWorker({
        scene: this,
        key: id,
        x: x,
        y: y
    });
    officeWorker.init();
    
    officeWorker.body.velocity.normalize().scale(Constants.playerSpeed);

    // Add collisions to game objects
    this.physics.add.collider(officeWorker, floorLayer);
    collidingLayers.forEach(layer => {
      this.physics.add.collider(officeWorker, layer);
    })

    this.physics.add.overlap(this.player, officeWorker, this.onOfficeWorkerCollision, null, this);


    // const follower = this.add.follower(path, 0, 0, id);
    // follower.startFollow({
    //   repeat: -1,
    //   startAt: startAt,
    //   duration: duration
    // });

    // this.physics.world.enable(follower);
    // this.physics.add.overlap(this.player, follower, this.onOfficeWorkerCollision, null, this);

    return officeWorker;
  }

  private onOfficeWorkerCollision(player: Player, officeWorker): void {
    console.log("COLLISION!")
    // if (officeWorker.isFollowing()) {
    //   officeWorker.pauseFollow();
    //   this.decreaseHealth(10);

    //   this.time.delayedCall(3000, this.resumePausedOfficeWorker, [ officeWorker ], this);
    // }
  }

  private resumePausedOfficeWorker(officeWorker) {
    officeWorker.resumeFollow();
  }

  private setCollision(collidingLayers: Array<StaticTilemapLayer>) {
    collidingLayers.forEach(layer => {layer.setCollisionByProperty({collides:true})})
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
    this.decreaseHealth(20);
  }

  private decreaseHealth(amount) {
    if (this.healthBar.decrease(amount)) {
      this.isPlayerDead = true;
      this.onGameOver();
    }
  }

  private onGameOver(): void {
    alert('GAME OVER: COVID WINS');
  }

  private loadTileMaps() {
    this.load.image('carpet', 'assets/office/map-files/images/Carpet.png');
    this.load.image('cars1', 'assets/office/map-files/images/cars copy.png');
    this.load.image('cars2', 'assets/office/map-files/images/cars copy 2.png');
    this.load.image('cars3', 'assets/office/map-files/images/cars copy 3.png');
    this.load.image('interiors', 'assets/office/map-files/images/Interiors_16x16.png');
    this.load.image('office', 'assets/office/map-files/images/Office_interiors_shadowless_16x16.png');
    this.load.image('walls', 'assets/office/map-files/images/Tilesets_16x16.png');
    this.load.image('objects', 'assets/office/map-files/images/top-down interior v2.png');

    this.load.tilemapTiledJSON('map', 'assets/office/office-map.json');
    this.load.atlas(ObjectAtlasMappings.getMappings)
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

  private spawnCoffee(map: Phaser.Tilemaps.Tilemap) {
    const coffee1 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 1');
    const coffee2 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 2');
    const coffee3 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 3');
    const coffee4 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 4');
    const coffee5 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 5');
    const coffee6 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 6');

    const coffeeSpawns = [coffee1, coffee2, coffee3, coffee4, coffee5, coffee6]

    coffeeSpawns.forEach(coffee => {
      this.coffees.push(this.physics.add.group({
        key: 'coffee',
        repeat: 0,
        setXY: {
          // @ts-ignore
          x: coffee.x,
          // @ts-ignore
          y: coffee.y
        },
      }))
    })
  }
}
