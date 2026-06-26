import { createCameraFeed } from "../camera/createCameraFeed.js";

export class ARManager {
  constructor(root) {
    this.root = root;

    this.camera = null;
  }

  initialize() {
    const video = this.root.querySelector("#camera-feed");
    const status = this.root.querySelector("#status");

    this.camera = createCameraFeed({
      video,
      status,
    });
  }

  async startCamera() {
    if (!this.camera) return;

    await this.camera.start();
  }
}