import * as THREE from "three";
import { ArcballControls } from "ArcballControls";
import { DragControls } from "DragControls";
import { FirstPersonControls } from "FirstPersonControls";
import { FlyControls } from "FlyControls";
import { MapControls } from "MapControls";
import { OrbitControls } from "OrbitControls";
import { PointerLockControls } from "PointerLockControls";
import { TrackballControls } from "TrackballControls";
import { TransformControls } from "TransformControls";
import { OBJLoader } from "OBJLoader";

// Gilián Erik
// OPD9JB
// h259826
// Kezdés: 2024. 11. 14.

const timeRange = document.getElementById("time-range");

const lampSizes = {
  r: 0.075,
  headR: 0.1,
  height: 3,
  feetHeight: 0.3,
  headHeight: 0.5,
  neckLength: 1,
  supportiveLength: 0.6,
};

const FLOOR_Y = -0.5;
const PLANET_DISTANCE = 15;

let TIME = 0;
let ANIMATE = true;
let WIDTH, HEIGHT, ASPECT_RATIO;
let renderer, controls, scene, camera;

// Textúra betöltő
let textureLoader;

// Teszt objektum
const test = { testGeometry: null, testMaterial: null, testMesh: null };

// Talaj
const floor = { geometry: null, material: null, mesh: null };

// Nap és a hold
const planetHolder = { geometry: null, material: null, mesh: null };
const sun = { geometry: null, material: null, mesh: null, light: null };
const moon = { geometry: null, material: null, mesh: null, light: null };

// Lámpa
const lamp = { geometry: null, material: null, mesh: null };
const lampFeet = { geometry: null, material: null, mesh: null };
const lampBody = { geometry: null, material: null, mesh: null };
const lampJoint = { geometry: null, material: null, mesh: null };
const lampNeck = { geometry: null, material: null, mesh: null };
const lampHead = { geometry: null, material: null, mesh: null };

init();
animate();

//*------------------------------------------------------------------------------------------------------------------
//* Elemek inicializálasa
//*------------------------------------------------------------------------------------------------------------------
function init() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  ASPECT_RATIO = WIDTH / HEIGHT;

  //* Renderer létrehozása
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  //* Scene beállítása
  scene = new THREE.Scene();

  //* Kamera beállítása
  camera = new THREE.PerspectiveCamera(75, ASPECT_RATIO, 0.1, 1000);
  camera.position.z = 12;
  camera.lookAt(scene.position);

  //* Textúra betöltés
  textureLoader = new THREE.TextureLoader();

  //* Teszt objektum betöltése
  test.geometry = new THREE.BoxGeometry(1, 1, 1);
  test.material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
  });
  test.mesh = new THREE.Mesh(test.geometry, test.material);
  test.mesh.castShadow = true;
  test.mesh.receiveShadow = false;
  //scene.add(test.mesh);

  //* Ambient light
  let ambientLight = new THREE.AmbientLight(0x202020, Math.PI);
  scene.add(ambientLight);

  //* Padló hozzáadása
  let floorTexture = textureLoader.load("../assets/materials/red_sand.jpg");
  floor.geometry = new THREE.PlaneGeometry(10, 10);
  floor.material = new THREE.MeshPhongMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
    shininess: 1,
  });
  floor.mesh = new THREE.Mesh(floor.geometry, floor.material);
  floor.mesh.castShadow = false;
  floor.mesh.receiveShadow = true;
  floor.mesh.rotation.x = -Math.PI / 2;
  floor.mesh.position.y = FLOOR_Y;
  scene.add(floor.mesh);

  //* Nap hozzáadása
  let sunTexture = textureLoader.load("../assets/materials/sun.jpg");
  sun.geometry = new THREE.SphereGeometry(1, 50, 50);
  sun.material = new THREE.MeshPhongMaterial({
    map: sunTexture,
    emissiveMap: sunTexture,
    emissive: 0xffff00,
    emissiveIntensity: 2,
  });
  sun.mesh = new THREE.Mesh(sun.geometry, sun.material);
  sun.mesh.position.y = PLANET_DISTANCE;
  sun.light = new THREE.PointLight(0xffffff, 500, 1000);
  sun.light.castShadow = true;
  sun.light.position.y = PLANET_DISTANCE;
  sun.light.lookAt(new THREE.Vector3(0, -1, 0));

  //* Hold hozzáadása
  let moonTexture = textureLoader.load("../assets/materials/moon.jpg");
  moon.geometry = new THREE.SphereGeometry(1, 50, 50);
  moon.material = new THREE.MeshPhongMaterial({
    map: moonTexture,
    emissiveMap: moonTexture,
    emissive: 0xffffff,
    emissiveIntensity: 1,
  });
  moon.mesh = new THREE.Mesh(moon.geometry, moon.material);
  moon.mesh.position.y = -PLANET_DISTANCE;
  moon.light = new THREE.PointLight(0x87ceeb, 25, 1000);
  moon.light.castShadow = true;
  moon.light.position.y = -PLANET_DISTANCE;
  moon.light.lookAt(new THREE.Vector3(0, -1, 0));

  //* PlanetHolder hozzáadása
  planetHolder.geometry = new THREE.SphereGeometry(0, 1, 1);
  planetHolder.material = new THREE.MeshNormalMaterial();
  planetHolder.mesh = new THREE.Mesh(
    planetHolder.geometry,
    planetHolder.material
  );
  planetHolder.mesh.position.y = FLOOR_Y;
  planetHolder.mesh.add(sun.mesh);
  planetHolder.mesh.add(sun.light);
  planetHolder.mesh.add(moon.mesh);
  planetHolder.mesh.add(moon.light);
  scene.add(planetHolder.mesh);

  //* Lámpa hozzáadása
  //Lámpa alja
  lampFeet.geometry = new THREE.CylinderGeometry(
    lampSizes.r,
    lampSizes.r * 3,
    lampSizes.feetHeight,
    20
  );
  lampFeet.material = new THREE.MeshNormalMaterial({
    wireframe: true,
  });
  lampFeet.mesh = new THREE.Mesh(lampFeet.geometry, lampFeet.material);
  lampFeet.mesh.position.y = lampFeet.geometry.parameters.height / 2;
  //Lámpa teste
  lampBody.geometry = new THREE.CylinderGeometry(
    lampSizes.r,
    lampSizes.r,
    lampSizes.height,
    20
  );
  lampBody.material = new THREE.MeshNormalMaterial({
    wireframe: true,
  });
  lampBody.mesh = new THREE.Mesh(lampBody.geometry, lampBody.material);
  lampBody.mesh.position.y = lampSizes.height / 2;
  //Lámpa izülete
  lampJoint.geometry = new THREE.SphereGeometry(lampSizes.r, 20, 20);
  lampJoint.material = new THREE.MeshNormalMaterial({
    wireframe: true,
  });
  lampJoint.mesh = new THREE.Mesh(lampJoint.geometry, lampJoint.material);
  lampJoint.mesh.position.y = lampSizes.height;
  //Lámpa nyaka
  lampNeck.geometry = new THREE.CylinderGeometry(
    lampSizes.r,
    lampSizes.r,
    lampSizes.neckLength,
    20
  );
  lampNeck.material = new THREE.MeshNormalMaterial({
    wireframe: true,
  });
  lampNeck.mesh = new THREE.Mesh(lampNeck.geometry, lampNeck.material);
  lampNeck.mesh.position.y = lampSizes.height;
  lampNeck.mesh.position.x = -lampSizes.neckLength / 2;
  lampNeck.mesh.rotation.z = Math.PI / 2;
  //Lámpa feje
  lampHead.geometry = new THREE.CylinderGeometry(
    lampSizes.headR,
    lampSizes.headR * 3,
    lampSizes.headHeight,
    20
  );
  lampHead.material = new THREE.MeshNormalMaterial({
    wireframe: true,
  });
  lampHead.mesh = new THREE.Mesh(lampHead.geometry, lampHead.material);
  lampHead.mesh.position.y = lampSizes.height;
  lampHead.mesh.position.x = -lampSizes.neckLength;
  //Lámpa tartó
  lamp.geometry = new THREE.SphereGeometry(0, 1, 1);
  lamp.material = new THREE.MeshNormalMaterial();
  lamp.mesh = new THREE.Mesh(lamp.geometry, lamp.material);
  lamp.mesh.position.y = FLOOR_Y;
  lamp.mesh.add(lampFeet.mesh);
  lamp.mesh.add(lampBody.mesh);
  lamp.mesh.add(lampJoint.mesh);
  lamp.mesh.add(lampNeck.mesh);
  lamp.mesh.add(lampHead.mesh);
  scene.add(lamp.mesh);

  //* OrbitControls beállítása
  controls = new OrbitControls(camera, renderer.domElement);

  //* Eventek beállítása
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", keyEvents);

  //* Időállító csúszka beállítása
  timeRange.value = 0;
  timeRange.min = -Math.PI;
  timeRange.max = Math.PI;
  timeRange.step = 0.05;
  timeRange.addEventListener("input", timeChange);
}

