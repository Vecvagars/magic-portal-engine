import { createCameraFeed } from "../camera/createCameraFeed.js";
import { createPortalScene } from "../portal/createPortalScene.js";

export class App {
  constructor(root) {
    this.root = root;
  }

  async start() {
    this.root.innerHTML = `
      <video id="camera-feed" autoplay playsinline muted></video>
      <div id="canvas-container"></div>

      <div class="ui">
        <div class="badge">Magic Nebula</div>
        <h1>Magic Portal Engine</h1>
        <p>v0.2 — camera passthrough prototype</p>

        <div class="buttons">
          <button id="startCamera">Start camera</button>
          <button id="openPortal">Open portal</button>
        </div>

        <div id="status">Camera not started</div>
      </div>
    `;

    const status = this.root.querySelector("#status");
    const video = this.root.querySelector("#camera-feed");

    const cameraFeed = createCameraFeed({
      video,
      status,
    });

    createPortalScene({
      container: this.root.querySelector("#canvas-container"),
      button: this.root.querySelector("#openPortal"),
    });

    this.root
      .querySelector("#startCamera")
      .addEventListener("click", async () => {
        await cameraFeed.start();
      });
  }
}