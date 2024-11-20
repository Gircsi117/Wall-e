import * as THREE from "three";

class Street {
  geometry;
  material;
  mesh;

  constructor(length, width) {
    this.geometry = new THREE.BoxGeometry(length, 0.1, width);
    this.material = new THREE.MeshPhongMaterial({
      color: 0x5c5c60,
      shininess: 1,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
  }
}

export default Street;
