import * as THREE from "three";
import ThreeObject from "./ThreeObject.js";

class Cactus {
  geometry;
  material;
  mesh;

  branch1 = new ThreeObject();
  branch2 = new ThreeObject();

  constructor() {
    this.geometry = new THREE.CapsuleGeometry(0.2, 2, 50, 50);
    this.material = new THREE.MeshPhongMaterial({
      color: 0x009900,
      shininess: 1,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;

    this.mesh.position.set(3, 0.5, 3);

    this.branch1.geometry = new THREE.CapsuleGeometry(0.1, 1, 50, 50);
    this.branch1.material = this.material;
    this.branch1.mesh = new THREE.Mesh(
      this.branch1.geometry,
      this.branch1.material
    );
    this.branch1.mesh.castShadow = true;
    this.branch1.mesh.receiveShadow = false;
    this.branch1.mesh.rotation.z = Math.PI / 4;
    this.branch1.mesh.position.x = -0.5;
    this.mesh.add(this.branch1.mesh);

    this.branch2.geometry = new THREE.CapsuleGeometry(0.1, 0.5, 50, 50);
    this.branch2.material = this.material;
    this.branch2.mesh = new THREE.Mesh(
      this.branch2.geometry,
      this.branch2.material
    );
    this.branch2.mesh.castShadow = true;
    this.branch2.mesh.receiveShadow = false;
    this.branch2.mesh.rotation.z = -(Math.PI / 4);
    this.branch2.mesh.position.x = 0.3;
    this.branch2.mesh.position.y = 0.3;
    this.mesh.add(this.branch2.mesh);

    this.mesh.rotation.y = Math.PI / 6;
  }
}

export default Cactus;
