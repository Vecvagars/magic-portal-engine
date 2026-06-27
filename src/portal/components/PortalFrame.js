import { Component } from "./Component.js";
import { FrameGeometry } from "../FrameGeometry.js";

export class PortalFrame extends Component {
  constructor(config) {
    super(config);
  }

  create() {
    this.object = new FrameGeometry().create({
      width: this.config.width,
      height: this.config.height,
      thickness: this.config.thickness,
    });

    this.object.position.z = this.config.z ?? 0;

    return this.object;
  }
}