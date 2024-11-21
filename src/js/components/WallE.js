import * as THREE from "three";
import { OBJLoader } from "OBJLoader";

class WallE {
  geometry;
  material;
  mesh;

  loader;
  groupLoaded;

  constructor(scene) {
    this.loader = new OBJLoader();
    this.loader.load(
      "../../assets/models/wall-e/wall-e.obj",
      (loaded) => {
        this.groupLoaded = loaded;
        this.groupLoaded.scale.set(0.9, 0.9, 0.9);

        this.groupLoaded.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            console.log("mesh found in loaded group");
            child.material = new THREE.MeshLambertMaterial({
              color: 0xfac84b,
              side: THREE.DoubleSide,
            });
          }
        });

        this.groupLoaded.position.set(-4.4, 0.5, 4.4);
        this.groupLoaded.rotation.y = (Math.PI / 8) * 6;
        

        scene.add(this.groupLoaded);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("An error happened");
      }
    );
  }
}

export default WallE;
