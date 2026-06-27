import { Component } from "./Component.js";
import { TunnelGeometry } from "../TunnelGeometry.js";

export class PortalTunnel extends Component {
  constructor(config) {
    super(config);
  }

  create() {
    this.object = new TunnelGeometry().create({
      width: this.config.width,
      height: this.config.height,
      depth: this.config.depth,
      appearance: this.config.appearance,
    });

    this.object.position.z = this.config.z ?? 0;

    return this.object;
  }
}