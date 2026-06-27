export class Component {
  constructor(config = {}) {
    this.config = config;
    this.object = null;
  }

  initialize() {}

  create() {
    return this.object;
  }

  start() {}

  update(delta) {}

  stop() {}

  destroy() {
    this.object = null;
  }
}