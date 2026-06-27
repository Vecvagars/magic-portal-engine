import * as THREE from "three";
import { Material } from "../../engine/materials/Material.js";

export class PortalSurfaceMaterial extends Material {
  create() {
    return new THREE.MeshBasicMaterial({
      map: this.config.texture ?? null,
      color: this.config.color ?? 0x050010,
      transparent: true,
      opacity: this.config.opacity ?? 0.68,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }
}