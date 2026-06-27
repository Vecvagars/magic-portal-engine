import * as THREE from "three";
import { Component } from "./Component.js";

export class PortalEffects extends Component {
  constructor(config = {}) {
    super(config);

    this.elapsedTime = 0;
    this.particles = null;
    this.glow = null;
  }

  create() {
    this.object = new THREE.Group();

    if (this.config?.glow?.enabled) {
      this.glow = this.createGlow(this.config.glow);
      this.object.add(this.glow);
    }

    if (this.config?.particles?.enabled) {
      this.particles = this.createParticles(this.config.particles);
      this.object.add(this.particles);
    }

    return this.object;
  }

  createGlow(config) {
    const group = new THREE.Group();

    const material = new THREE.MeshBasicMaterial({
      color: config.color ?? 0xff8a00,
      transparent: true,
      opacity: config.opacity ?? 0.32,
      depthWrite: false,
    });

    const width = config.width ?? 1.42;
    const height = config.height ?? 1.98;
    const thickness = config.thickness ?? 0.085;
    const z = config.z ?? 0.018;

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(width, thickness, thickness),
      material
    );
    top.position.set(0, height / 2, z);

    const bottom = top.clone();
    bottom.position.y = -height / 2;

    const left = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, height, thickness),
      material
    );
    left.position.set(-width / 2, 0, z);

    const right = left.clone();
    right.position.x = width / 2;

    group.add(top, bottom, left, right);

    return group;
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

    if (this.glow) {
      const pulse = 1 + Math.sin(this.elapsedTime * 2.5) * 0.025;
      this.glow.scale.setScalar(pulse);
    }

    if (this.particles) {
      this.particles.rotation.z += delta * 0.18;
    }
  }
}