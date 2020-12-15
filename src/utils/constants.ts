export class Constants {
    // Window
    public static get windowCenterY(): number {return window.innerHeight / 2;}
    public static get windowCenterX(): number {return window.innerWidth / 2;}

    // Player
    public static get playerWidth(): number {return 32;}
    public static get playerHeight(): number {return 32;}
    public static get playerOffsetX(): number {return 0;}
    public static get playerOffsetY(): number {return 32;}
    public static get playerSpeed(): number {return 120;}
    public static get playerDrawScale(): number {return 0.75;}
}