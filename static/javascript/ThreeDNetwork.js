import { Network } from './Network.js';
import { SceneBuilder } from './SceneBuilder.js';
import { defaults } from './default.js';

export class ThreeDNetwork {
    constructor(options) {
        const config = {...defaults, ...options};
        fetch(config.path)
            .then(response => response.json())
            .then(data => {
                const network = new Network(data, config.physicsSettings);
                this.sceneBuilder = new SceneBuilder(network, config.scene);
            });
    }
}
