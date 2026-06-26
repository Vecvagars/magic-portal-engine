import { MagicNebulaEngine } from "../engine/MagicNebulaEngine.js";

export class App {
  constructor(root) {
    this.root = root;
    this.engine = null;
  }

  async start() {
    this.root.innerHTML = `
      <div id="ar-container"></div>

      <div class="ui">
        <div class="badge">Magic Nebula</div>
        <h1>Magic Nebula Engine</h1>
        <p>v0.4 — runtime foundation</p>

        <div class="buttons">
          <button id="startExperience">Start AR Experience</button>
        </div>

        <div id="status">Ready</div>
      </div>
    `;

    this.engine = new MagicNebulaEngine({
      root: this.root,
    });

    await this.engine.initialize();

    this.root
      .querySelector("#startExperience")
      .addEventListener("click", async () => {
        const status = this.root.querySelector("#status");

        try {
          status.textContent = "Starting AR...";
          await this.engine.start();
          status.textContent = "AR running";
        } catch (error) {
          console.error(error);
          status.textContent = `AR error: ${error.message}`;
        }
      });
  }
}