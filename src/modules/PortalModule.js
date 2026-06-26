import { Module } from "./Module.js";
import { DoorwayPortal } from "../portal/DoorwayPortal.js";

export class PortalModule extends Module {

  constructor(config) {
    super(config);

    this.portal = null;
  }

  initialize() {
    this.portal = new DoorwayPortal(this.config);
  }

  attach(parent) {
    const object = this.portal.create();
    parent.add(object);
  }

}