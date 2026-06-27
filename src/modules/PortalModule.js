import { Module } from "./Module.js";
import { PortalFactory } from "../portal/PortalFactory.js";

export class PortalModule extends Module {
  constructor(config, context) {
    super(config, context);

    this.portal = null;
    this.object = null;
  }

  initialize() {
    const portalFactory = new PortalFactory();
    this.portal = portalFactory.create(this.config, this.context);
  }

  attach(parent) {
    this.object = this.portal.create();
    parent.add(this.object);
  }

  start() {
    this.portal?.start();
  }

  update(delta) {
    this.portal?.update(delta);
  }

  stop() {
    this.portal?.stop();
  }

  destroy() {
    this.portal?.destroy();
    this.portal = null;
    this.object = null;
  }
}