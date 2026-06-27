import * as THREE from "three";
import { PortalFrame } from "./components/PortalFrame.js";
import { PortalTunnel } from "./components/PortalTunnel.js";

export class DoorwayPortal {
  constructor(config) {
    this.config = config;
  }

  create() {
    const group = new THREE.Group();

    const config = this.config;

    const frameWidth = config.width - config.frameInset * 2;
    const frameHeight = config.height - config.frameInset * 2;

    const tunnelWidth = config.width - config.tunnelInset * 2;
    const tunnelHeight = config.height - config.tunnelInset * 2;

    const tunnel = new PortalTunnel({
      width: tunnelWidth,
      height: tunnelHeight,
      depth: config.depth,
      z: -0.04,
    }).create();

    const frame = new PortalFrame({
      width: frameWidth,
      height: frameHeight,
      thickness: config.frameThickness,
      z: 0.02,
    }).create();

    group.add(tunnel, frame);

    group.position.set(
      config.offset.x,
      config.offset.y,
      config.offset.z
    );

    group.scale.setScalar(config.scale);

    return group;
  }
}