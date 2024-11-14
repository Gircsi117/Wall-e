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

const FLOOR_Y = -0.5;
const PLANET_DISTANCE = 10;
let ANIMATE = true;

let TIME = 0;

let WIDTH, HEIGHT, ASPECT_RATIO;
let renderer, controls, scene, camera;

const test = { testGeometry: null, testMaterial: null, testMesh: null };
const floor = { geometry: null, material: null, mesh: null };
const planetHolder = { geometry: null, material: null, mesh: null };
const sun = { geometry: null, material: null, mesh: null };
const moon = { geometry: null, material: null, mesh: null };

init();
animate();

//*------------------------------------------------------------------------------------------------------------------
//* Elemek inicializálasa
//*------------------------------------------------------------------------------------------------------------------
function init() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  ASPECT_RATIO = WIDTH / HEIGHT;

  // Renderer létrehozása
  renderer = new THREE.WebGLRenderer({ antialias: true });
  //renderer.setClearColor(0x40a6e3);
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);

  // Scene beállítása
  scene = new THREE.Scene();

  // Kamera beállítása
  camera = new THREE.PerspectiveCamera(75, ASPECT_RATIO, 0.1, 1000);
  camera.position.z = 12;
  camera.lookAt(scene.position);

  //Teszt objektum betöltése
  /*testGeometry = new THREE.SphereGeometry(7, 50, 50);
  testMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  testMesh = new THREE.Mesh(testGeometry, testMaterial);
  scene.add(testMesh);*/

  //Padló hozzáadása
  floor.geometry = new THREE.PlaneGeometry(10, 10);
  floor.material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });
  floor.mesh = new THREE.Mesh(floor.geometry, floor.material);
  floor.mesh.rotation.x = -Math.PI / 2;
  floor.mesh.position.y = FLOOR_Y;
  scene.add(floor.mesh);

  // Nap hozzáadása
  sun.geometry = new THREE.SphereGeometry(1, 50, 50);
  sun.material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
  });
  sun.mesh = new THREE.Mesh(sun.geometry, sun.material);
  sun.mesh.position.y = PLANET_DISTANCE;

  // Hold hozzáadása
  moon.geometry = new THREE.SphereGeometry(1, 50, 50);
  moon.material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });
  moon.mesh = new THREE.Mesh(moon.geometry, moon.material);
  moon.mesh.position.y = -PLANET_DISTANCE;

  // PlanetHolder hozzáadása
  planetHolder.geometry = new THREE.SphereGeometry(0, 1, 1);
  planetHolder.material = new THREE.MeshNormalMaterial();
  planetHolder.mesh = new THREE.Mesh(
    planetHolder.geometry,
    planetHolder.material
  );
  planetHolder.mesh.position.y = FLOOR_Y;

  planetHolder.mesh.add(sun.mesh);
  planetHolder.mesh.add(moon.mesh);
  scene.add(planetHolder.mesh);

  // OrbitControls beállítása
  controls = new OrbitControls(camera, renderer.domElement);

  // Eventek beállítása
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", keyEvents);

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

  controls.update();
  render();
}

//*------------------------------------------------------------------------------------------------------------------
//* Renderelés
//*------------------------------------------------------------------------------------------------------------------
function render() {
  planetHolder.mesh.rotation.z = -TIME;

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
