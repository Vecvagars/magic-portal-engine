import * as THREE from "three";

export class PoseFilter {
  constructor({ smoothing = 0.18 } = {}) {
    this.smoothing = smoothing;

    this.position = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion();
    this.scale = new THREE.Vector3(1, 1, 1);

    this.initialized = false;
  }

  apply(object) {
    if (!object) return;

    if (!this.initialized) {
      this.position.copy(object.position);
      this.quaternion.copy(object.quaternion);
      this.scale.copy(object.scale);
      this.initialized = true;
      return;
    }

    this.position.lerp(object.position, this.smoothing);
    this.quaternion.slerp(object.quaternion, this.smoothing);
    this.scale.lerp(object.scale, this.smoothing);

    object.position.copy(this.position);
    object.quaternion.copy(this.quaternion);
    object.scale.copy(this.scale);
  }

  reset() {
    this.initialized = false;
  }
}