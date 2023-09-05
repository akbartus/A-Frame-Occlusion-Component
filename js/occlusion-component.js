AFRAME.registerComponent('occlusion-component', {
    schema: {
        occlusionModelUrl: { type: 'string' },
        occlusionModelPosition: { type: 'vec3', default: { x: 0, y: 0, z: -3 } },
        occlusionModelRotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
        occlusionModelScale: { type: 'vec3', default: { x: 1, y: 1, z: 1 } },
        occlusionModelPart: { type: 'boolean', default: false },
        partNames: { type: 'array'},
        occludedModelUrl: { type: 'string' },
        occludedModelPosition: { type: 'vec3', default: { x: 0, y: 0, z: -4 } },
        occludedModelRotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
        occludedModelScale: { type: 'vec3', default: { x: 1, y: 1, z: 1 } }
    },
    init: function () {
        const renderer = document.querySelector("a-scene").renderer;
        const scene = document.querySelector("a-scene").object3D;
        let isPart = this.data.occlusionModelPart;
        let occlusionPartNames = this.data.partNames;
        const loader = new THREE.GLTFLoader();

        // Load the occlusion GLB file
        loader.load(this.data.occlusionModelUrl, function (gltf) {
            let occlusion = gltf.scene;
            scene.add(occlusion);
            occlusion.position.set(
                this.data.occlusionModelPosition.x,
                this.data.occlusionModelPosition.y,
                this.data.occlusionModelPosition.z
            );
            occlusion.rotation.set(
                this.data.occlusionModelRotation.x,
                this.data.occlusionModelRotation.y,
                this.data.occlusionModelRotation.z
            );
            occlusion.scale.set(
                this.data.occlusionModelScale.x,
                this.data.occlusionModelScale.y,
                this.data.occlusionModelScale.z
            );
            console.log(this.data.occlusionModelPart)
            // Traverse the object hierarchy
            gltf.scene.traverse(function (object) {
                if (isPart == false) {
                    // Check if the object has a material
                    if (object.isMesh && object.material) {
                        object.material.colorWrite = false; // Set GLTF occlusion as occlusion
                   
                    }
                } else {
                    if(object.isMesh && object.material){
                        console.log(object.name)
                    }
                    if (object.isMesh && object.material && occlusionPartNames.includes(object.name)) {
                        object.material.colorWrite = false;                                
                    }
                }
            });
        }.bind(this));

        // Load the occluded object GLB file
        loader.load(this.data.occludedModelUrl, function (gltf) {
            let occludedModel = gltf.scene;
            scene.add(occludedModel);
            occludedModel.position.set(
                this.data.occludedModelPosition.x,
                this.data.occludedModelPosition.y,
                this.data.occludedModelPosition.z
            );
            occludedModel.rotation.set(
                this.data.occludedModelRotation.x,
                this.data.occludedModelRotation.y,
                this.data.occludedModelRotation.z
            );
            occludedModel.scale.set(
                this.data.occludedModelScale.x,
                this.data.occludedModelScale.y,
                this.data.occludedModelScale.z
            );
        }.bind(this));
    }
});