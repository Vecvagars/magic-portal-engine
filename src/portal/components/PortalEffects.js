import * as THREE from "three";
import { Component } from "./Component.js";

export class PortalEffects extends Component {
  constructor(config = {}) {
    super(config);
  }

  create() {
    this.object = new THREE.Group();

    return this.object;
  }

  update(delta) {
    if (!this.object) return;

    this.object.rotation.z += delta * 0.2;
  }
}