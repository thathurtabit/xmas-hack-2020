import AtlasJSONFileConfig = Phaser.Types.Loader.FileTypes.AtlasJSONFileConfig;
import {Constants} from "./constants";

export class ObjectAtlasMappings {

    public static get getMappings(): AtlasJSONFileConfig[] {
        return [
            ObjectAtlasMappings.playerAtlasMapping,
            ObjectAtlasMappings.officeWorkerOneAtlasMapping,
            ObjectAtlasMappings.officeWorkerTwoAtlasMapping, 
            ObjectAtlasMappings.officeWorkerThreeAtlasMapping,
            ObjectAtlasMappings.officeWorkerFourAtlasMapping,
            ObjectAtlasMappings.officeWorkerFiveAtlasMapping,
            ObjectAtlasMappings.officeWorkerSixAtlasMapping,
            ObjectAtlasMappings.officeWorkerSevenAtlasMapping,
            ObjectAtlasMappings.officeWorkerEightAtlasMapping,
            ObjectAtlasMappings.officeWorkerNineAtlasMapping,
            ObjectAtlasMappings.officeWorkerTenAtlasMapping
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
            key: Constants.officeWorker1Id,
            textureURL: "assets/atlas/office-worker/atlas-ow.png",
            atlasURL: "assets/atlas/office-worker/atlas-ow.json"
        };
    }

    private static get officeWorkerTwoAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorker2Id,
            textureURL: "assets/atlas/office-worker-2/atlas-ow.png",
            atlasURL: "assets/atlas/office-worker-2/atlas-ow.json"
        };
    }

    private static get officeWorkerThreeAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorker3Id,
            textureURL: "assets/atlas/office-worker-3/atlas-ow.png",
            atlasURL: "assets/atlas/office-worker-3/atlas-ow.json"
        };
    }

    private static get officeWorkerFourAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorker4Id,
            textureURL: "assets/atlas/office-worker-4/atlas-ow.png",
            atlasURL: "assets/atlas/office-worker-4/atlas-ow.json"
        };
    }

    private static get officeWorkerFiveAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorker5Id,
            textureURL: "assets/atlas/office-worker-5/atlas-ow.png",
            atlasURL: "assets/atlas/office-worker-5/atlas-ow.json"
        };
    }

    private static get officeWorkerSixAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorker6Id,
            textureURL: "assets/atlas/office-worker-6/atlas-ow.png",
            atlasURL: "assets/atlas/office-worker-6/atlas-ow.json"
        };
    }

    private static get officeWorkerSevenAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorker7Id,
            textureURL: "assets/atlas/office-worker-7/atlas-ow.png",
            atlasURL: "assets/atlas/office-worker-7/atlas-ow.json"
        };
    }

    private static get officeWorkerEightAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorker8Id,
            textureURL: "assets/atlas/office-worker-8/atlas-ow.png",
            atlasURL: "assets/atlas/office-worker-8/atlas-ow.json"
        };
    }

    private static get officeWorkerNineAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorker9Id,
            textureURL: "assets/atlas/office-worker-9/atlas-ow.png",
            atlasURL: "assets/atlas/office-worker-9/atlas-ow.json"
        };
    }

    private static get officeWorkerTenAtlasMapping(): AtlasJSONFileConfig {
        return {
            key: Constants.officeWorker10Id,
            textureURL: "assets/atlas/office-worker-10/atlas-ow.png",
            atlasURL: "assets/atlas/office-worker-10/atlas-ow.json"
        };
    }
}