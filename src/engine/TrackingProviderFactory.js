import { MindARProvider } from "../ar/tracking/MindARProvider.js";

export class TrackingProviderFactory {
  create(sceneDefinition) {
    const provider = sceneDefinition.tracking.provider;

    switch (provider) {
      case "mindar":
        return new MindARProvider(sceneDefinition);

      default:
        throw new Error(`Unknown tracking provider: ${provider}`);
    }
  }
}