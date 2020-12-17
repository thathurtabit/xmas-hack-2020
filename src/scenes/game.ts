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
import { Coffee } from '../gameObjects/coffee';
import { HandGel } from '../gameObjects/handGel';
import { FaceMask } from '../gameObjects/faceMask';
import { ItemCounter } from '../gameObjects/itemCounter';

export default class Game extends Phaser.Scene {
  isGameComplete = false;
  isPlayerDead = false;
  player: Player;
  itemCounter: ItemCounter;
  coffees: Phaser.GameObjects.Group;
  handGels: Phaser.GameObjects.Group;
  faceMasks: Phaser.GameObjects.Group;
  healthBar: HealthBar;
  officeWorkers: OfficeWorker[] = [];
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  camera: Phaser.Cameras.Scene2D.Camera;
  gameWidth: number;

  constructor() {
    super('game');
  }

  preload(): void {
    this.loadTileMaps();
    this.loadImages();
    this.loadAudio();
  }

  create(): void {
    const levelMusic = this.sound.add("level 1 music", {
      loop: true
    })

    levelMusic.play();

    this.createAnims(this.anims, Constants.playerId);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.camera = this.cameras.main;
    this.coffees = this.add.group();
    this.handGels = this.add.group();
    this.faceMasks = this.add.group();
    this.gameWidth = this.cameras.main.width;

    const map = this.make.tilemap({ key: 'map' });

    const carpetTileset = map.addTilesetImage('Carpet', 'carpet');
    const carTileset1 = map.addTilesetImage('campervan', 'cars1');
    const carTileset2 = map.addTilesetImage('cars copy 2', 'cars2');
    const carTileset3 = map.addTilesetImage('cars copy 3', 'cars3');
    const interiorsTileset = map.addTilesetImage('Interiors_16x16', 'interiors');
    const officeTileset = map.addTilesetImage('office', 'office');
    const wallTileset = map.addTilesetImage('walls_floors', 'walls');
    const objectsTileset = map.addTilesetImage('top-down interior v2', 'objects');

    const tilesets = [
      carpetTileset,
      carTileset1,
      carTileset2,
      carTileset3,
      interiorsTileset,
      officeTileset,
      wallTileset,
      objectsTileset,
    ];

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

    const collidingLayers: Array<StaticTilemapLayer> = [
      balconyLayer,
      edgesLayer,
      conciergeLayer,
      ChairsLayer,
      TablesLayer,
      carsLayer,
      DecorLayer,
      handGelLayer,
      CoffeeMachineLayer,
      ToiletLayer,
      printerLayer,
      postStationaryLayer,
      TopChairsLayer,
    ];
    this.setCollision(collidingLayers);

    // Where the player will start ("Spawn Point" should be an object in Tiled)
    const playerSpawnPoint = map.findObject('Objects', (obj) => obj.name === 'Spawn Point');

    // Office worker spawns
    const workerSpawn1 = map.findObject('Objects', (obj) => obj.name === 'worker-spawn-1');
    const workerSpawn2 = map.findObject('Objects', (obj) => obj.name === 'worker-spawn-2');
    const workerSpawn3 = map.findObject('Objects', (obj) => obj.name === 'worker-spawn-3');
    const workerSpawn4 = map.findObject('Objects', (obj) => obj.name === 'worker-spawn-4');
    const workerSpawn5 = map.findObject('Objects', (obj) => obj.name === 'worker-spawn-5');
    const workerSpawn6 = map.findObject('Objects', (obj) => obj.name === 'worker-spawn-6');
    const workerSpawn7 = map.findObject('Objects', (obj) => obj.name === 'worker-spawn-7');
    const workerSpawn8 = map.findObject('Objects', (obj) => obj.name === 'worker-spawn-8');
    const workerSpawn9 = map.findObject('Objects', (obj) => obj.name === 'worker-spawn-9');
    const workerSpawn10 = map.findObject('Objects', (obj) => obj.name === 'worker-spawn-10');

    const workerSpawns = [workerSpawn1, workerSpawn2, workerSpawn3, workerSpawn4, workerSpawn5, 
                          workerSpawn6, workerSpawn7, workerSpawn8, workerSpawn9, workerSpawn10];
                          
    this.player = new Player({
      scene: this,
      // @ts-ignore
      x: playerSpawnPoint.x,
      // @ts-ignore
      y: playerSpawnPoint.y,
      key: Constants.playerId,
    });
    this.player.init();

    this.createOfficeWorkers(this, floorLayer, collidingLayers, workerSpawns);
    // this.officeWorkersTest = new OfficeWorkers(this, floorLayer, collidingLayers, workerSpawns)
    
    this.healthBar = new HealthBar(this, 20, 20);

    this.itemCounter = new ItemCounter(this, this.gameWidth - 105, 15);
    this.spawnCoffees(map);
    this.spawnHandGels(map);
    this.spawnFaceMasks(map);

    this.player.body.velocity.normalize().scale(Constants.playerSpeed);

    this.camera.startFollow(this.player, true, 1, 1, this.player.displayWidth / 2, this.player.displayHeight / 2);

    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Add collisions to game objects
    this.physics.add.collider(this.player, floorLayer);
    collidingLayers.forEach((layer) => {
      this.physics.add.collider(this.player, layer);
    });

    // Trigger event on overlap
    this.physics.add.overlap(this.player, this.coffees, this.drinkCoffee, null, this);
    this.physics.add.overlap(this.player, this.handGels, this.sanitise, null, this);
    this.physics.add.overlap(this.player, this.faceMasks, this.sanitise, null, this);

    // Debug graphics
    // Press 'D' during play to see debug mode
    this.input.keyboard.once('keydown_D', () => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      collidingLayers.forEach((layer) => {
        layer.renderDebug(graphics, {
          tileColor: null, // Color of non-colliding tiles
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
        });
      });
    });
  }

  private createOfficeWorkers(context, floorLayer, collidingLayers, spawns) {

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorker1Id, 
      spawns[0].x,
      spawns[0].y
    ));

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorker2Id, 
      spawns[1].x,
      spawns[1].y
    ));

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorker3Id, 
      spawns[2].x,
      spawns[2].y
    ));

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorker4Id, 
      spawns[3].x + 20,
      spawns[3].y + 30
    ));

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorker5Id, 
      spawns[4].x,
      spawns[4].y
    ));

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorker6Id, 
      spawns[5].x,
      spawns[5].y
    ));

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorker7Id,
      spawns[6].x,
      spawns[6].y
    ));

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorker8Id, 
      spawns[7].x,
      spawns[7].y
    ));

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorker9Id, 
      spawns[8].x,
      spawns[8].y
    ));

    this.officeWorkers.push(this.createOfficeWorker(
      floorLayer, 
      collidingLayers,
      Constants.officeWorker10Id, 
      spawns[9].x,
      spawns[9].y
    ));

  }

  private createOfficeWorker(floorLayer, collidingLayers, id, x, y): OfficeWorker {
    const officeWorker = new OfficeWorker({
      scene: this,
      key: id,
      x: x,
      y: y,
    });
    officeWorker.init();
    this.addOfficerWorkerPhysicsAndCollisions(officeWorker, floorLayer, collidingLayers);
    return officeWorker;
  }


  private addOfficerWorkerPhysicsAndCollisions(officeWorker: OfficeWorker, floorLayer: any, collidingLayers: any) {
    this.physics.add.collider(officeWorker, floorLayer);
    collidingLayers.forEach((layer) => {
      this.physics.add.collider(officeWorker, layer);
    });

    this.physics.add.overlap(this.player, officeWorker, this.onOfficeWorkerCollision, null, this);
  }

  private onOfficeWorkerCollision(player: Player, officeWorker: OfficeWorker): void {
    console.log('COLLISION!');

    officeWorker.stop()
    this.decreaseHealth(20);
  }

  private resumePausedOfficeWorker(officeWorker) {
    officeWorker.resumeFollow();
  }

  private setCollision(collidingLayers: Array<StaticTilemapLayer>) {
    collidingLayers.forEach((layer) => {
      layer.setCollisionByProperty({ collides: true });
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

  private drinkCoffee(player: Player, coffee: Coffee): void {
    coffee.destroy(true);
    player.speedUp();
    this.itemCounter.increment(1);
  }

  private takeDamage(player: Player, collidingItem): void {
    //item.disableBody(true, true);
    // Switch between different health decrements based on collidingItem
    this.decreaseHealth(20);
  }

  private sanitise(player: Player, item): void {
    item.destroy(true);
    this.itemCounter.increment(1);
  }

  public decreaseHealth(amount) {
    if (this.healthBar.decrease(amount)) {
      this.isPlayerDead = true;
      this.onGameOver();
    }
  }

  private onGameOver(): void {
    this.scene.start('gameOver');
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
    this.load.atlas(ObjectAtlasMappings.getMappings);
  }

  private loadImages() {
    this.load.image('coffee', 'assets/images/coffee.png');
    this.load.image('hand gel', 'assets/images/soap.png');
    this.load.image('face mask', 'assets/images/mask.png');
  }

  private loadAudio()  {
    this.load.audio('level 1 music', 'assets/atlas/audio/music/level-1.wav');
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

  private spawnCoffees(map: Phaser.Tilemaps.Tilemap) {
    const coffee1 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 1');
    const coffee2 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 2');
    const coffee3 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 3');
    const coffee4 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 4');
    const coffee5 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 5');
    const coffee6 = map.findObject('Objects', (obj) => obj.name === 'coffee spawn 6');

    const coffeeSpawns = [coffee1, coffee2, coffee3, coffee4, coffee5, coffee6];

    coffeeSpawns.forEach((coffee, index: number) => {
      // @ts-ignore
      this.coffees.add(new Coffee({ scene: this, x: coffee.x, y: coffee.y, texture: 'coffee', delay: index }));
    });
  }

  private spawnHandGels(map: Phaser.Tilemaps.Tilemap) {
    const handGel1 = map.findObject('Objects', (obj) => obj.name === 'hand gel 1');
    const handGel2 = map.findObject('Objects', (obj) => obj.name === 'hand gel 2');
    const handGel3 = map.findObject('Objects', (obj) => obj.name === 'hand gel 3');
    const handGel4 = map.findObject('Objects', (obj) => obj.name === 'hand gel 4');

    const handGelSpawns = [handGel1, handGel2, handGel3, handGel4];

    handGelSpawns.forEach((handGel, index: number) => {
      // @ts-ignore
      this.handGels.add(new HandGel({ scene: this, x: handGel.x, y: handGel.y, texture: 'hand gel', delay: index }));
    });
  }

  private spawnFaceMasks(map: Phaser.Tilemaps.Tilemap) {
    const faceMask1 = map.findObject('Objects', (obj) => obj.name === 'face mask 1');
    const faceMask2 = map.findObject('Objects', (obj) => obj.name === 'face mask 2');

    const faceMaskSpawns = [faceMask1, faceMask2];

    faceMaskSpawns.forEach((faceMask, index: number) => {
      this.faceMasks.add(
        // @ts-ignore
        new FaceMask({ scene: this, x: faceMask.x, y: faceMask.y, texture: 'face mask', delay: index }),
      );
    });
  }
}
