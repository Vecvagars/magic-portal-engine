import * as THREE from "three";
import { TrackingProvider } from "./TrackingProvider.js";

export class MindARProvider extends TrackingProvider {
  constructor() {
    super();

    this.mindarThree = null;
    this.anchor = null;
    this.targetFoundCallback = null;
    this.targetLostCallback = null;
  }

  async initialize() {
    const module = await import(
      "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js/+esm"
    );

    const { MindARThree } = module;

    this.mindarThree = new MindARThree({
      container: document.querySelector("#ar-container"),
      imageTargetSrc: "/assets/targets/altum-poster.mind",
    });

    const { scene } = this.mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    this.anchor = this.mindarThree.addAnchor(0);

    const portalGroup = this.createPortalVisual();
    portalGroup.position.set(-1.25, 0.15, 0);
    portalGroup.scale.set(1.15, 1.45, 1);

    this.anchor.group.add(portalGroup);

    this.anchor.onTargetFound = () => {
      console.log("Target found");

      if (this.targetFoundCallback) {
        this.targetFoundCallback();
      }
    };

    this.anchor.onTargetLost = () => {
      console.log("Target lost");

      if (this.targetLostCallback) {
        this.targetLostCallback();
      }
    };

    console.log("MindAR initialized through ESM CDN");
  }

  async start() {
    if (!this.mindarThree) return;

    await this.mindarThree.start();

    const { renderer, scene, camera } = this.mindarThree;

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }

  async stop() {
    if (!this.mindarThree) return;

    await this.mindarThree.stop();
  }

  onTargetFound(callback) {
    this.targetFoundCallback = callback;
  }

  onTargetLost(callback) {
    this.targetLostCallback = callback;
  }

createPortalVisual() {
  const group = new THREE.Group();

  const outerFrame = this.createPortalFrame(1.0, 1.42, 0xff9a00, 0.045);
  const innerFrame = this.createPortalFrame(0.86, 1.22, 0xffe0a0, 0.022);

  const core = new THREE.Mesh(
    new THREE.PlaneGeometry(0.82, 1.18),
    new THREE.MeshBasicMaterial({
      color: 0x080018,
      transparent: true,
      opacity: 0.86,
      side: THREE.DoubleSide,
    })
  );

  core.position.z = -0.02;

  const particles = this.createRectPortalParticles(700, 1.08, 1.5);

  group.add(core, outerFrame, innerFrame, particles);

  return group;
}

createPortalFrame(width, height, color, thickness) {
  const group = new THREE.Group();

  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.95,
  });

  const top = new THREE.Mesh(
    new THREE.BoxGeometry(width, thickness, thickness),
    material
  );
  top.position.y = height / 2;

  const bottom = new THREE.Mesh(
    new THREE.BoxGeometry(width, thickness, thickness),
    material
  );
  bottom.position.y = -height / 2;

  const left = new THREE.Mesh(
    new THREE.BoxGeometry(thickness, height, thickness),
    material
  );
  left.position.x = -width / 2;

  const right = new THREE.Mesh(
    new THREE.BoxGeometry(thickness, height, thickness),
    material
  );
  right.position.x = width / 2;

  group.add(top, bottom, left, right);

  return group;
}

createRectPortalParticles(count, width, height) {
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

    positions[i * 3] = x + (Math.random() - 0.5) * 0.08;
    positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.08;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: 0xffc04d,
      size: 0.018,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    })
  );
}

}