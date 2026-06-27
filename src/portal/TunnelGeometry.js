import * as THREE from "three";
import { PortalSurface } from "./components/PortalSurface.js";

export class TunnelGeometry {
  create({ width, height, depth }) {
    const group = new THREE.Group();

    const wallMaterial = new THREE.MeshBasicMaterial({
      color: 0x110021,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(depth, height),
      wallMaterial
    );
    leftWall.position.set(-width / 2, 0, -depth / 2);
    leftWall.rotation.y = Math.PI / 2;

    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(depth, height),
      wallMaterial
    );
    rightWall.position.set(width / 2, 0, -depth / 2);
    rightWall.rotation.y = -Math.PI / 2;

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(width, depth),
      wallMaterial
    );
    ceiling.position.set(0, height / 2, -depth / 2);
    ceiling.rotation.x = Math.PI / 2;

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(width, depth),
      wallMaterial
    );
    floor.position.set(0, -height / 2, -depth / 2);
    floor.rotation.x = -Math.PI / 2;

    const backPlane = new PortalSurface({
      width,
      height,
      z: -depth,
      color: 0x050010,
      opacity: 0.62,
    }).create();

    group.add(leftWall, rightWall, ceiling, floor, backPlane);

    return group;
  }
}