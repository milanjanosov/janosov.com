import createGraph from 'ngraph.graph';
import createLayout from 'ngraph.forcelayout';

export class Network {
    constructor(data, physicsSettings) {
        this.data = data;
        this.graph = createGraph();
        this.data.nodes.forEach(node => {
            this.graph.addNode(node.id);
        });
        this.data.links.forEach(link => {
            this.graph.addLink(link.source, link.target);
        });
        this.layout = createLayout(this.graph, physicsSettings);
        for (let i = 0; i < 50; i++) {
            this.layout.step();
        }
    }
}
