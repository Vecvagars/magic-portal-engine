import sceneDefinition from "../projects/altum-doorway/scene.js";
import { TrackingProviderFactory } from "./TrackingProviderFactory.js";

export class MagicNebulaEngine {
  constructor({ root, scene = sceneDefinition }) {
    this.root = root;
    this.scene = scene;

    this.trackingProvider = null;
    this.status = null;
  }

  async initialize() {
    this.status = this.root.querySelector("#status");

    const trackingProviderFactory = new TrackingProviderFactory();
    this.trackingProvider = trackingProviderFactory.create(this.scene);

    await this.trackingProvider.initialize();

    this.setStatus("Ready");
  }

  async start() {
    if (!this.trackingProvider) {
      throw new Error("Tracking provider is not initialized");
    }

    this.setStatus("Starting AR...");
    await this.trackingProvider.start();
    this.setStatus("AR running");
  }

  async stop() {
    if (!this.trackingProvider) return;

    await this.trackingProvider.stop();
    this.setStatus("AR stopped");
  }

  setStatus(message) {
    if (this.status) {
      this.status.textContent = message;
    }

    console.log(message);
  }
}