import { createCameraFeed } from "../camera/createCameraFeed.js";
import { MindARProvider } from "./tracking/MindARProvider.js";

export class ARManager {
  constructor(root) {
    this.root = root;

    this.camera = null;
    this.trackingProvider = null;
    this.status = null;
  }

  initialize() {
    const video = this.root.querySelector("#camera-feed");
    this.status = this.root.querySelector("#status");

    this.camera = createCameraFeed({
      video,
      status: this.status,
    });

    this.trackingProvider = new MindARProvider();
    this.trackingProvider.initialize();

    this.setStatus("Ready");
  }

  async startCamera() {
    if (!this.camera) return;

    this.setStatus("Starting camera...");
    await this.camera.start();
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

  setStatus(message) {
    if (this.status) {
      this.status.textContent = message;
    }

    console.log(message);
  }
}