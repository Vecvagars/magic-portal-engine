import * as THREE from "three";
import { Component } from "./Component.js";

export class PortalEffects extends Component {
  constructor(config = {}) {
    super(config);
    this.elapsedTime = 0;
    this.particles = null;
  }

  create() {
    this.object = new THREE.Group();

    if (this.config?.particles?.enabled) {
      this.particles = this.createParticles(this.config.particles);
      this.object.add(this.particles);
    }

    return this.object;
  }

  createParticles(config) {
    const count = config.count ?? 200;
    const width = config.width ?? 1.4;
    const height = config.height ?? 1.9;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const side = Math.floor(Math.random() * 4);

      let x = 0;
      let y = 0;

      if (side === 0) {
        x = (Math.random() - 0.5) * width;
        y = height / 2;
      } else if (side === 1) {
        x = (Math.random() - 0.5) * width;
        y = -height / 2;
      } else if (side === 2) {
        x = -width / 2;
        y = (Math.random() - 0.5) * height;
      } else {
        x = width / 2;
        y = (Math.random() - 0.5) * height;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: config.color ?? 0xff8a00,
        size: config.size ?? 0.015,
        transparent: true,
        opacity: config.opacity ?? 0.75,
        depthWrite: false,
      })
    );
  }

  update(delta) {
    if (!this.object) return;

    this.elapsedTime += delta;

    if (this.particles) {
      this.particles.rotation.z += delta * 0.18;
    }
  }
}