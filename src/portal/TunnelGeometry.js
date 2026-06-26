import * as THREE from "three";

export class TunnelGeometry {
  create({ width, height, depth }) {
    const group = new THREE.Group();

    const material = new THREE.MeshBasicMaterial({
      color: 0x120026,
      transparent: true,
      opacity: 0.68,
      side: THREE.DoubleSide,
    });

    const backMaterial = new THREE.MeshBasicMaterial({
      color: 0x050010,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    });

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(depth, height), material);
    leftWall.position.set(-width / 2, 0, -depth / 2);
    leftWall.rotation.y = Math.PI / 2;

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(depth, height), material);
    rightWall.position.set(width / 2, 0, -depth / 2);
    rightWall.rotation.y = -Math.PI / 2;

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), material);
    ceiling.position.set(0, height / 2, -depth / 2);
    ceiling.rotation.x = Math.PI / 2;

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), material);
    floor.position.set(0, -height / 2, -depth / 2);
    floor.rotation.x = -Math.PI / 2;

    const backPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 0.92, height * 0.92),
      backMaterial
    );
    backPlane.position.set(0, 0, -depth);

    group.add(leftWall, rightWall, ceiling, floor, backPlane);

    return group;
  }
}