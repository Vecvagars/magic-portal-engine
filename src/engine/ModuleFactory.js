import { PortalModule } from "../modules/PortalModule.js";

export class ModuleFactory {
  create(moduleDefinition) {
    switch (moduleDefinition.type) {
      case "portal": {
        const module = new PortalModule(moduleDefinition.config);
        module.initialize();
        return module;
      }

      default:
        throw new Error(`Unknown module type: ${moduleDefinition.type}`);
    }
  }
}