import AtlasJSONFileConfig = Phaser.Types.Loader.FileTypes.AtlasJSONFileConfig;
import {Constants} from "./constants";

export class ObjectAtlasMappings {

    public static get getMappings(): AtlasJSONFileConfig[] {
        return [
            ObjectAtlasMappings.playerAtlasMapping,
            ObjectAtlasMappings.officeWorkerOneAtlasMapping,
            ObjectAtlasMappings.officeWorkerTwoAtlasMapping
        ]
    }

    private static get playerAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.playerId,
            textureURL: "assets/atlas/atlas.png",
            atlasURL: "assets/atlas/atlas.json"
        };
    }

    private static get officeWorkerOneAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorkerOneId,
            textureURL: "assets/atlas/atlas.png",
            atlasURL: "assets/atlas/atlas.json"
        };
    }

    private static get officeWorkerTwoAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorkerTwoId,
            textureURL: "assets/atlas/atlas.png",
            atlasURL: "assets/atlas/atlas.json"
        };
    }

}