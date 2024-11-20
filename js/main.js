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

import Floor from "./components/Floor.js";
import PlanetHolder from "./components/PlanetHolder.js";
import Lamp from "./components/Lamp.js";
import SkyBox from "./components/SkyBox.js";
import TrashPillar from "./components/TrashPillar.js";

// Gilián Erik
// OPD9JB
// h259826
// Kezdés: 2024. 11. 14.

const timeRange = document.getElementById("time-range");
const hourSpan = document.getElementById("hour-span");

let SCREEN_WIDTH;
let SCREEN_HEIGHT;
let SCREEN_ASPECT_RATIO;
let FLOOR_Y = -0.5;
let LIGHT_ON = true;
let TIME = 12;
let TIMES = {};
let ANIMATE = true;
let t = -12;
for (let i = 0; i < 25; i++) {
  TIMES[i] = t;
  t++;
}

let renderer;
let scene;
let camera;
let controls;
let ambientLight;

let skybox;
let floor;
let planetHolder;
let lamp_1;
let lamp_2;
let trashs = [];

init();
animate();

function init() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;
  SCREEN_ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

  //* Renderer beállítása
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  //* Scene beállítása
  scene = new THREE.Scene();

  //* Camera beállítása
  camera = new THREE.PerspectiveCamera(75, SCREEN_ASPECT_RATIO, 0.1, 1000);
  camera.position.z = 12;
  camera.lookAt(scene.position);

  //* Controls beállítása
  controls = new OrbitControls(camera, renderer.domElement);

  //* Ambient light beállítása
  ambientLight = new THREE.AmbientLight(0x202020, Math.PI);
  scene.add(ambientLight);

  //* SkyBox beállítása
  skybox = new SkyBox();
  scene.add(skybox.mesh);

  //* Floor beállítása
  floor = new Floor(10, 10);
  floor.mesh.position.y = FLOOR_Y - floor.mesh.geometry.parameters.depth / 2;
  scene.add(floor.mesh);

  //* PlanetHolder beállítása
  planetHolder = new PlanetHolder(15);
  planetHolder.mesh.position.y = FLOOR_Y;
  scene.add(planetHolder.mesh);

  //* Lámpa beállítása
  lamp_1 = new Lamp(2.5, FLOOR_Y, -2.5, Math.PI / 4);
  lamp_2 = new Lamp(-2.5, FLOOR_Y, -2.5, Math.PI - Math.PI / 4);
  scene.add(lamp_1.mesh);
  scene.add(lamp_2.mesh);

  //* TrashPillar beállítása
  const a = new TrashPillar(4, 2);
  a.mesh.rotation.y = Math.PI / 2;
  a.mesh.position.set(-5, FLOOR_Y, 5);
  trashs.push(a);

  const b = new TrashPillar(6, 6);
  b.mesh.position.set(-5, FLOOR_Y, -5);
  trashs.push(b);

  const c = new TrashPillar(5, 4);
  c.mesh.position.set(5, FLOOR_Y, -5);
  c.mesh.rotation.y = (Math.PI / 2) * 3;
  trashs.push(c);

  trashs.map((trash) => scene.add(trash.mesh));

  //* Eventek beállítása
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", keyEvents);

  //* Időállító csúszka beállítása
  timeRange.value = 12;
  timeRange.min = 0;
  timeRange.max = 24;
  timeRange.step = 1;
  timeRange.addEventListener("input", timeChange);
}

//*------------------------------------------------------------------------------------------------------------------
//* Animációk
//*------------------------------------------------------------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  planetHolder.animate(((Math.PI * 2) / 24) * TIMES[TIME], ANIMATE, TIME);

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
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;
  SCREEN_ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  camera.aspect = SCREEN_ASPECT_RATIO;
  camera.updateProjectionMatrix();

  render();
}

//*------------------------------------------------------------------------------------------------------------------
//* Billentyű események
//*------------------------------------------------------------------------------------------------------------------
function keyEvents(e) {
  if (e.key == "i") return hideInfos();
  if (e.key == "r") return controls.reset();
  if (e.key == "t") {
    timeRange.value = 12;
    TIME = 12;
    hourSpan.innerHTML = `${12}:00`;
    return;
  }
  if (e.key == "p") return (ANIMATE = !ANIMATE);
  if (e.key == "l") {
    LIGHT_ON = !LIGHT_ON;
    lamp_1.turnLight(LIGHT_ON);
    lamp_2.turnLight(LIGHT_ON);
  }
}

function hideInfos() {
  const infos = document.getElementsByClassName("info");
  for (const info of infos) {
    info.classList.toggle("hide");
  }
}

function timeChange(e) {
  TIME = e.target.value;
  hourSpan.innerHTML = `${e.target.value}:00`;
}
