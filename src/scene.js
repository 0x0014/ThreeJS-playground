import * as THREE from 'three';
import * as Controls from 'three-controls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const geometry = new THREE.BoxGeometry();

// shapes
const crazyBox = new THREE.DodecahedronGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const material2 = new THREE.MeshPhongMaterial({ color: 0XBC8F8F });
const cube = new THREE.Mesh(geometry, material);
const dodeca = new THREE.Mesh(crazyBox, material2);
const shapes = [cube, dodeca];

// light
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

let renderer;

scene.add(cube, dodeca);
camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  shapes.forEach(element => {
    element.rotation.x += 0.01;
    element.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
};

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

const addToScene = () => {
    let x = 0;
    shapes.forEach(element => {
        scene.add(element);
       
        element.position.x = x;
        x = x +  2;
    });
}

// mount to canvas on load
export const createScene = (el) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  addToScene();
  resize();
  animate();
  let controls = new Controls.DragControls( [ ... shapes ], camera, renderer.domElement );
  controls.addEventListener( 'drag', render );
}

window.addEventListener('resize', resize);