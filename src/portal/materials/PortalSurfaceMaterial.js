import * as THREE from "three";

export class PortalSurfaceMaterial {
  constructor(config = {}) {
    this.config = config;
  }

  create() {
    return new THREE.MeshBasicMaterial({
      map: this.config.texture || null,
      color: this.config.color ?? 0x050010,
      transparent: true,
      opacity: this.config.opacity ?? 0.68,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }
}