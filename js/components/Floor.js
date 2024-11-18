import * as THREE from "three";

class Floor {
  geometry;
  material;
  mesh;

  constructor(width, length) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("../../assets/materials/red_sand.jpg");

    this.geometry = new THREE.PlaneGeometry(width, length);
    this.material = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
      shininess: 1,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
  }
}

export default Floor;
