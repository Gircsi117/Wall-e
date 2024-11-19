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

// Gilián Erik
// OPD9JB
// h259826
// Kezdés: 2024. 11. 14.

const timeRange = document.getElementById("time-range");

let SCREEN_WIDTH;
let SCREEN_HEIGHT;
let SCREEN_ASPECT_RATIO;
let FLOOR_Y = -0.5;
let PLANET_ROTATION = 0;

let renderer;
let scene;
let camera;
let controls;
let ambientLight;

let floor;
let planetHolder;
let lamp_1;
let lamp_2;

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

  //* Floor beállítása
  floor = new Floor(10, 10);
  floor.mesh.position.y = FLOOR_Y;
  scene.add(floor.mesh);

  //* Planet holder beállítása
  planetHolder = new PlanetHolder(15);
  planetHolder.mesh.position.y = FLOOR_Y;
  scene.add(planetHolder.mesh);

  //* Lámpa beállítása
  lamp_1 = new Lamp(2.5, FLOOR_Y, -2.5, Math.PI / 4);
  lamp_2 = new Lamp(-2.5, FLOOR_Y, -2.5, Math.PI - Math.PI / 4);
  scene.add(lamp_1.mesh);
  scene.add(lamp_2.mesh);

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
//* Animációk
//*------------------------------------------------------------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  planetHolder.animate(PLANET_ROTATION);

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
  //console.log(e);

  if (e.key == "i") return hideInfos();
  if (e.key == "r") return controls.reset();
  if (e.key == "t") {
    timeRange.value = 0;
    PLANET_ROTATION = 0;
    return;
  }
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

function timeChange(e) {
  PLANET_ROTATION = e.target.value;
}
