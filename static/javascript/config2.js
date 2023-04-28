const config = {
    path: 'data/dogs.json',
    scene: {
        root: '.background',
        // debug: true,
        fog: {
            enabled: false,
            density: .02,
            color: 'hsl(0, 0%, 20%)',
        },
        backgroundColor: 'hsl(0, 0%, 10%)',
        node: {
            geometry: 'sphere', // box, dodecahedron, icosahedron, octahedron, sphere
            size: .2,
            color: '#FF91AF', //hsl(160, 50%, 70%)', // #fe369c, 0xfe369c, rgb(100, 210, 0)
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
            // color: '#FF91AF', //hsl(280, 30%, 30%)',
            startColor: '#FF91AF', //hsl(280, 30%, 30%)',
            endColor: 'hsl(180, 40%, 20%)',
            opacity: .75,
        },
    }
};
