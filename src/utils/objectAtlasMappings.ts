import AtlasJSONFileConfig = Phaser.Types.Loader.FileTypes.AtlasJSONFileConfig;
import {Constants} from "./constants";

export class ObjectAtlasMappings {

    public static get playerAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.playerId,
            textureURL: "assets/atlas/atlas.png",
            atlasURL: "assets/atlas/atlas.json"
        };
    }

    public static get officeWorkerOneAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorkerOneId,
            textureURL: "assets/atlas/atlas.png",
            atlasURL: "assets/atlas/atlas.json"
        };
    }
}