export class TrackingProvider {
  async initialize() {
    throw new Error("initialize() not implemented");
  }

  async start() {
    throw new Error("start() not implemented");
  }

  async stop() {
    throw new Error("stop() not implemented");
  }

  onTargetFound(callback) {
    throw new Error("onTargetFound() not implemented");
  }

  onTargetLost(callback) {
    throw new Error("onTargetLost() not implemented");
  }
}