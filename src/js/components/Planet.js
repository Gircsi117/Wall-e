import * as THREE from "three";

class Planet {
  geometry;
  material;
  mesh;

  rotationSpeed = 0;

  constructor(radius, texture, color, intensity, rotationSpeed) {
    this.rotationSpeed = rotationSpeed;
    this.geometry = new THREE.SphereGeometry(radius, 50, 50);
    this.material = new THREE.MeshPhongMaterial({
      map: texture,
      emissiveMap: texture,
      emissive: color,
      emissiveIntensity: intensity,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  animate() {
    this.mesh.rotation.y += this.rotationSpeed;
    this.mesh.rotation.z += this.rotationSpeed;
  }
}

export default Planet;
