import { DoorwayPortal } from "../portal/DoorwayPortal.js";

export class ModuleFactory {
  create(moduleDefinition) {
    if (moduleDefinition.type === "portal") {
      return new DoorwayPortal(moduleDefinition.config);
    }

    throw new Error(`Unknown module type: ${moduleDefinition.type}`);
  }
}