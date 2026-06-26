import * as THREE from "three";
import { DOORWAY_CONFIG } from "../config/DoorwayConfig.js";
import { TunnelGeometry } from "./TunnelGeometry.js";
import { FrameGeometry } from "./FrameGeometry.js";

export class DoorwayPortal {
  create() {
    const group = new THREE.Group();

    const config = DOORWAY_CONFIG;

    const frameWidth = config.width - config.frameInset * 2;
    const frameHeight = config.height - config.frameInset * 2;

    const tunnelWidth = config.width - config.tunnelInset * 2;
    const tunnelHeight = config.height - config.tunnelInset * 2;

    const tunnel = new TunnelGeometry().create({
      width: tunnelWidth,
      height: tunnelHeight,
      depth: config.depth,
    });

    tunnel.position.z = -0.04;

    const frame = new FrameGeometry().create({
      width: frameWidth,
      height: frameHeight,
      thickness: config.frameThickness,
    });

    frame.position.z = 0.02;

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