import { ARManager } from "../ar/ARManager.js";
import { Portal } from "../portal/Portal.js";

export class App {
  constructor(root) {
    this.root = root;
    this.ar = null;
    this.portal = null;
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
          <button id="startTracking">START AR TEST</button>
          <button id="openPortal">Open portal</button>
        </div>

        <div id="status">Camera not started</div>
      </div>
    `;

    this.ar = new ARManager(this.root);
    this.ar.initialize();

    this.portal = new Portal(
      this.root.querySelector("#canvas-container"),
      this.root.querySelector("#openPortal")
    );

    await this.portal.initialize();

    this.root
      .querySelector("#startCamera")
      .addEventListener("click", async () => {
        await this.ar.startCamera();
      });

    this.root
      .querySelector("#startTracking")
      .addEventListener("click", async () => {
        const status = this.root.querySelector("#status");
        status.textContent = "START AR TEST CLICKED";

        console.log("START AR TEST CLICKED");

        await this.ar.startTracking();
      });
  }
}