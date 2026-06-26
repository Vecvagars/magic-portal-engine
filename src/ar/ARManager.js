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
    console.log("Start tracking button pressed");
    this.setStatus("Start tracking button pressed");
    
    if (!this.camera) return;

    this.setStatus("Starting camera...");
    await this.camera.start();
  }

  async startTracking() {
    if (!this.trackingProvider) return;

    this.setStatus("Starting tracking...");
    await this.trackingProvider.start();
    this.setStatus("Tracking started");
  }

  async stopTracking() {
    if (!this.trackingProvider) return;

    await this.trackingProvider.stop();
    this.setStatus("Tracking stopped");
  }

  setStatus(message) {
    if (this.status) {
      this.status.textContent = message;
    }

    console.log(message);
  }
}