import { ARManager } from "../ar/ARManager.js";
import sceneDefinition from "../projects/altum-doorway/scene.js";

export class MagicNebulaEngine {
  constructor({ root, scene = sceneDefinition }) {
    this.root = root;
    this.scene = scene;
    this.arManager = null;
  }

  async initialize() {
    this.arManager = new ARManager(this.root, this.scene);
    this.arManager.initialize();
  }

  async start() {
    if (!this.arManager) {
      throw new Error("MagicNebulaEngine is not initialized");
    }

    await this.arManager.startTracking();
  }

  async stop() {
    if (!this.arManager) return;

    await this.arManager.stopTracking();
  }
}