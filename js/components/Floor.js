import * as THREE from "three";

class Floor {
  geometry;
  material;
  mesh;

  constructor(width, length) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("../../assets/materials/red_sand.jpg");
    // Elméletben van, gyakorlatban nem tudom miért nem jó
    const bumpMap = textureLoader.load(
      "../../assets/materials/red_sand_bump_map.jpg"
    );

    this.geometry = new THREE.BoxGeometry(width, length, 0.5);
    this.material = new THREE.MeshPhongMaterial({
      map: texture,
      bumpMap: bumpMap,
      side: THREE.DoubleSide,
      shininess: 1,
      bumpScale: 0.2,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
  }
}

export default Floor;
