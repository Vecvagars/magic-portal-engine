import * as THREE from "three";
import { DOORWAY_CONFIG } from "../config/DoorwayConfig.js";
import { TunnelGeometry } from "./TunnelGeometry.js";
import { FrameGeometry } from "./FrameGeometry.js";

export class DoorwayPortal {
  create() {
    const group = new THREE.Group();

    const width = DOORWAY_CONFIG.width;
    const height = DOORWAY_CONFIG.height;
    const depth = DOORWAY_CONFIG.depth;
    const thickness = DOORWAY_CONFIG.frameThickness;

    const tunnel = new TunnelGeometry().create({
      width: width * 0.82,
      height: height * 0.82,
      depth,
    });

    tunnel.position.z = -0.02;

    const outerFrame = new FrameGeometry().create({
      width: width * 0.86,
      height: height * 0.86,
      thickness,
    });

    outerFrame.position.z = 0.02;

    group.add(tunnel, outerFrame);

    return group;
  }
}