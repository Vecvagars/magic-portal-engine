import * as THREE from "three";

export class AssetsManager {
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.textures = new Map();
  }

  loadTexture(key, url) {
    if (this.textures.has(key)) {
      return this.textures.get(key);
    }

    const texture = this.textureLoader.load(url);
    this.textures.set(key, texture);

    return texture;
  }

  getTexture(key) {
    return this.textures.get(key) || null;
  }

  clear() {
    this.textures.forEach((texture) => {
      texture.dispose();
    });

    this.textures.clear();
  }
}