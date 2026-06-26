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
    portalGroup.position.set(0, 0, 0);
    portalGroup.scale.set(0.45, 0.45, 0.45);

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

  const ringOuter = new THREE.Mesh(
    new THREE.TorusGeometry(0.7, 0.04, 32, 180),
    new THREE.MeshBasicMaterial({ color: 0xff9a00 })
  );

  const ringInner = new THREE.Mesh(
    new THREE.TorusGeometry(0.58, 0.02, 32, 180),
    new THREE.MeshBasicMaterial({ color: 0xffe0a0 })
  );

  const core = new THREE.Mesh(
    new THREE.CircleGeometry(0.55, 96),
    new THREE.MeshBasicMaterial({
      color: 0x080018,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    })
  );

  core.position.z = -0.01;

  const particles = this.createPortalParticles(450);

  group.add(core, ringOuter, ringInner, particles);

  return group;
}

createPortalParticles(count) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.62 + Math.random() * 0.28;

    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
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