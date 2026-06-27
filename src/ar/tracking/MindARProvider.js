import * as THREE from "three";
import { TrackingProvider } from "./TrackingProvider.js";
import { SceneLoader } from "../../engine/SceneLoader.js";
import { TrackingPipeline } from "../../engine/tracking/TrackingPipeline.js";
import { TrackingFilterFactory } from "../../engine/tracking/TrackingFilterFactory.js";

export class MindARProvider extends TrackingProvider {
  constructor(sceneDefinition, context = null) {
    super();

    this.sceneDefinition = sceneDefinition;
    this.context = context;

    this.mindarThree = null;
    this.anchor = null;

    this.sceneLoader = null;
    this.trackingPipeline = null;

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
      imageTargetSrc: this.sceneDefinition.tracking.config.target,
    });

    const { scene } = this.mindarThree;

    scene.add(
      new THREE.HemisphereLight(
        0xffffff,
        0xbbbbff,
        1
      )
    );

    this.anchor = this.mindarThree.addAnchor(0);

    this.sceneLoader = new SceneLoader(
      this.sceneDefinition,
      this.context
    );
    this.sceneLoader.attachTo(this.anchor.group);

    this.initializeTrackingPipeline();

    this.anchor.onTargetFound = () => {
      console.log("Target found");

      this.trackingPipeline.reset();
      this.sceneLoader?.start();

      this.targetFoundCallback?.();
    };

    this.anchor.onTargetLost = () => {
      console.log("Target lost");

      this.targetLostCallback?.();
    };

    console.log("MindAR initialized");
  }

  initializeTrackingPipeline() {
    this.trackingPipeline = new TrackingPipeline();

    const filterFactory = new TrackingFilterFactory();

    const filters =
      this.sceneDefinition.tracking.pipeline?.filters || [];

    filters.forEach((filterDefinition) => {
      this.trackingPipeline.add(
        filterFactory.create(filterDefinition)
      );
    });
  }

  async start() {
    if (!this.mindarThree) return;

    await this.mindarThree.start();

    const { renderer, scene, camera } = this.mindarThree;

    let previousTime = performance.now();

    renderer.setAnimationLoop(() => {
      const now = performance.now();
      const delta = (now - previousTime) / 1000;
      previousTime = now;

      this.sceneLoader?.update(delta);

      this.trackingPipeline?.apply(this.anchor.group);

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