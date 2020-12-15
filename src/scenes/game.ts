import * as util from "../utils/constants";
import "phaser";
import { Player } from "../gameObjects/player";

export default class Game extends Phaser.Scene {
  player: Player;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  camera: Phaser.Cameras.Scene2D.Camera;

  constructor() {
    super("game");
  }

  preload(): void {
    this.loadTileMaps();
  }

  create(): void {
    this.createAnims(this.anims);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.camera = this.cameras.main;

    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );

    this.player = new Player({
      scene: this,
      x: 300,
      y: 600,
      key: "playerAtlas",
    });
    this.player.init();

    this.camera.startFollow(
      this.player,
      true,
      1,
      1,
      this.player.displayWidth / 2,
      this.player.displayHeight / 2
    );

    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.add.collider(this.player, worldLayer);


    // Debug

      // Help text that has a "fixed" position on the screen
  this.add
  .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
    font: "18px monospace",
    fill: "#000000",
    padding: { x: 20, y: 10 },
    backgroundColor: "#ffffff"
  })
  .setScrollFactor(0)
  .setDepth(30);

// Debug graphics
this.input.keyboard.once("keydown_D", event => {
  // Turn on physics debugging to show player's hitbox
  this.physics.world.createDebugGraphic();

  // Create worldLayer collision graphic above the player, but below the help text
  const graphics = this.add
    .graphics()
    .setAlpha(0.75)
    .setDepth(20);
  worldLayer.renderDebug(graphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
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
      this.player.anims.stop();
    }
  }

  private loadTileMaps() {
    this.load.image("tiles", "assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "assets/tilemaps/tuxemon-town.json");
    this.load.atlas(
      "playerAtlas",
      "assets/atlas/atlas.png",
      "assets/atlas/atlas.json"
    );
  }

  private createAnims(anims) {
    anims.create({
      key: "player-left-walk",
      frames: anims.generateFrameNames("playerAtlas", {
        prefix: "misa-left-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: "player-right-walk",
      frames: anims.generateFrameNames("playerAtlas", {
        prefix: "misa-right-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: "player-front-walk",
      frames: anims.generateFrameNames("playerAtlas", {
        prefix: "misa-front-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: "player-back-walk",
      frames: anims.generateFrameNames("playerAtlas", {
        prefix: "misa-back-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    anims.create({
      key: "player-idle",
      frames: [{ key: "playerSprites", frame: "alienBlue_stand.png" }],
      frameRate: 10,
    });
  }
}
