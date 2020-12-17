export class Constants {
  // Object ids
  public static get officeWorker1Id(): string {
    return 'officeWorker1Atlas';
  }
  public static get officeWorker2Id(): string {
    return 'officeWorker2Atlas';
  }
  public static get officeWorker3Id(): string {
    return 'officeWorker3Atlas';
  }
  public static get officeWorker4Id(): string {
    return 'officeWorker4Atlas';
  }
  public static get officeWorker5Id(): string {
    return 'officeWorker5Atlas';
  }
  public static get officeWorker6Id(): string {
    return 'officeWorker6Atlas';
  }
  public static get officeWorker7Id(): string {
    return 'officeWorker7Atlas';
  }
  public static get officeWorker8Id(): string {
    return 'officeWorker8Atlas';
  }
  public static get officeWorker9Id(): string {
    return 'officeWorker9Atlas';
  }
  public static get officeWorker10Id(): string {
    return 'officeWorker10Atlas';
  }

  public static get playerId(): string {
    return 'playerAtlas';
  }

  // Window
  public static get windowCenterY(): number {
    return window.innerHeight / 2;
  }
  public static get windowCenterX(): number {
    return window.innerWidth / 2;
  }

  // Player
  public static get playerWidth(): number {
    return 32;
  }
  public static get playerHeight(): number {
    return 32;
  }
  public static get playerOffsetX(): number {
    return 0;
  }
  public static get playerOffsetY(): number {
    return 32;
  }
  public static get playerSpeed(): number {
    return 120;
  }
  public static get playerSpeedBoost(): number {
    return 20;
  }
  public static get playerDrawScale(): number {
    return 0.75;
  }

  // Coffee
  public static get coffeeWidth(): number {
    return 20;
  }
  public static get coffeeHeight(): number {
    return 20;
  }
  public static get coffeeOffsetX(): number {
    return 0;
  }
  public static get coffeeOffsetY(): number {
    return 20;
  }
  public static get coffeeDrawScale(): number {
    return 0.25;
  }

  // Items
  public static get totalItemsToCollectToWin(): number {
    return 20;
  }

  // OfficeWorker
  public static get officeNPCWidth(): number {
    return 32;
  }
  public static get officeNPCHeight(): number {
    return 32;
  }
  public static get officeNPCOffsetX(): number {
    return 0;
  }
  public static get officeNPCOffsetY(): number {
    return 32;
  }
  public static get officeNPCSpeed(): number {
    return 120;
  }
  public static get officeNPCDrawScale(): number {
    return 0.75;
  }
  // HealthBar
  public static get healthBarMax(): number {
    return 100;
  }
}