//*------------------------------------------------------------------------------------------------------------------
//* Animáció
//*------------------------------------------------------------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  //* Nap és hol forgatása
  planetHolder.mesh.rotation.z = -TIME;
  if (ANIMATE) {
    sun.mesh.rotation.y += 0.01;
    sun.mesh.rotation.z += 0.01;
    moon.mesh.rotation.y += 0.02;
    moon.mesh.rotation.z += 0.02;
  }

  controls.update();
  render();
}

//*------------------------------------------------------------------------------------------------------------------
//* Renderelés
//*------------------------------------------------------------------------------------------------------------------
function render() {
  renderer.render(scene, camera);
}

//*------------------------------------------------------------------------------------------------------------------
//* Ablak átméretezése
//*------------------------------------------------------------------------------------------------------------------
function resize() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  ASPECT_RATIO = WIDTH / HEIGHT;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = ASPECT_RATIO;
  camera.updateProjectionMatrix();

  render();
}

//*------------------------------------------------------------------------------------------------------------------
//* Idő beállítása
//*------------------------------------------------------------------------------------------------------------------
function timeChange(e) {
  TIME = e.target.value;
}

//*------------------------------------------------------------------------------------------------------------------
//* Billentyű események
//*------------------------------------------------------------------------------------------------------------------
function keyEvents(e) {
  //console.log(e);

  if (e.key == "i") return hideInfos();
  if (e.key == "r") return controls.reset();
  if (e.key == "p") return (ANIMATE = !ANIMATE);
  if (e.key == "ArrowRight" && !TIME_CHANGE) {
    TARGET_TIME -= Math.PI / TIME_INTERVAL;
    TIME_STEP = -Math.abs(TIME_STEP);
    TIME_CHANGE = true;
    return;
  }
  if (e.key == "ArrowLeft" && !TIME_CHANGE) {
    TARGET_TIME += Math.PI / TIME_INTERVAL;
    TIME_STEP = Math.abs(TIME_STEP);
    TIME_CHANGE = true;
    return;
  }
}

function hideInfos() {
  const infos = document.getElementsByClassName("info");
  for (const info of infos) {
    info.classList.toggle("hide");
  }
}
