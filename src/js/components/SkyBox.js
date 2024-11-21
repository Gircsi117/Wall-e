import * as THREE from "three";

class SkyBox {
  geometry;
  material;
  mesh;

  boxSize = 333;

  constructor(parameters) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("../../assets/materials/skybox.png");

    this.geometry = new THREE.BoxGeometry(
      this.boxSize,
      this.boxSize,
      this.boxSize
    );

    this.material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}

export default SkyBox;
