import * as THREE from "three";
import { Component } from "./Component.js";

export class PortalEnergyFlow extends Component {
  constructor(config = {}, context = null) {
    super(config, context);

    this.elapsedTime = 0;
    this.segments = [];
  }

  create() {
    console.log("PortalEnergyFlow create()", this.config);

    this.object = new THREE.Group();

    if (!this.config.enabled) {
      return this.object;
    }

    const width = this.config.width ?? 1.4;
    const height = this.config.height ?? 1.95;
    const z = this.config.z ?? 0.04;

    const countPerSide = this.config.countPerSide ?? 12;
    const color = this.config.color ?? 0xffc266;
    const size = this.config.size ?? 0.035;

    this.createHorizontalSide(width, height / 2, z, countPerSide, color, size, 1);
    this.createHorizontalSide(width, -height / 2, z, countPerSide, color, size, -1);
    this.createVerticalSide(-width / 2, height, z, countPerSide, color, size, -1);
    this.createVerticalSide(width / 2, height, z, countPerSide, color, size, 1);

    return this.object;
  }

  createHorizontalSide(width, y, z, count, color, size, direction) {
    for (let i = 0; i < count; i++) {
      const mesh = this.createSegment(color, size);

      const t = i / count;
      mesh.userData = {
        side: "horizontal",
        offset: t,
        width,
        y,
        z,
        direction,
      };

      this.object.add(mesh);
      this.segments.push(mesh);
    }
  }

  createVerticalSide(x, height, z, count, color, size, direction) {
    for (let i = 0; i < count; i++) {
      const mesh = this.createSegment(color, size);

      const t = i / count;
      mesh.userData = {
        side: "vertical",
        offset: t,
        height,
        x,
        z,
        direction,
      };

      this.object.add(mesh);
      this.segments.push(mesh);
    }
  }

  createSegment(color, size) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(size, 8, 8),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
    );
  }

  update(delta) {
    if (!this._logged) {
    console.log("PortalEnergyFlow update()");
    this._logged = true;
    }
    
    if (!this.object) return;

    this.elapsedTime += delta;

    const speed = this.config.speed ?? 0.35;

    this.segments.forEach((segment) => {
      const data = segment.userData;
      const t = (data.offset + this.elapsedTime * speed) % 1;

      if (data.side === "horizontal") {
        const x = (t - 0.5) * data.width * data.direction;
        segment.position.set(x, data.y, data.z);
      }

      if (data.side === "vertical") {
        const y = (t - 0.5) * data.height * data.direction;
        segment.position.set(data.x, y, data.z);
      }

      const pulse = 0.45 + Math.sin((t + this.elapsedTime) * Math.PI * 2) * 0.35;
      segment.material.opacity = Math.max(0.15, pulse);
    });
  }

  destroy() {
    this.segments.forEach((segment) => {
      segment.geometry.dispose();
      segment.material.dispose();
    });

    this.segments = [];

    super.destroy();
  }
}