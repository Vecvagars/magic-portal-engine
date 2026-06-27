import * as THREE from "three";
import { Component } from "./Component.js";

export class PortalSurface extends Component {
  constructor(config) {
    super(config);
  }

  create() {
    const material = new THREE.MeshBasicMaterial({
      color: this.config.color ?? 0x050010,
      transparent: true,
      opacity: this.config.opacity ?? 0.62,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    this.object = new THREE.Mesh(
      new THREE.PlaneGeometry(this.config.width, this.config.height),
      material
    );

    this.object.position.set(
      this.config.x ?? 0,
      this.config.y ?? 0,
      this.config.z ?? 0
    );

    return this.object;
  }
}