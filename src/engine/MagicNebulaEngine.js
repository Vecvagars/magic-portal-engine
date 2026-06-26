import { ARManager } from "../ar/ARManager.js";

export class MagicNebulaEngine {

  constructor(root) {
    this.root = root;
    this.arManager = null;
  }

  async initialize() {

    this.arManager = new ARManager(this.root);

    this.arManager.initialize();

  }

  async startCamera() {

    await this.arManager.startCamera();

  }

  async startTracking() {

    await this.arManager.startTracking();

  }

  async stopTracking() {

    await this.arManager.stopTracking();

  }

}