# A-Frame-Occlusion-Component
<img alt="Screenshot" src="img/screenshot.jpg" width="600">

### **Description / Rationale**
This is the A-Frame component, which lets achieve occlusion effects. It can be useful specifically in webAR related projects.     

### **Instructions**
The component has the following attributes:
* occlusionModelUrl: { type: 'string' } - url to a gltf model, which will serve as occlusion model.
* occlusionModelPosition: { type: 'vec3', default: { x: 0, y: 0, z: -3 } } - occlusion model position.
* occlusionModelRotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } } - occlusion model rotation.
* occlusionModelScale: { type: 'vec3', default: { x: 1, y: 1, z: 1 } } - occlusion model scale.
* occlusionModelPart: { type: 'boolean', default: false } - indicate if specific part/s of the occlusion model will serve for occlusion (i.e. whether only part/s of the model should serve for occlusion). 
* partNames: { type: 'array'} - if occlusionModelPart is true, then include the names of the parts of occlusion model, which will serve for occlusion.
* occludedModelUrl: { type: 'string' } - url to gltf model which will be occluded by occlusion model.
* occludedModelPosition: { type: 'vec3', default: { x: 0, y: 0, z: -4 } } - occluded model position. 
* occludedModelRotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } } - occluded model rotation.
* occludedModelScale: { type: 'vec3', default: { x: 1, y: 1, z: 1 } } - occluded model scale.
To see component at work, include "occlusion-component" to a-entity.

Below a detailed implementation of the component is given: 
```
<html>
<head>
    <title>A-Frame Occlusion Component</title>
    <script src='https://aframe.io/releases/1.4.2/aframe.min.js'></script>
    <script src='https://cdn.jsdelivr.net/gh/akbartus/A-Frame-Occlusion-Component/js/occlusion-component.js'></script>
</head>
<body>
    <a-scene>
        <a-entity occlusion-component="occlusionModelUrl: https://cdn.glitch.global/e8ae677c-5258-4984-ad8d-347b2293a371/plane.glb;
                                      occludedModelUrl: https://cdn.glitch.global/e8ae677c-5258-4984-ad8d-347b2293a371/xbot.glb;
                                      occlusionModelPosition: 0 1 -3;
                                      occlusionModelRotation: 0 0 0;
                                      occlusionModelScale: 2 2 2;
                                      occlusionModelPart: false;
                                      partNames: Beta_Surface; 
                                      occludedModelPosition: 0 0 -4;
                                      occludedModelRotation: 0 0 0;
                                      occludedModelScale: 2 2 2;"></a-entity>
        <a-entity occlusion-component="occlusionModelUrl: https://cdn.glitch.global/e8ae677c-5258-4984-ad8d-347b2293a371/sphere.glb;
                                      occludedModelUrl: https://cdn.glitch.global/e8ae677c-5258-4984-ad8d-347b2293a371/box.glb;
                                      occlusionModelPosition: -3 1 -3;
                                      occlusionModelRotation: 0 0 0;
                                      occlusionModelScale: 1 1 1;
                                      occlusionModelPart: false;
                                      occludedModelPosition: -3 1 -3.5;
                                      occludedModelRotation: 0 0 0;
                                      occludedModelScale: 2 2 2;"></a-entity>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="8" height="4" color="#7BC8A4"></a-plane>
        <a-sky color='#ECECEC'></a-sky>
    </a-scene>
</body>
</html>
```
In addition, a sample implementation of occlusion is provided for Three.js.
Note: When making more complex gltf file as occluder (not plane or other primitives), the component might not work properly. This issue will be adressed soon.  

### **Tech Stack**
The project is powered by AFrame and Three.js

### **Demo**
To see the application at work: [Demo application](https://occlusion-component.glitch.me/)
