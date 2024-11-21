import * as THREE from "three";

class BusPath {
  points = [
    new THREE.Vector3(0, -0.5, 0),
    new THREE.Vector3(20, -0.5, 0),
    new THREE.Vector3(20, -0.5, 10),
    new THREE.Vector3(13, -0.5, 13),
    new THREE.Vector3(10, -0.5, 20),
    new THREE.Vector3(0, -0.5, 20),
    new THREE.Vector3(-10, -0.5, 20),
    new THREE.Vector3(-13, -0.5, 13),
    new THREE.Vector3(-20, -0.5, 10),
    new THREE.Vector3(-20, -0.5, 0),
    new THREE.Vector3(0, -0.5, 0),
  ];

  path;

  geometry;
  material;
  mesh;

  constructor() {
    this.path = new THREE.CatmullRomCurve3(this.points);

    this.geometry = new THREE.BufferGeometry().setFromPoints(this.path.getPoints(50));
    this.material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Line(this.geometry, this.material);
    this.mesh.visible = false;
  }
}

export default BusPath;
