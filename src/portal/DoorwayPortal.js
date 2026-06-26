import * as THREE from "three";

export class DoorwayPortal {
  create() {
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

    const glowMaterial = new THREE.MeshBasicMaterial({
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

    const backMaterial = new THREE.MeshBasicMaterial({
      color: 0x17003d,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });

    const top = new THREE.Mesh(new THREE.BoxGeometry(width, thickness, thickness), fireMaterial);
    top.position.y = height / 2;

    const bottom = top.clone();
    bottom.position.y = -height / 2;

    const left = new THREE.Mesh(new THREE.BoxGeometry(thickness, height, thickness), fireMaterial);
    left.position.x = -width / 2;

    const right = left.clone();
    right.position.x = width / 2;

    const frontSpace = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 0.82, height * 0.76),
      spaceMaterial
    );
    frontSpace.position.z = -0.04;

    const backSpace = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 0.72, height * 0.66),
      backMaterial
    );
    backSpace.position.z = -depth;

    const innerTop = new THREE.Mesh(
      new THREE.BoxGeometry(width * 0.86, thickness * 0.55, thickness),
      glowMaterial
    );
    innerTop.position.y = height * 0.38;
    innerTop.position.z = -0.03;

    const innerBottom = innerTop.clone();
    innerBottom.position.y = -height * 0.38;

    const innerLeft = new THREE.Mesh(
      new THREE.BoxGeometry(thickness * 0.55, height * 0.78, thickness),
      glowMaterial
    );
    innerLeft.position.x = -width * 0.43;
    innerLeft.position.z = -0.03;

    const innerRight = innerLeft.clone();
    innerRight.position.x = width * 0.43;

    const particles = this.createParticles(900, 1.6, 2.2);
    particles.scale.set(1.15, 1.55, 1);

    group.add(
      backSpace,
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

  createParticles(count, width, height) {
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