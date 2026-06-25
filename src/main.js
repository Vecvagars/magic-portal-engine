import './style.css'
import { createCameraFeed } from './camera/createCameraFeed.js'
import { createPortalScene } from './portal/createPortalScene.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <video id="camera-feed" autoplay playsinline muted></video>
  <div id="canvas-container"></div>

  <div class="ui">
    <div class="badge">Magic Nebula</div>
    <h1>Magic Portal Engine</h1>
    <p>v0.2 — camera passthrough prototype</p>

    <div class="buttons">
      <button id="startCamera">Start camera</button>
      <button id="openPortal">Open portal</button>
    </div>

    <div id="status">Camera not started</div>
  </div>
`

const status = document.querySelector('#status')
const video = document.querySelector('#camera-feed')

const cameraFeed = createCameraFeed({
  video,
  status,
})

createPortalScene({
  container: document.querySelector('#canvas-container'),
  button: document.querySelector('#openPortal'),
})

document.querySelector('#startCamera').addEventListener('click', async () => {
  await cameraFeed.start()
})
