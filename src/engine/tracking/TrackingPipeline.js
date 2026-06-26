export class TrackingPipeline {
  constructor() {
    this.filters = [];
  }

  add(filter) {
    this.filters.push(filter);
  }

  apply(object) {
    if (!object) return;

    this.filters.forEach((filter) => {
      if (typeof filter.apply === "function") {
        filter.apply(object);
      }
    });
  }

  reset() {
    this.filters.forEach((filter) => {
      if (typeof filter.reset === "function") {
        filter.reset();
      }
    });
  }
}