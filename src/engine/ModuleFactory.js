import { PortalModule } from "../modules/PortalModule.js";

export class ModuleFactory {
  constructor(context = null) {
    this.context = context;
  }

  create(moduleDefinition) {
    switch (moduleDefinition.type) {
      case "portal": {
        const module = new PortalModule(
          moduleDefinition.config,
          this.context
        );

        module.initialize();

        return module;
      }

      default:
        throw new Error(`Unknown module type: ${moduleDefinition.type}`);
    }
  }
}