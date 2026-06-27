import * as THREE from "three";
import { Material } from "../../engine/materials/Material.js";

export class PortalSurfaceMaterial extends Material {
  constructor(config = {}, context = null) {
    super(config, context);

    this.texture = null;
  }

  create() {
    const textureKey = this.config.texture?.key;

    this.texture = textureKey
      ? this.context?.assets?.getTexture(textureKey) || null
      : null;

    if (this.texture) {
      const repeat = this.config.texture?.repeat || {};

      this.texture.wrapS = THREE.RepeatWrapping;
      this.texture.wrapT = THREE.RepeatWrapping;
      this.texture.repeat.set(repeat.x ?? 1, repeat.y ?? 1);
      this.texture.needsUpdate = true;
    }

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      color: this.config.color ?? 0x050010,
      transparent: true,
      opacity: this.config.opacity ?? 0.68,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    return this.material;
  }

  update(delta) {
    if (!this.texture) return;

    const speed = this.config.texture?.speed || {};

    this.texture.offset.x += delta * (speed.x ?? 0);
    this.texture.offset.y += delta * (speed.y ?? 0);
  }

  destroy() {
    this.texture = null;
    super.destroy();
  }
}