import * as THREE from "three";
import { Component } from "./Component.js";

export class PortalEffects extends Component {
  constructor(config = {}, context = null) {
    super(config, context);

    this.elapsedTime = 0;
    this.particles = null;
    this.glow = null;
  }

  create() {
    this.object = new THREE.Group();

    if (this.config?.glow?.enabled) {
      this.glow = this.createSoftGlow(this.config.glow);
      this.object.add(this.glow);
    }

    if (this.config?.particles?.enabled) {
      this.particles = this.createParticles(this.config.particles);
      this.object.add(this.particles);
    }

    return this.object;
  }

  createSoftGlow(config) {
    const texture =
      this.context?.assets?.getTexture("portalGlow") ||
      this.createFallbackGlowTexture();

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      color: config.color ?? 0xff8a00,
      transparent: true,
      opacity: config.opacity ?? 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(config.width ?? 1.42, config.height ?? 1.98),
      material
    );

    glow.position.z = config.z ?? 0.018;

    return glow;
  }

  createFallbackGlowTexture() {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    const center = size / 2;

    const gradient = ctx.createRadialGradient(
      center,
      center,
      size * 0.18,
      center,
      center,
      size * 0.48
    );

    gradient.addColorStop(0.0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.45, "rgba(255,255,255,0.12)");
    gradient.addColorStop(0.68, "rgba(255,255,255,0.55)");
    gradient.addColorStop(0.84, "rgba(255,255,255,0.18)");
    gradient.addColorStop(1.0, "rgba(255,255,255,0)");

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    return new THREE.CanvasTexture(canvas);
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
      const pulse = 1 + Math.sin(this.elapsedTime * 2.5) * 0.035;
      this.glow.scale.setScalar(pulse);
    }

    if (this.particles) {
      this.particles.rotation.z += delta * 0.18;
    }
  }
}