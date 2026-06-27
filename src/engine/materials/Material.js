export class Material {
  constructor(config = {}) {
    this.config = config;
  }

  create() {
    throw new Error("Material.create() must be implemented.");
  }
}