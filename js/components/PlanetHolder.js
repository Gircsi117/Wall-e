import * as THREE from "three";
import Planet from "./Planet.js";

class PlanetHolder {
  geometry;
  material;
  mesh;

  // Nap
  sun;
  sunLight;

  // Hold
  moon;
  moonLight;

  constructor(planetDistance) {
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load("../../assets/materials/sun.jpg");
    const moonTexture = textureLoader.load("../../assets/materials/moon.jpg");

    this.geometry = new THREE.SphereGeometry(0, 1, 1);
    this.material = new THREE.MeshNormalMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.sun = new Planet(1, sunTexture, 0xffff00, 2, 0.01);
    this.moon = new Planet(1, moonTexture, 0xffffff, 1.5, 0.02);

    this.sun.mesh.position.y = planetDistance;
    this.moon.mesh.position.y = -planetDistance;

    this.sunLight = new THREE.PointLight(0xffffff, 500, 1000);
    this.sunLight.castShadow = true;
    this.sunLight.position.y = planetDistance;
    this.sunLight.lookAt(this.mesh.position);

    this.moonLight = new THREE.PointLight(0x87ceeb, 25, 1000);
    this.moonLight.castShadow = true;
    this.moonLight.position.y = -planetDistance;
    this.moonLight.lookAt(this.mesh.position);

    this.mesh.add(this.sun.mesh);
    this.mesh.add(this.moon.mesh);
    this.mesh.add(this.sunLight);
    this.mesh.add(this.moonLight);
  }

  animate(rotate = 0, isRotatePlanet, time) {
    if (isRotatePlanet) {
      this.sun.animate();
      this.moon.animate();
    }

    if (time >= 6 && time <= 18) {
      this.sun.mesh.visible = true;
      this.sunLight.visible = true;
    } else {
      this.sun.mesh.visible = false;
      this.sunLight.visible = false;
    }

    if (time <= 6 || time >= 18) {
      this.moon.mesh.visible = true;
      this.moonLight.visible = true;
    } else {
      this.moon.mesh.visible = false;
      this.moonLight.visible = false;
    }

    this.mesh.rotation.z = -rotate;
  }
}

export default PlanetHolder;
