import * as THREE from "three";
import { OBJLoader } from "OBJLoader";

class Bus {
  geometry;
  material;
  mesh;

  loader;
  groupLoaded;

  path;

  constructor(scene, path, ) {
    this.path = path;
    this.loader = new OBJLoader();
    this.loader.load(
      "../../assets/models/bus/busz.obj",
      (loaded) => {
        this.groupLoaded = loaded;
        this.groupLoaded.scale.set(0.3, 0.3, 0.3);

        this.groupLoaded.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            console.log("mesh found in loaded group");
            child.material = new THREE.MeshLambertMaterial({
              color: 0x7cdcfe,
              side: THREE.DoubleSide,
            });
          }
        });

        this.groupLoaded.position.set(0, -0.5, 0);
        this.groupLoaded.rotation.y = 0;

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

  animate() {
    if (!this.path || !this.groupLoaded) return;
    const time = Date.now();

    const t = ((time / 2000) % 5) / 5;
    const position = this.path.path.getPointAt(t);
    const tangent = this.path.path.getTangentAt(t).normalize();

    this.groupLoaded.position.copy(position);
    this.groupLoaded.lookAt(position.add(tangent));
    this.groupLoaded.rotation.y += Math.PI / 2;
  }
}

export default Bus;
