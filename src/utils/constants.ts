export class Constants {
  // Object ids
    public static get officeWorkerOneId(): string {return "officeWorkerOneIdAtlas"}
    public static get playerId(): string {return "playerAtlas"}

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

    // OfficeWorker
    public static get officeNPCWidth(): number {return 32;}
    public static get officeNPCHeight(): number {return 32;}
    public static get officeNPCOffsetX(): number {return 0;}
    public static get officeNPCOffsetY(): number {return 32;}
    public static get officeNPCSpeed(): number {return 120;}
    public static get officeNPCDrawScale(): number {return 0.75;}
}
