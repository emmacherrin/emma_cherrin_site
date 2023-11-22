import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(5, .5, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x450BC2 });
const torus = new THREE.Mesh(geometry, material);
torus.position.x = 1; // Adjust this value based on your needs
torus.position.z = -3; // Adjust this value based on your needs


scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50);


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

 //const lightHelper = new THREE.PointLightHelper(pointLight)
 //const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar
var loader = new THREE.TextureLoader();
var imagePath = 'photos/';  // Adjust the path to your "photos" folder

var mats = [
  new THREE.MeshLambertMaterial({ map: loader.load(imagePath + 'teaching.jpeg') }),
  new THREE.MeshLambertMaterial({ map: loader.load(imagePath + 'group_nasa.jpeg') }),
  new THREE.MeshLambertMaterial({ map: loader.load(imagePath + 'showcase.jpeg') }),
  new THREE.MeshLambertMaterial({ map: loader.load(imagePath + 'showcase.jpeg') }),
  new THREE.MeshLambertMaterial({ map: loader.load(imagePath + 'in_ship.jpeg') }),
  new THREE.MeshLambertMaterial({ map: loader.load(imagePath + 'showcase.jpeg') })
];

var geom = new THREE.BoxGeometry(3, 3, 3);
var emma = new THREE.Mesh(geom, mats);

scene.add(emma);

// Block M

const geometry_m = new THREE.PlaneGeometry(1, 1);
const texture_m = new THREE.TextureLoader().load('block_m.png');

// Use MeshBasicMaterial with the loaded texture
const material_m = new THREE.MeshLambertMaterial({ map: loader.load(imagePath + 'block_m.png') });

// Create the plane with the new material
const block_m = new THREE.Mesh(geometry_m, material_m);

block_m.position.x = -2; // Adjust this value based on your needs
block_m.position.z = 7; // Adjust this value based on your needs
block_m.rotateX(30);


// Add the plane to the scene
scene.add(block_m);

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 16;
moon.position.setX(-10);

emma.position.z = -5;
emma.position.x = 2;
//emma.rotateX(30);


// Image "pop up" near the University of Michigan section
var teaching_img = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2), // Adjust the size based on your needs
  new THREE.MeshLambertMaterial({ map: loader.load(imagePath + 'teaching.jpeg') })
);

// Position the image near the University of Michigan section
teaching_img.position.z = 32;
teaching_img.position.x = -3;
teaching_img.rotation.y = Math.PI / 4; // Adjust the angle as needed
scene.add(teaching_img);

// Image "pop up" near the University of Michigan section
var bridgify = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2), // Adjust the size based on your needs
  new THREE.MeshLambertMaterial({ map: loader.load(imagePath + 'bridgify.png') })
);

// Position the image near the University of Michigan section
bridgify.position.z = 38;
bridgify.position.x = -3;
bridgify.rotation.y = Math.PI / 4; // Adjust the angle as needed

scene.add(bridgify);

const foodGeo = new THREE.SphereGeometry(1.2, 40, 30); 

const foodTexture = new THREE.TextureLoader().load(imagePath + 'future_planet_texture.png');
const foodMat = new THREE.MeshStandardMaterial({
  map: foodTexture,
  metalness: .5,
  roughness: 5,
});
const foodMesh = new THREE.Mesh( foodGeo, foodMat ); 
foodMesh.position.z = 47;
foodMesh.position.x = -3;

scene.add(foodMesh);

// Create two additional spheres
const sphere1Geo = new THREE.SphereGeometry(0.25, 32, 32);
const sphere2Geo = new THREE.SphereGeometry(0.25, 32, 32);

// Load texture images
const texture1 = new THREE.TextureLoader().load(imagePath + 'futuristic_black.png');
const texture2 = new THREE.TextureLoader().load(imagePath + 'futuristic_light_grey.png');

// Use MeshStandardMaterial with textures for a shiny look
const sphere1Mat = new THREE.MeshStandardMaterial({
  map: texture1,
  metalness: .5,
  roughness: 0.2,
});
const sphere2Mat = new THREE.MeshStandardMaterial({
  map: texture2,
  metalness: .5,
  roughness: 0.2,
});

const sphere1 = new THREE.Mesh(sphere1Geo, sphere1Mat);
const sphere2 = new THREE.Mesh(sphere2Geo, sphere2Mat);

// Set initial positions for the two spheres relative to foodMesh
const orbitRadius = 1.5; // Adjust the radius of the orbit
const initialAngle = Math.PI / 4; // Adjust the initial angle for positioning

sphere1.position.x = foodMesh.position.x + orbitRadius * Math.cos(initialAngle);
sphere1.position.z = foodMesh.position.z + orbitRadius * Math.sin(initialAngle);

sphere2.position.x = foodMesh.position.x + orbitRadius * Math.cos(-initialAngle);
sphere2.position.z = foodMesh.position.z + orbitRadius * Math.sin(-initialAngle);

// Add the spheres to the scene
scene.add(sphere1);
scene.add(sphere2);

// Directional light positioned near the spheres
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.copy(sphere1.position); // Position the light near the first sphere
scene.add(directionalLight);

// Position the image near the University of Michigan section




// Scroll Animation
var prevScrollY = 0;
var initialBlockRotationX = block_m.rotation.x;
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  const deltaY = window.scrollY - prevScrollY;


  // Adjust the rotation of block_m based on scroll direction
  block_m.rotation.x = Math.max(
    initialBlockRotationX,
    Math.min(block_m.rotation.x + deltaY * 0.001, Math.PI / 2)
  );

  // Update previous scroll position
  prevScrollY = window.scrollY;

  // Update previous scroll position
  prevScrollY = window.scrollY;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
var orbitSpeed = 0.02; // Adjust the speed of the orbit

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  emma.rotation.y += 0.002;

  moon.rotation.x += 0.005;
  foodMesh.rotation.x += 0.005



  // controls.update();

  sphere1.position.x = foodMesh.position.x +  orbitRadius * Math.cos(-1 * orbitSpeed);
  sphere1.position.z = foodMesh.position.z + orbitRadius * Math.sin(-1 * orbitSpeed);
  sphere1.position.y = foodMesh.position.y + orbitRadius * Math.cos(-1 * orbitSpeed);

 
  sphere2.position.x = .05 + foodMesh.position.x + orbitRadius  * Math.cos(orbitSpeed);
  sphere2.position.z = .05 + foodMesh.position.z + orbitRadius  * Math.sin(orbitSpeed);
  sphere2.position.y = .05 + foodMesh.position.y + orbitRadius  * Math.sin(orbitSpeed);

  orbitSpeed += 0.01; // You can adjust this value for different speeds


  renderer.render(scene, camera);
}

animate();
