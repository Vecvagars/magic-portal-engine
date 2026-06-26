import * as THREE from "three";
import { DOORWAY_CONFIG } from "../config/DoorwayConfig.js";

export class DoorwayPortal {
  create() {
    const group = new THREE.Group();

    const geometry = this.createGeometry();

    group.add(
      geometry.frame,
      geometry.leftWall,
      geometry.rightWall,
      geometry.ceiling,
      geometry.floor,
      geometry.backPlane
    );

    return group;
  }

  createGeometry() {
    const width = DOORWAY_CONFIG.width;
    const height = DOORWAY_CONFIG.height;
    const depth = DOORWAY_CONFIG.depth;
    const thickness = DOORWAY_CONFIG.frameThickness;

    const frameMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8a00,
      transparent: true,
      opacity: 0.9,
    });

    const tunnelMaterial = new THREE.MeshBasicMaterial({
      color: 0x140028,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
    });

    const backMaterial = new THREE.MeshBasicMaterial({
      color: 0x070014,
      transparent: true,
      opacity: 0.86,
      side: THREE.DoubleSide,
    });

    const frame = this.createFrame(width, height, thickness, frameMaterial);
    frame.position.z = 0;

    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(depth, height),
      tunnelMaterial
    );
    leftWall.position.set(-width / 2, 0, -depth / 2);
    leftWall.rotation.y = Math.PI / 2;

    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(depth, height),
      tunnelMaterial
    );
    rightWall.position.set(width / 2, 0, -depth / 2);
    rightWall.rotation.y = -Math.PI / 2;

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(width, depth),
      tunnelMaterial
    );
    ceiling.position.set(0, height / 2, -depth / 2);
    ceiling.rotation.x = Math.PI / 2;

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(width, depth),
      tunnelMaterial
    );
    floor.position.set(0, -height / 2, -depth / 2);
    floor.rotation.x = -Math.PI / 2;

    const backPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      backMaterial
    );
    backPlane.position.set(0, 0, -depth);

    return {
      frame,
      leftWall,
      rightWall,
      ceiling,
      floor,
      backPlane,
    };
  }

  createFrame(width, height, thickness, material) {
    const group = new THREE.Group();

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(width, thickness, thickness),
      material
    );
    top.position.y = height / 2;

    const bottom = new THREE.Mesh(
      new THREE.BoxGeometry(width, thickness, thickness),
      material
    );
    bottom.position.y = -height / 2;

    const left = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, height, thickness),
      material
    );
    left.position.x = -width / 2;

    const right = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, height, thickness),
      material
    );
    right.position.x = width / 2;

    group.add(top, bottom, left, right);

    return group;
  }
}