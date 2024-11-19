import * as THREE from "three";
import ThreeObject from "./ThreeObject.js";

class Lamp {
  geometry;
  material;
  mesh;

  feet = new ThreeObject();
  body = new ThreeObject();
  joint = new ThreeObject();
  neck = new ThreeObject();
  head = new ThreeObject();

  light;

  constructor(x, y, z, rotation) {
    const r = 0.075;
    const headR = 0.1;
    const height = 3;
    const feetHeight = 0.3;
    const headHeight = 0.5;
    const neckLength = 1;
    const se = 20;

    this.geometry = new THREE.SphereGeometry(0, 1, 1);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.set(x, y, z);
    this.mesh.rotation.y = rotation;

    const lampMaterial = new THREE.MeshNormalMaterial({
      wireframe: true,
    });

    //* Feet
    this.feet.geometry = new THREE.CylinderGeometry(r, r * 3, feetHeight, se);
    this.feet.material = lampMaterial;
    this.feet.mesh = new THREE.Mesh(this.feet.geometry, this.feet.material);
    this.feet.mesh.position.y += feetHeight / 2;

    //* Body
    this.body.geometry = new THREE.CylinderGeometry(r, r, height, se);
    this.body.material = lampMaterial;
    this.body.mesh = new THREE.Mesh(this.body.geometry, this.body.material);
    this.body.mesh.position.y += height / 2;

    //* Joint
    this.joint.geometry = new THREE.SphereGeometry(r, se, se);
    this.joint.material = lampMaterial;
    this.joint.mesh = new THREE.Mesh(this.joint.geometry, this.joint.material);
    this.joint.mesh.position.y = height;

    //* Neck
    this.neck.geometry = new THREE.CylinderGeometry(r, r, neckLength, se);
    this.neck.material = lampMaterial;
    this.neck.mesh = new THREE.Mesh(this.neck.geometry, this.neck.material);
    this.neck.mesh.position.y = height;
    this.neck.mesh.position.x = -neckLength / 2;
    this.neck.mesh.rotation.z = Math.PI / 2;

    //* Head
    this.head.geometry = new THREE.CylinderGeometry(
      headR,
      headR * 3,
      headHeight,
      se
    );
    this.head.material = lampMaterial;
    this.head.mesh = new THREE.Mesh(this.head.geometry, this.head.material);
    this.head.mesh.position.y = height;
    this.head.mesh.position.x = -neckLength;

    this.mesh.add(this.feet.mesh);
    this.mesh.add(this.body.mesh);
    this.mesh.add(this.joint.mesh);
    this.mesh.add(this.neck.mesh);
    this.mesh.add(this.head.mesh);
  }

  turnLight(isLightOn) {}
}

export default Lamp;
