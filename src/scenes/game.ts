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
import { Items } from '../gameObjects/items';
import { ItemCounter } from '../gameObjects/itemCounter';
import AtlasJSONFileConfig = Phaser.Types.Loader.FileTypes.AtlasJSONFileConfig;

export default class Game extends Phaser.Scene {
  isGameComplete = false;
  isPlayerDead = false;
  player: Player;
  itemCounter: ItemCounter;
  coffees: Phaser.GameObjects.Group;
  handGels: Phaser.GameObjects.Group;
  items: Phaser.GameObjects.Group;
  officeWorkers: Phaser.GameObjects.Group;
  healthBar: HealthBar;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  camera: Phaser.Cameras.Scene2D.Camera;
  gameWidth: number;
  music: Phaser.Sound.BaseSound;

  constructor() {
    super('game');
  }

  preload(): void {
    this.loadTileMaps();
    this.loadImages();
    this.loadAudio();
  }

  create(): void {
    this.physics.world.setBounds(0, 0, 1590, 1590)

    if (!this.music) {
      this.music = this.sound.add('level 1 music', {
        loop: true,
        volume: 0.5,
      });
    }
    if (!this.music.isPlaying) {
      this.music.play();
    }

    this.createAnims(this.anims, Constants.playerId);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.camera = this.cameras.main;
    this.coffees = this.add.group();
    this.handGels = this.add.group();
    this.items = this.add.group();
    this.officeWorkers = this.add.group();
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
    const workerSpawns = []
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-1'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-2'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-3'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-4'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-5'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-6'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-7'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-8'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-9'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-10'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-11'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-12'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-12'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-14'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-15'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-16'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-17'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-18'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-19'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-20'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-21'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-22'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-23'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-24'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-25'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-26'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-27'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-28'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-29'));
    workerSpawns.push(map.findObject('Objects', (obj) => obj.name === 'worker-spawn-30'));

    this.player = new Player({
      scene: this,
      // @ts-ignore
      x: playerSpawnPoint.x,
      // @ts-ignore
      y: playerSpawnPoint.y,
      key: Constants.playerId,
    });
    this.player.init();

    this.createOfficeWorkers(floorLayer, collidingLayers, workerSpawns);

    this.healthBar = new HealthBar(this, 20, 20);

    this.itemCounter = new ItemCounter(this, this.gameWidth - 105, 15);
    this.spawnCoffees(map);
    this.spawnHandGels(map);
    this.spawnItems(map);

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
    this.physics.add.overlap(this.player, this.items, this.findItem, null, this);

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

  private createOfficeWorkers(floorLayer, collidingLayers, spawns) {
    const officeWorkerIds = [
      Constants.officeWorker1Id,
      Constants.officeWorker2Id,
      Constants.officeWorker3Id,
      Constants.officeWorker4Id,
      Constants.officeWorker5Id,
      Constants.officeWorker6Id,
      Constants.officeWorker7Id,
      Constants.officeWorker8Id,
      Constants.officeWorker9Id,
      Constants.officeWorker10Id,
      Constants.officeWorker1Id,
      Constants.officeWorker2Id,
      Constants.officeWorker3Id,
      Constants.officeWorker4Id,
      Constants.officeWorker5Id,
      Constants.officeWorker6Id,
      Constants.officeWorker7Id,
      Constants.officeWorker8Id,
      Constants.officeWorker9Id,
      Constants.officeWorker10Id,
      Constants.officeWorker1Id,
      Constants.officeWorker2Id,
      Constants.officeWorker3Id,
      Constants.officeWorker4Id,
      Constants.officeWorker5Id,
      Constants.officeWorker6Id,
      Constants.officeWorker7Id,
      Constants.officeWorker8Id,
      Constants.officeWorker9Id,
      Constants.officeWorker10Id
    ]

    officeWorkerIds.forEach((id, index) => {
      this.createOfficeWorker(floorLayer, collidingLayers, id, spawns[index].x, spawns[index].y);
    })
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

    return officeWorker;
  }

  private onOfficeWorkerCollision(player: Player, officeWorker: OfficeWorker): void {
    if (!officeWorker.isPaused()) {
      this.playOfficeWorkerCollisionSfx();
      officeWorker.pause(3000);
      this.decreaseHealth(Constants.playerCollisionWithCoWorkerDamage);
      this.animatePlayerDamage();
    }
  }

  private animatePlayerDamage(): void {
    this.tweens.add({
      targets: this.player,
      alpha: { from: 0.1, to: 1 },
      ease: 'Linear',
      duration: 500,
      repeat: 3,
      yoyo: false,
    });
  }

  private playOfficeWorkerCollisionSfx(): void {
    this.sound.add('office_worker_collision', { loop: false }).play();
  }

  private playHandGelSfx(): void {
    this.sound.add('hand_gel_squirt', { loop: false }).play();
  }

  private playSlurpSfx(): void {
    this.sound.add('slurp', { loop: false }).play();
  }

  private playItemFoundSfx(): void {
    this.sound.add('ding', { loop: false }).play();
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
    this.playSlurpSfx();
    coffee.destroy(true);
    player.speedUp();
  }

  private sanitise(player: Player, item: Phaser.GameObjects.GameObject): void {
    item.destroy(true);
    this.playHandGelSfx();
    this.healthBar.increase(10);
  }

  public decreaseHealth(amount: number): void {
    if (this.healthBar.decrease(amount)) {
      this.isPlayerDead = true;
      this.onGameOver();
    }
  }

  private stopGameMusic() {
    this.music.stop();
  }

  private findItem(player: Player, item: Phaser.GameObjects.GameObject): void {
    this.playItemFoundSfx();
    item.destroy(true);
    this.itemCounter.increment(1);
    if (this.itemCounter.currentItemTotal >= 10) {
      this.stopGameMusic();
      const roundEndMusic = this.sound.add('round_end', { loop: false });
      roundEndMusic.play();
      this.displayWinningScreen();
    }
  }

  private onGameOver(): void {
    this.stopGameMusic();
    const gameOverMusic = this.sound.add('death', { loop: false });
    gameOverMusic.play();
    this.scene.start('gameOver');
  }

  private displayWinningScreen() {
    this.scene.start('gameWon');
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
    this.load.image('face mask spawn', 'assets/images/mask.png');
    this.load.image('fire extinguisher spawn', 'assets/images/fire extinguisher.png');
    this.load.image('pool ball spawn', 'assets/images/pool balls.png');
    this.load.image('paper spawn', 'assets/images/papers.png');
    this.load.image('laptop spawn', 'assets/images/laptop.png');
    this.load.image('donut spawn', 'assets/images/donut.png');
    this.load.image('duck spawn', 'assets/images/duck.png');
    this.load.image('scissor spawn', 'assets/images/scissors.png');
    this.load.image('bottle spawn', 'assets/images/bottle.png');
    this.load.image('phone spawn', 'assets/images/phone.png');
  }

  private loadAudio() {
    this.load.audio('level 1 music', 'assets/audio/music/level-1.mp3');
    this.load.audio('death', 'assets/audio/SFX/death.wav');
    this.load.audio('round_end', 'assets/audio/SFX/round_end.wav');
    this.load.audio('office_worker_collision', 'assets/audio/SFX/office_worker_collision.mp3');
    this.load.audio('hand_gel_squirt', 'assets/audio/SFX/hand_gel_squirt.mp3');
    this.load.audio('slurp', 'assets/audio/SFX/slurp.mp3');
    this.load.audio('ding', 'assets/audio/SFX/ding.mp3');
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

  private spawnItems(map: Phaser.Tilemaps.Tilemap) {
    const faceMask = map.findObject('Objects', (obj) => obj.name === 'face mask spawn');
    const fireExtinguisher = map.findObject('Objects', (obj) => obj.name === 'fire extinguisher spawn');
    const poolBall = map.findObject('Objects', (obj) => obj.name === 'pool ball spawn');
    const paper = map.findObject('Objects', (obj) => obj.name === 'paper spawn');
    const laptop = map.findObject('Objects', (obj) => obj.name === 'laptop spawn');
    const donut = map.findObject('Objects', (obj) => obj.name === 'donut spawn');
    const duck = map.findObject('Objects', (obj) => obj.name === 'duck spawn');
    const scissor = map.findObject('Objects', (obj) => obj.name === 'scissor spawn');
    const bottle = map.findObject('Objects', (obj) => obj.name === 'bottle spawn');
    const phone = map.findObject('Objects', (obj) => obj.name === 'phone spawn');

    const itemSpawns = [faceMask, fireExtinguisher, poolBall, paper, laptop, donut, duck, scissor, bottle, phone];

    itemSpawns.forEach((item, index: number) => {
      this.items.add(
        // @ts-ignore
        new Items({ scene: this, x: item.x, y: item.y, texture: item.name, delay: index }),
      );
    });
  }
}
