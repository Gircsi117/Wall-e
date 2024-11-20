import * as THREE from "three";

class TrashPillar {
  vertices;
  geometry;
  material;
  mesh;

  constructor(horizontalSize = 1, verticalSize = 1, segmentSize = 0.5) {
    const textureLoader = new THREE.TextureLoader();
    const vertices = [];
    const uvs = [];

    if (verticalSize > horizontalSize) {
      verticalSize = horizontalSize;
    }

    for (let i = 0; i < verticalSize; i++) {
      let x = 0;
      let y = 0 + i * segmentSize;
      let z = 0;

      const length = (horizontalSize - i) * segmentSize;

      //------------------------------------------------------

      vertices.push(x, y, z);
      vertices.push(x, y + segmentSize, z);
      vertices.push(x + length, y, z);

      uvs.push(0, 0);
      uvs.push(0, 1);
      uvs.push(1, 0);

      vertices.push(x + length, y + segmentSize, z);
      vertices.push(x, y + segmentSize, z);
      vertices.push(x + length, y, z);

      uvs.push(1, 1);
      uvs.push(0, 1);
      uvs.push(1, 0);

      //------------------------------------------------------

      vertices.push(x, y, z);
      vertices.push(x, y + segmentSize, z);
      vertices.push(x, y, z + length);

      uvs.push(0, 0);
      uvs.push(0, 1);
      uvs.push(1, 0);

      vertices.push(x, y + segmentSize, z + length);
      vertices.push(x, y + segmentSize, z);
      vertices.push(x, y, z + length);

      uvs.push(1, 1);
      uvs.push(0, 1);
      uvs.push(1, 0);
      //------------------------------------------------------

      z = (horizontalSize - i) * segmentSize;

      for (let j = 0; j < horizontalSize - i; j++) {
        vertices.push(x, y, z);
        vertices.push(x, y + segmentSize, z);
        vertices.push(x + segmentSize, y, z);

        uvs.push(0, 0);
        uvs.push(0, 1);
        uvs.push(1, 0);

        vertices.push(x + segmentSize, y + segmentSize, z);
        vertices.push(x, y + segmentSize, z);
        vertices.push(x + segmentSize, y, z);

        uvs.push(1, 1);
        uvs.push(0, 1);
        uvs.push(1, 0);

        x += segmentSize;
        z -= segmentSize;
      }

      x = 0;
      y = 0 + i * segmentSize;
      z = 0;

      //------------------------------------------------------

      x = (horizontalSize - i) * segmentSize;

      for (let j = 0; j < horizontalSize - i; j++) {
        vertices.push(x, y, z);
        vertices.push(x, y + segmentSize, z);
        vertices.push(x, y, z + segmentSize);

        uvs.push(0, 0);
        uvs.push(0, 1);
        uvs.push(1, 0);

        vertices.push(x, y + segmentSize, z + segmentSize);
        vertices.push(x, y + segmentSize, z);
        vertices.push(x, y, z + segmentSize);

        uvs.push(1, 1);
        uvs.push(0, 1);
        uvs.push(1, 0);

        x -= segmentSize;
        z += segmentSize;
      }

      x = 0;
      y = 0 + (i + 1) * segmentSize;
      z = (horizontalSize - i) * segmentSize;

      //------------------------------------------------------

      for (let j = 0; j < horizontalSize - i; j++) {
        vertices.push(x, y, z);
        vertices.push(x + segmentSize, y, z);
        vertices.push(x, y, z - segmentSize);

        uvs.push(0, 0);
        uvs.push(0, 1);
        uvs.push(1, 0);

        vertices.push(x + segmentSize, y, z - segmentSize);
        vertices.push(x + segmentSize, y, z);
        vertices.push(x, y, z - segmentSize);

        uvs.push(1, 1);
        uvs.push(0, 1);
        uvs.push(1, 0);

        x += segmentSize;
        z -= segmentSize;
      }
    }

    let x = 0;
    let y = 0;
    let z = 0;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < horizontalSize - i * verticalSize; j++) {
        const length = (horizontalSize - i * verticalSize - j) * segmentSize;

        vertices.push(x, y, z);
        vertices.push(x, y, z + segmentSize);
        vertices.push(x + length, y, z + segmentSize);

        uvs.push(0, 0);
        uvs.push(0, 1);
        uvs.push(1, 0);

        vertices.push(x, y, z);
        vertices.push(x + length, y, z);
        vertices.push(x + length, y, z + segmentSize);

        uvs.push(1, 1);
        uvs.push(0, 1);
        uvs.push(1, 0);

        z += segmentSize;
      }

      x = 0;
      y = verticalSize * segmentSize;
      z = 0;
    }

    this.vertices = new Float32Array(vertices.flat());

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.vertices, 3)
    );
    this.geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

    const texture = textureLoader.load("../../assets/materials/trash_1.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.center.set(0.5, 0.5);

    this.material = new THREE.MeshBasicMaterial({
      map: texture,
      color: 0x987755,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    const axesHelper = new THREE.AxesHelper(5);
    this.mesh.add(axesHelper);
  }
}

export default TrashPillar;
