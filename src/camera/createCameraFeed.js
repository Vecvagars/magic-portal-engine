export function createCameraFeed({ video, status }) {
  let stream = null

  async function start() {
    try {
      status.textContent = 'Requesting camera permission...'

      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      video.srcObject = stream
      await video.play()

      status.textContent = 'Camera running'
    } catch (error) {
      console.error(error)
      status.textContent = `Camera error: ${error.message}`
    }
  }

  function stop() {
    if (!stream) return

    stream.getTracks().forEach((track) => track.stop())
    stream = null
    video.srcObject = null
    status.textContent = 'Camera stopped'
  }

  return {
    start,
    stop,
  }
}
