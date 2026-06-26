import { ModuleFactory } from "./ModuleFactory.js";

export class SceneLoader {
  constructor(sceneDefinition) {
    this.sceneDefinition = sceneDefinition;
    this.moduleFactory = new ModuleFactory();
  }

  attachTo(anchorGroup) {
    const modules = this.sceneDefinition.modules || [];

    modules.forEach((moduleDefinition) => {
      const module = this.moduleFactory.create(moduleDefinition);
      const object = module.create();

      anchorGroup.add(object);
    });
  }
}