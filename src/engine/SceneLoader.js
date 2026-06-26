import { ModuleFactory } from "./ModuleFactory.js";

export class SceneLoader {
  constructor(sceneDefinition) {
    this.sceneDefinition = sceneDefinition;
    this.moduleFactory = new ModuleFactory();
    this.modules = [];
  }

  attachTo(anchorGroup) {
    const moduleDefinitions = this.sceneDefinition.modules || [];

    this.modules = moduleDefinitions.map((moduleDefinition) => {
      const module = this.moduleFactory.create(moduleDefinition);
      module.attach(anchorGroup);
      return module;
    });
  }

  start() {
    this.modules.forEach((module) => {
      if (typeof module.start === "function") {
        module.start();
      }
    });
  }

  update(delta) {
    this.modules.forEach((module) => {
      if (typeof module.update === "function") {
        module.update(delta);
      }
    });
  }

  stop() {
    this.modules.forEach((module) => {
      if (typeof module.stop === "function") {
        module.stop();
      }
    });
  }

  destroy() {
    this.modules.forEach((module) => {
      if (typeof module.destroy === "function") {
        module.destroy();
      }
    });

    this.modules = [];
  }
}