import { ARManager } from "../ar/ARManager.js";
import { createPortalScene } from "../portal/createPortalScene.js";

export class App {
  constructor(root) {
    this.root = root;
    this.ar = null;
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

    this.ar = new ARManager(this.root);
    this.ar.initialize();

    createPortalScene({
      container: this.root.querySelector("#canvas-container"),
      button: this.root.querySelector("#openPortal"),
    });

    this.root
      .querySelector("#startCamera")
      .addEventListener("click", async () => {
        await this.ar.startCamera();
      });
  }
}