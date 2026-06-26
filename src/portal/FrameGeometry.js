import * as THREE from "three";

export class FrameGeometry {
  create({ width, height, thickness }) {
    const group = new THREE.Group();

    const material = new THREE.MeshBasicMaterial({
      color: 0xff8a00,
      transparent: true,
      opacity: 0.9,
    });

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(width, thickness, thickness),
      material
    );
    top.position.y = height / 2;

    const bottom = top.clone();
    bottom.position.y = -height / 2;

    const left = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, height, thickness),
      material
    );
    left.position.x = -width / 2;

    const right = left.clone();
    right.position.x = width / 2;

    group.add(top, bottom, left, right);

    return group;
  }
}