import * as THREE from 'three'

export function createPortalScene({ container, button }) {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
  camera.position.set(0, 0, 5)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })

  renderer.setClearColor(0x000000, 0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  const portal = createPortal()
  scene.add(portal.group)

  const ambient = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambient)

  const point = new THREE.PointLight(0xff9d00, 80, 10)
  point.position.set(0, 0, 2.5)
  scene.add(point)

  let isOpen = true

  button.addEventListener('click', () => {
    isOpen = !isOpen
    button.textContent = isOpen ? 'Close portal' : 'Open portal'
  })

  function animate() {
    requestAnimationFrame(animate)

    const t = performance.now() * 0.001
    portal.update(t, isOpen)

    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

function createPortal() {
  const group = new THREE.Group()
  group.position.set(0, 0, 0)

  const ringOuter = new THREE.Mesh(
    new THREE.TorusGeometry(1.25, 0.075, 32, 180),
    new THREE.MeshBasicMaterial({ color: 0xff9a00 })
  )

  const ringInner = new THREE.Mesh(
    new THREE.TorusGeometry(1.07, 0.035, 32, 180),
    new THREE.MeshBasicMaterial({ color: 0xffe0a0 })
  )

  const core = new THREE.Mesh(
    new THREE.CircleGeometry(1.0, 128),
    new THREE.MeshBasicMaterial({
      color: 0x080018,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    })
  )
  core.position.z = -0.035

  const vortex = new THREE.Mesh(
    new THREE.RingGeometry(0.18, 0.98, 128),
    new THREE.MeshBasicMaterial({
      color: 0x1a0a3d,
      transparent: true,
      opacity: 0.62,
      side: THREE.DoubleSide,
    })
  )
  vortex.position.z = -0.025

  const particles = createParticles(850)

  group.add(core, vortex, ringOuter, ringInner, particles)

  return {
    group,
    update(t, isOpen) {
      const targetScale = isOpen ? 1.05 : 0.3
      const pulse = Math.sin(t * 4.0) * 0.035
      const scale = targetScale + pulse

      group.scale.setScalar(scale)

      ringOuter.rotation.z = t * 0.52
      ringInner.rotation.z = -t * 0.82
      vortex.rotation.z = -t * 0.35
      particles.rotation.z = t * 0.22

      const glow = 0.85 + Math.sin(t * 7) * 0.15
      ringOuter.material.color.setHSL(0.105, 1, 0.45 + glow * 0.12)
      ringInner.material.color.setHSL(0.12, 1, 0.70 + glow * 0.08)

      vortex.material.opacity = isOpen ? 0.72 : 0.12
      core.material.opacity = isOpen ? 0.88 : 0.12
    },
  }
}

function createParticles(count) {
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 1.0 + Math.random() * 0.55

    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = Math.sin(angle) * radius
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.7
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: 0xffc04d,
      size: 0.027,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    })
  )
}
