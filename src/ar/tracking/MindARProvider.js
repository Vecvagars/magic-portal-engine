import * as THREE from "three";
import { TrackingProvider } from "./TrackingProvider.js";
import { SceneLoader } from "../../engine/SceneLoader.js";
import { TrackingPipeline } from "../../engine/tracking/TrackingPipeline.js";
import { PoseFilter } from "../../engine/tracking/PoseFilter.js";

export class MindARProvider extends TrackingProvider {
  constructor(sceneDefinition) {
    super();

    this.sceneDefinition = sceneDefinition;

    this.trackingPipeline = new TrackingPipeline();
    this.trackingPipeline.add(
      new PoseFilter({
        smoothing: 0.18,
      })
    );

    this.mindarThree = null;
    this.anchor = null;
    this.targetFoundCallback = null;
    this.targetLostCallback = null;
    this.sceneLoader = null;
  }

  async initialize() {
    const module = await import(
      "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js/+esm"
    );

    const { MindARThree } = module;

    this.mindarThree = new MindARThree({
      container: document.querySelector("#ar-container"),
      imageTargetSrc: this.sceneDefinition.tracking.config.target,
    });

    const { scene } = this.mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    this.anchor = this.mindarThree.addAnchor(0);

    this.sceneLoader = new SceneLoader(this.sceneDefinition);
    this.sceneLoader.attachTo(this.anchor.group);

    this.anchor.onTargetFound = () => {
      console.log("Target found");

      this.trackingPipeline.reset();

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

    this.sceneLoader?.start();

    const { renderer, scene, camera } = this.mindarThree;

    let previousTime = performance.now();

    renderer.setAnimationLoop(() => {
      const now = performance.now();
      const delta = (now - previousTime) / 1000;
      previousTime = now;

      this.sceneLoader?.update(delta);
      this.trackingPipeline.apply(this.anchor.group);

      renderer.render(scene, camera);
    });
  }

  async stop() {
    if (!this.mindarThree) return;

    this.sceneLoader?.stop();
    await this.mindarThree.stop();
  }

  onTargetFound(callback) {
    this.targetFoundCallback = callback;
  }

  onTargetLost(callback) {
    this.targetLostCallback = callback;
  }
}