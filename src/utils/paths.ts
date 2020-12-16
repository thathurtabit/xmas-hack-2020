import { Constants } from "./constants";

export class Paths {
 
    public static getPath1(that): string {
        let path = that.add.path(Constants.windowCenterX, Constants.windowCenterY + 120);

        path.lineTo(Constants.windowCenterX + 40, Constants.windowCenterY + 120);
        path.lineTo(Constants.windowCenterX, Constants.windowCenterY + 120);
        
        return path; 
    }
  
}