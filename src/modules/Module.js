export class Module {
  constructor(config = {}) {
    this.config = config;
  }

  initialize() {}

  attach(parent) {}

  start() {}

  update(delta) {}

  stop() {}

  destroy() {}
}