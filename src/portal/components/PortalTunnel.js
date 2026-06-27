import { TunnelGeometry } from "../TunnelGeometry.js";

export class PortalTunnel {
  constructor(config) {
    this.config = config;
  }

  create() {
    const tunnel = new TunnelGeometry().create({
      width: this.config.width,
      height: this.config.height,
      depth: this.config.depth,
    });

    tunnel.position.z = this.config.z ?? 0;

    return tunnel;
  }
}