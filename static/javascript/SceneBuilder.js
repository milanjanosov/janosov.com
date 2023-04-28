// glow:
// http://pyramidsoftwaresolutions.com/webgl-threejs-blur-tutorial.html
// https://kadekeith.me/2017/09/12/three-glow.html

import * as THREE from 'three';
import { MathUtils } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'stats.js';

export class SceneBuilder {
    constructor(network, config) {
        this.config = config;
        this.network = network;
        this.animationStep = 0;
        this.maxStep = 200;
        this.scene = new THREE.Scene();
        const brightLightColor = new THREE.Color('hsl(0, 0%, 100%)');
        const lightColor = new THREE.Color('hsl(0, 0%, 90%)');
        this.scene.background = new THREE.Color(this.config.backgroundColor);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
        this.camera.position.set(0, 0, -35);
        this.camera.lookAt(0, 0, 0);
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.physicallyCorrectLights = true;
        if (typeof this.config.root !== 'undefined') {
            document.querySelector(this.config.root).appendChild(this.renderer.domElement);
        } else {
            document.body.appendChild(this.renderer.domElement);
        }

        const ambientLight = new THREE.AmbientLight(lightColor, .5);
        this.camera.add(ambientLight);

        const hsLight = new THREE.HemisphereLight(lightColor, lightColor, 1);
        hsLight.position.set(0, 20, 0);
        this.camera.add(hsLight);

        const directionalLight1 = new THREE.DirectionalLight(lightColor);
        directionalLight1.position.set(0, 3, -8);
        this.camera.add(directionalLight1);
        const directionalLight2 = new THREE.DirectionalLight(lightColor);
        directionalLight2.position.set(-6, -6, -4);
        this.camera.add(directionalLight2);

        this.orbitControls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.orbitControls.autoRotate = true;
        this.orbitControls.addEventListener('start', () => { this.orbitControls.autoRotate = false; });
        this.orbitControls.update();

        const nodeGeometry = this.makeGeometry();
        const nodeMaterial = this.makeNodeMaterial();
        if (this.config.node.opacity < 1) {
            nodeMaterial.transparent = true;
            nodeMaterial.opacity = this.config.node.opacity;
        }
        this.linkMaterial = null;
        if (this.config.link.startColor && this.config.link.endColor) {
            this.linkMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    startColor: {
                        type: 'c',
                        value: new THREE.Color(this.config.link.startColor),
                    },
                    endColor: {
                        type: 'c',
                        value: new THREE.Color(this.config.link.endColor),
                    },
                    opacity: {
                        type: 'f',
                        value: this.config.link.opacity,
                    }
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }`,
                fragmentShader: `
                    uniform vec3 startColor;
                    uniform vec3 endColor;
                    uniform float opacity;
                    varying vec2 vUv;
                    void main() {
                        gl_FragColor = vec4(mix(startColor, endColor, vUv.x), opacity);
                    }`,
            });
        } else {
            this.linkMaterial = new THREE.LineBasicMaterial({ color: new THREE.Color(this.config.link.color) });
        }
        if (this.config.link.opacity < 1) {
            this.linkMaterial.transparent = true;
            this.linkMaterial.opacity = this.config.link.opacity;
        }
        this.nodes = new THREE.Group();
        this.network.graph.forEachNode(node => {
            const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
            mesh.position.copy(this.network.layout.getNodePosition(node.id));
            if (this.config.node.texture !== null) {
                mesh.rotateX(MathUtils.randFloat(0, Math.PI * 2));
                mesh.rotateY(MathUtils.randFloat(0, Math.PI * 2));
                mesh.rotateZ(MathUtils.randFloat(0, Math.PI * 2));
            }
            this.nodes.add(mesh);
        });
        this.scene.add(this.nodes);
        this.links = new THREE.Group();
        this.network.graph.forEachLink(link => {
            const pos = this.network.layout.getLinkPosition(link.id);
            const curve = new THREE.LineCurve3(
                new THREE.Vector3(pos.from.x, pos.from.y, pos.from.z),
                new THREE.Vector3(pos.to.x, pos.to.y, pos.to.z)
            );
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(6);
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const s = new THREE.Color(this.config.link.startColor);
            const e = new THREE.Color(this.config.link.endColor);
            const colors = new Float32Array([
                s.r, s.g, s.b,
                e.r, e.g, e.b
            ]);
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setDrawRange(0, 2);
            const linkMaterial = new THREE.LineBasicMaterial({
                linewidth: 20,
                vertexColors: true,
            });
            const line = new THREE.Line(geometry, linkMaterial);
            this.links.add(line);
        });
        this.scene.add(this.links);

        if (this.config.fog.enabled) {
            this.scene.fog = new THREE.FogExp2(
                new THREE.Color(this.config.fog.color),
                this.config.fog.density
            );
        }

        if (this.config.debug) {
            this.stats = new Stats();
            this.stats.showPanel(0);
            document.body.appendChild(this.stats.dom);
        }
        this.update();
    }

    makeGeometry() {
        if (this.config.node.geometry === 'sphere')
            return new THREE.SphereGeometry(this.config.node.size);
        else if (this.config.node.geometry === 'box')
            return new THREE.BoxGeometry(this.config.node.size, this.config.node.size, this.config.node.size);
        else if (this.config.node.geometry === 'dodecahedron')
            return new THREE.DodecahedronGeometry(this.config.node.size);
        else if (this.config.node.geometry === 'icosahedron')
            return new THREE.IcosahedronGeometry(this.config.node.size);
        else if (this.config.node.geometry === 'octahedron')
            return new THREE.OctahedronGeometry(this.config.node.size);
    }

    makeNodeMaterial() {
        let nodeMaterial;
        if (this.config.node.texture !== null) {
            const loader = new THREE.TextureLoader();
            const options = { map: loader.load(this.config.node.texture.map) };
            if (typeof this.config.node.texture.bumpMap !== 'undefined')
                options.bumpMap = loader.load(this.config.node.texture.bumpMap);
            if (typeof this.config.node.texture.displacementMap !== 'undefined') {
                options.displacementMap = loader.load(this.config.node.texture.displacementMap);
                options.displacementScale = this.config.node.texture.displacementScale;
            }
            if (typeof this.config.node.texture.normalMap !== 'undefined')
                options.normalMap = loader.load(this.config.node.texture.normalMap);
            nodeMaterial = new THREE.MeshPhongMaterial(options);
        } else {
            nodeMaterial = new THREE.MeshLambertMaterial({ color: new THREE.Color(this.config.node.color) });
        }
        return nodeMaterial;
    }

    update() {
        this.stats?.begin()
        if (this.animationStep < this.maxStep) {
            let i = 0;
            this.network.layout.step();

            this.network.graph.forEachNode(node => {
                this.nodes.children[i].position.copy(this.network.layout.getNodePosition(node.id));
                i++;
            });

            i = 0;
            this.network.graph.forEachLink(link => {
                const newPos = this.network.layout.getLinkPosition(link.id);
                const pos = this.links.children[i].geometry.attributes.position;
                pos.array = new Float32Array([newPos.from.x, newPos.from.y, newPos.from.z, newPos.to.x, newPos.to.y, newPos.to.z]);
                pos.needsUpdate = true;
                i++;
            });

            this.animationStep++;
        }
        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
        this.stats?.end()
        requestAnimationFrame(() => { this.update(); });
    }
}
