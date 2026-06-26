import * as THREE from "three";
import { TrackingProvider } from "./TrackingProvider.js";
import { DoorwayPortal } from "../../portal/DoorwayPortal.js";

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
      imageTargetSrc: "/assets/targets/doorway-arch-far.mind",
    });

    const { scene } = this.mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    this.anchor = this.mindarThree.addAnchor(0);

    const portal = new DoorwayPortal();
    const portalGroup = portal.create();
    portalGroup.position.set(0, 0, 0);
    portalGroup.scale.set(1, 1, 1);

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

  createDoorPortalVisual() {
    const group = new THREE.Group();

    const width = 1.5;
    const height = 2.1;
    const depth = 0.4;
    const thickness = 0.055;

    const fireMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8a00,
      transparent: true,
      opacity: 0.95,
    });

    const innerGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd47a,
      transparent: true,
      opacity: 0.75,
    });

    const spaceMaterial = new THREE.MeshBasicMaterial({
      color: 0x090019,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    });

    const backSpaceMaterial = new THREE.MeshBasicMaterial({
      color: 0x17003d,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(width, thickness, thickness),
      fireMaterial
    );
    top.position.y = height / 2;

    const bottom = new THREE.Mesh(
      new THREE.BoxGeometry(width, thickness, thickness),
      fireMaterial
    );
    bottom.position.y = -height / 2;

    const left = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, height, thickness),
      fireMaterial
    );
    left.position.x = -width / 2;

    const right = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, height, thickness),
      fireMaterial
    );
    right.position.x = width / 2;

    const innerTop = new THREE.Mesh(
      new THREE.BoxGeometry(width * 0.86, thickness * 0.55, thickness),
      innerGlowMaterial
    );
    innerTop.position.y = height * 0.38;
    innerTop.position.z = -0.03;

    const innerBottom = innerTop.clone();
    innerBottom.position.y = -height * 0.38;

    const innerLeft = new THREE.Mesh(
      new THREE.BoxGeometry(thickness * 0.55, height * 0.78, thickness),
      innerGlowMaterial
    );
    innerLeft.position.x = -width * 0.43;
    innerLeft.position.z = -0.03;

    const innerRight = innerLeft.clone();
    innerRight.position.x = width * 0.43;

    const frontSpace = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 0.82, height * 0.76),
      spaceMaterial
    );
    frontSpace.position.z = -0.04;

    const backSpace = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 0.72, height * 0.66),
      backSpaceMaterial
    );
    backSpace.position.z = -depth;

    const sideLeft = new THREE.Mesh(
      new THREE.PlaneGeometry(depth, height * 0.76),
      backSpaceMaterial
    );
    sideLeft.position.x = -width * 0.41;
    sideLeft.position.z = -depth / 2;
    sideLeft.rotation.y = Math.PI / 2;

    const sideRight = sideLeft.clone();
    sideRight.position.x = width * 0.41;

    const topDepth = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 0.82, depth),
      backSpaceMaterial
    );
    topDepth.position.y = height * 0.38;
    topDepth.position.z = -depth / 2;
    topDepth.rotation.x = Math.PI / 2;

    const bottomDepth = topDepth.clone();
    bottomDepth.position.y = -height * 0.38;

    const particles = this.createRectPortalParticles(900, 1.6, 2.2);
    particles.scale.set(1.15, 1.55, 1);

    group.add(
      backSpace,
      sideLeft,
      sideRight,
      topDepth,
      bottomDepth,
      frontSpace,
      top,
      bottom,
      left,
      right,
      innerTop,
      innerBottom,
      innerLeft,
      innerRight,
      particles
    );

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