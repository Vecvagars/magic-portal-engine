import * as THREE from "three";
import { TrackingProvider } from "./TrackingProvider.js";
import sceneDefinition from "../../projects/altum-doorway/scene.js";
import { SceneLoader } from "../../engine/SceneLoader.js";

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
      imageTargetSrc: sceneDefinition.tracking.target,
    });

    const { scene } = this.mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    this.anchor = this.mindarThree.addAnchor(0);

    const sceneLoader = new SceneLoader(sceneDefinition);
    sceneLoader.attachTo(this.anchor.group);

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
}