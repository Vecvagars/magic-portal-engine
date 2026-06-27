import * as THREE from "three";

export class AssetsManager {
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.textures = new Map();
  }

  preload(sceneAssets = {}) {
    const textures = sceneAssets.textures || {};

    Object.entries(textures).forEach(([key, url]) => {
      this.loadTexture(key, url);
    });
  }

  loadTexture(key, url) {
    if (this.textures.has(key)) {
      return this.textures.get(key);
    }

    const texture = this.textureLoader.load(
      url,
      () => {
        console.log(`Texture loaded: ${key}`, url);
      },
      undefined,
      (error) => {
        console.error(`Texture failed to load: ${key}`, url, error);
      }
    );

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

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