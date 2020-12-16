import { Constants } from "./constants";

export class Paths {
 
    public static getPath1(that): string {
        let path = that.add.path(10,10);

        // path.lineTo(Constants.windowCenterX + 40, Constants.windowCenterY + 120);
        // path.lineTo(Constants.windowCenterX, Constants.windowCenterY + 120);

        path.lineTo(200, 10);
        path.lineTo(200, 200);
        path.lineTo(10, 200);
        path.lineTo(10, 10);
        // path.lineTo(10, 10);
        // path.lineTo(10, 10);
        // path.lineTo(10, 10);
        // path.lineTo(10, 10);
        // path.lineTo(Constants.windowCenterX, Constants.windowCenterY + 120);
        



        return path; 
    }
  
}