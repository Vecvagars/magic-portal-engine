import { FrameGeometry } from "../FrameGeometry.js";

export class PortalFrame {
  constructor(config) {
    this.config = config;
  }

  create() {
    const frame = new FrameGeometry().create({
      width: this.config.width,
      height: this.config.height,
      thickness: this.config.thickness,
    });

    frame.position.z = this.config.z ?? 0;

    return frame;
  }
}