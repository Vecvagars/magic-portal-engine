import { DoorwayPortal } from "./DoorwayPortal.js";

export class PortalFactory {
  create(config) {
    const variant = config.variant || "doorway";

    switch (variant) {
      case "doorway":
        return new DoorwayPortal(config);

      default:
        throw new Error(`Unknown portal variant: ${variant}`);
    }
  }
}