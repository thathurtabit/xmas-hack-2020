import { Constants } from "./constants";

export class Paths {
 
    public static getPath1(that): string {
        const path = that.add.path(10, 10);

        // path.lineTo(Constants.windowCenterX + 40, Constants.windowCenterY + 120);
        // path.lineTo(Constants.windowCenterX, Constants.windowCenterY + 120);

        path.lineTo(500, 10);
        path.lineTo(500, 500);
        path.lineTo(10, 500);
        path.lineTo(10, 10);
        // path.lineTo(10, 10);
        // path.lineTo(10, 10);
        // path.lineTo(10, 10);
        // path.lineTo(10, 10);
        // path.lineTo(Constants.windowCenterX, Constants.windowCenterY + 120);
        



        return path; 
    }
  
}