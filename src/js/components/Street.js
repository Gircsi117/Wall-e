import * as THREE from "three";
import ThreeObject from "./ThreeObject.js";

class Street {
  geometry;
  material;
  mesh;

  border1 = new ThreeObject();
  border2 = new ThreeObject();

  constructor(length, width) {
    this.geometry = new THREE.BoxGeometry(length, 0.05, width);
    this.material = new THREE.MeshPhongMaterial({
      color: 0x5c5c60,
      shininess: 1,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;

    this.border1.geometry = new THREE.BoxGeometry(length, 0.1, 0.1);
    this.border1.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 1,
    });
    this.border1.mesh = new THREE.Mesh(this.border1.geometry, this.border1.material);
    this.border1.mesh.position.z = width/2;
    this.border1.mesh.castShadow = false;
    this.border1.mesh.receiveShadow = true;
    this.mesh.add(this.border1.mesh);

    this.border2.geometry = new THREE.BoxGeometry(length, 0.1, 0.1);
    this.border2.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 1,
    });
    this.border2.mesh = new THREE.Mesh(this.border2.geometry, this.border2.material);
    this.border2.mesh.position.z = -width/2;
    this.border2.mesh.castShadow = false;
    this.border2.mesh.receiveShadow = true;
    this.mesh.add(this.border2.mesh);
  }
}

export default Street;
