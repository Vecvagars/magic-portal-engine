export class Material {
  constructor(config = {}, context = null) {
    this.config = config;
    this.context = context;
    this.material = null;
  }

  create() {
    throw new Error("Material.create() must be implemented.");
  }

  update(delta) {}

  destroy() {
    this.material?.dispose();
    this.material = null;
  }
}