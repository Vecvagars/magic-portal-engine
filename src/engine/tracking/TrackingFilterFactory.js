import { PoseFilter } from "./PoseFilter.js";

export class TrackingFilterFactory {
  create(filterDefinition) {
    switch (filterDefinition.type) {
      case "pose":
        return new PoseFilter(filterDefinition.config);

      default:
        throw new Error(`Unknown tracking filter: ${filterDefinition.type}`);
    }
  }
}