import { Module } from "./Module.js";
import { PortalFactory } from "../portal/PortalFactory.js";

export class PortalModule extends Module {
  constructor(config) {
    super(config);

    this.portal = null;
    this.object = null;
    this.elapsedTime = 0;
  }

  initialize() {
    const portalFactory = new PortalFactory();
    this.portal = portalFactory.create(this.config);
  }

  attach(parent) {
    this.object = this.portal.create();
    parent.add(this.object);
  }

  start() {
    console.log("PortalModule started");
  }

  update(delta) {
    if (!this.object) return;

    this.elapsedTime += delta;

    const pulse = 1 + Math.sin(this.elapsedTime * 2.2) * 0.015;
    this.object.scale.setScalar(this.config.scale * pulse);
  }

  stop() {
    console.log("PortalModule stopped");
  }
}