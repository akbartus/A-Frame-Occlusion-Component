import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Sets orbit control to move the camera around
const controls1 = new OrbitControls(camera, renderer.domElement);
controls1.enableDamping = true;
controls1.dampingFactor = 0.12;
controls1.enableZoom = false;

const controls2 = new TrackballControls(camera, renderer.domElement);

controls2.noRotate = true;
controls2.noPan = true;
controls2.noZoom = false;
controls2.zoomSpeed = 1.5;

// Camera positioning
camera.position.set(0, 4, 14);

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);




const boxGeometry = new THREE.BoxGeometry(5, 5);
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x8431d6});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.position.z = -8;
box.position.x = 0;

const planeGeometry = new THREE.PlaneGeometry(6, 4);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x31d6aa,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.position.z = 0;
plane.material.colorWrite = true;



plane.renderOrder = 1;
// ring.renderOrder = 1;
// box.renderOrder = 2;

const loader = new GLTFLoader();

// Load the GLB file
loader.load("../3d/Xbot.glb", function (gltf) {
  let model1 = gltf.scene;
  scene.add(model1);
  model1.scale.set(2, 2, 2);
  model1.position.z = 1;

  // Traverse the object hierarchy
  gltf.scene.traverse(function (object) {
    // Check if the object has a material
    if (object.isMesh && object.material) {
     
      object.material.colorWrite = false;
    }
  });
  gltf.scene.renderOrder = 0;
});



const clock = new THREE.Clock();

function animate() {
 
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
