import * as THREE from "three";
import { Material } from "../../engine/materials/Material.js";

export class PortalFrameMaterial extends Material {
  create() {
    return new THREE.MeshBasicMaterial({
      color: this.config.color ?? 0xff8a00,
      transparent: true,
      opacity: this.config.opacity ?? 0.9,
    });
  }
}