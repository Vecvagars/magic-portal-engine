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

    this.setStatus("ARManager initialized");
  }

  async startCamera() {
    if (!this.camera) return;

    this.setStatus("Starting camera...");
    await this.camera.start();
  }

  async startTracking() {
    console.log("Start tracking button pressed");
    this.setStatus("Start tracking button pressed");

    if (!this.trackingProvider) {
      this.setStatus("Tracking provider missing");
      return;
    }

    try {
      this.setStatus("Starting tracking...");
      await this.trackingProvider.start();
      this.setStatus("Tracking started");
    } catch (error) {
      console.error(error);
      this.setStatus(`Tracking error: ${error.message}`);
    }
  }

  setStatus(message) {
    if (this.status) {
      this.status.textContent = message;
    }

    console.log(message);
  }
}