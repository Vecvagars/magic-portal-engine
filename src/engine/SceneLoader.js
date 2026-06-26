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
}