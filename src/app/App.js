import { MagicNebulaEngine } from "../engine/MagicNebulaEngine.js";

export class App {
  constructor(root) {
    this.root = root;
    this.engine = null;
    this.portal = null;
  }

  async start() {
    this.root.innerHTML = `
      <<div id="ar-container"></div>

      <div class="ui">
        <div class="badge">Magic Nebula</div>
        <h1>Magic Portal Engine</h1>
        <p>v0.2 — camera passthrough prototype</p>

        <div class="buttons">
          <button id="startTracking">Start AR Experience</button>
        </div>

        <div id="status">Camera not started</div>
      </div>
    `

    this.engine = new MagicNebulaEngine(this.root);
    await this.engine.initialize();

    this.root
      .querySelector("#startTracking")
      .addEventListener("click", async () => {
        const status = this.root.querySelector("#status");
        status.textContent = "START AR TEST CLICKED";

        console.log("START AR TEST CLICKED");

        await this.engine.startTracking();
      });
  }
}