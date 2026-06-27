import * as THREE from "three";
import { Component } from "./Component.js";

export class PortalSurface extends Component {
  constructor(config = {}, context = null) {
    super(config, context);

    this.material = null;
    this.texture = null;
    this.elapsedTime = 0;

    this.textureConfig = config.texture || {};
  }

  create() {
    const textureKey = this.textureConfig.key;

    this.texture =
      textureKey
        ? this.context?.assets?.getTexture(textureKey) || null
        : null;

    if (this.texture) {
      this.texture.wrapS = THREE.RepeatWrapping;
      this.texture.wrapT = THREE.RepeatWrapping;

      const repeat = this.textureConfig.repeat || {};

      this.texture.repeat.set(
        repeat.x ?? 1,
        repeat.y ?? 1
      );

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

    this.object = new THREE.Mesh(
      new THREE.PlaneGeometry(this.config.width, this.config.height),
      this.material
    );

    this.object.position.set(
      this.config.x ?? 0,
      this.config.y ?? 0,
      this.config.z ?? 0
    );

    return this.object;
  }

  update(delta) {
    if (!this.texture) return;

    this.elapsedTime += delta;

    const speed = this.textureConfig.speed || {};

    this.texture.offset.x += delta * (speed.x ?? 0);
    this.texture.offset.y += delta * (speed.y ?? 0);
  }

  destroy() {
    this.material?.dispose();
    this.material = null;
    this.texture = null;

    super.destroy();
  }
}