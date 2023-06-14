const config = {
    debug: true,
    path: 'data/dogs.json',
    scene: {
        backgroundColor: 'hsl(0, 0%, 10%)',
        node: {
            geometry: 'sphere', // box, dodecahedron, icosahedron, octahedron, sphere
            size: .1,
            color: '#0DF205', // #fe369c, 0xfe369c, rgb(100, 210, 0)
            opacity: 1,
            texture: null,
            // texture: {
            //     map: 'assets/textures/Rock_047_SD/Rock_047_BaseColor.jpg',
            //     bumpMap: 'assets/textures/Rock_047_SD/Rock_047_Roughness.jpg',
            //     displacementMap: 'assets/textures/Rock_047_SD/Rock_047_Height.png',
            //     displacementScale: .1,
            //     normalMap: 'assets/textures/Rock_047_SD/Rock_047_Normal.jpg',
            // },
        },
        link: {
            thickness: .02,
            color: 'hsl(120, 30%, 30%)',
            opacity: 1,
        },
        root: 'network',
        width: 800,
        height: 600,
        initialWait: 0, //2000,
        maxStep: 300,
    },
    physicsSettings: {
        timeStep: .2,
        dimensions: 3,
        gravity: -0.1,
        theta: .1,
        springLength: 1,
        springCoefficient: 2,
        dragCoefficient: 1,
    },
};
