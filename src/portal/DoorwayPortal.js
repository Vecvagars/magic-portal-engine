import * as THREE from "three";
import { PortalFrame } from "./components/PortalFrame.js";
import { PortalTunnel } from "./components/PortalTunnel.js";
import { PortalEffects } from "./components/PortalEffects.js";

export class DoorwayPortal {
  constructor(config) {
    this.config = config;
    this.components = [];
    this.object = null;
  }

  create() {
    this.object = new THREE.Group();

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
      appearance: config.appearance,
    });

    const frame = new PortalFrame({
      width: frameWidth,
      height: frameHeight,
      thickness: config.frameThickness,
      z: 0.02,
    });

    const effects = new PortalEffects(config.effects);

    this.components = [tunnel, frame, effects];

    this.components.forEach((component) => {
      component.initialize();
      this.object.add(component.create());
    });

    this.object.position.set(
      config.offset.x,
      config.offset.y,
      config.offset.z
    );

    this.object.scale.setScalar(config.scale);

    return this.object;
  }

  start() {
    this.components.forEach((component) => component.start());
  }

  update(delta) {
    this.components.forEach((component) => component.update(delta));
  }

  stop() {
    this.components.forEach((component) => component.stop());
  }

  destroy() {
    this.components.forEach((component) => component.destroy());
    this.components = [];
    this.object = null;
  }
}