import { ARManager } from "../ar/ARManager.js";

export class MagicNebulaEngine {
  constructor({ root }) {
    this.root = root;
    this.arManager = null;
  }

  async initialize() {
    this.arManager = new ARManager(this.root);
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