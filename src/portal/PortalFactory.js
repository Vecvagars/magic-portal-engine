import { DoorwayPortal } from "./DoorwayPortal.js";
import { PortalThemeResolver } from "./themes/PortalThemeResolver.js";

export class PortalFactory {
  create(config) {
    const resolvedConfig = new PortalThemeResolver().resolve(config);
    const variant = resolvedConfig.variant || "doorway";

    switch (variant) {
      case "doorway":
        return new DoorwayPortal(resolvedConfig);

      default:
        throw new Error(`Unknown portal variant: ${variant}`);
    }
  }
}