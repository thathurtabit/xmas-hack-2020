import 'phaser';

export interface SpawnPoint extends Phaser.GameObjects.GameObject {
    height: number
    id: number
    name: string
    point: boolean
    rotation: number
    type: string
    visible: boolean
    width: number
    x: number
    y: number
}
