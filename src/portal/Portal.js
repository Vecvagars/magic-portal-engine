import { createPortalScene } from "./createPortalScene.js";

export class Portal {
  constructor(container, button) {
    this.container = container;
    this.button = button;

    this.sceneController = null;
    this.isOpen = false;
  }

  async initialize() {
    this.sceneController = createPortalScene({
      container: this.container,
      button: this.button,
    });

    console.log("Portal initialized");
  }

  open() {
    if (!this.sceneController) return;

    this.sceneController.open();
    this.isOpen = true;
  }

  close() {
    if (!this.sceneController) return;

    this.sceneController.close();
    this.isOpen = false;
  }

  destroy() {
    if (!this.sceneController) return;

    this.sceneController.destroy();
    this.sceneController = null;
  }
}