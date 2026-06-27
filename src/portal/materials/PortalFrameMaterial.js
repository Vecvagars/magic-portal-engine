import * as THREE from "three";

export class PortalFrameMaterial {
  constructor(config = {}) {
    this.config = config;
  }

  create() {
    return new THREE.MeshBasicMaterial({
      color: this.config.color ?? 0xff8a00,
      transparent: true,
      opacity: this.config.opacity ?? 0.9,
    });
  }
}