import { TrackingProviderFactory } from "../engine/TrackingProviderFactory.js";

export class ARManager {
  constructor(root, sceneDefinition) {
    this.root = root;
    this.sceneDefinition = sceneDefinition;

    this.trackingProvider = null;
    this.status = null;
  }

  initialize() {
    this.status = this.root.querySelector("#status");

    const providerFactory = new TrackingProviderFactory();
    this.trackingProvider = providerFactory.create(this.sceneDefinition);

    this.trackingProvider.initialize();

    this.setStatus("Ready");
  }

  async startTracking() {
    if (!this.trackingProvider) {
      this.setStatus("Tracking provider missing");
      return;
    }

    try {
      this.setStatus("Starting AR...");
      await this.trackingProvider.start();
      this.setStatus("AR running");
    } catch (error) {
      console.error(error);
      this.setStatus(`AR error: ${error.message}`);
    }
  }

  async stopTracking() {
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