import fs from "fs";
import { createCanvas } from "canvas";

const outputDir = "public/assets/textures/portal";
fs.mkdirSync(outputDir, { recursive: true });

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function roundedRectDistance(x, y, width, height, radius) {
  const qx = Math.abs(x) - width / 2 + radius;
  const qy = Math.abs(y) - height / 2 + radius;

  const outsideX = Math.max(qx, 0);
  const outsideY = Math.max(qy, 0);
  const outsideDistance = Math.sqrt(outsideX * outsideX + outsideY * outsideY);
  const insideDistance = Math.min(Math.max(qx, qy), 0);

  return outsideDistance + insideDistance - radius;
}

function createRectangularGlowTexture() {
  const size = 1024;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(size, size);

  const rectWidth = size * 0.66;
  const rectHeight = size * 0.86;
  const radius = size * 0.035;
  const outerGlowWidth = size * 0.11;
  const innerGlowWidth = size * 0.055;
  const edgeWidth = size * 0.022;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = x - size / 2;
      const py = y - size / 2;
      const distance = roundedRectDistance(px, py, rectWidth, rectHeight, radius);

      const edge = 1 - clamp(Math.abs(distance) / edgeWidth, 0, 1);

      const outsideGlow =
        distance > 0
          ? 1 - clamp(distance / outerGlowWidth, 0, 1)
          : 0;

      const insideGlow =
        distance < 0
          ? 1 - clamp(Math.abs(distance) / innerGlowWidth, 0, 1)
          : 0;

      const alpha = Math.max(
        edge * 0.95,
        outsideGlow * 0.42,
        insideGlow * 0.22
      );

      const index = (y * size + x) * 4;
      imageData.data[index] = 255;
      imageData.data[index + 1] = 255;
      imageData.data[index + 2] = 255;
      imageData.data[index + 3] = Math.floor(clamp(alpha, 0, 1) * 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);

  fs.writeFileSync(
    `${outputDir}/glow.png`,
    canvas.toBuffer("image/png")
  );
}

function createNoiseTexture() {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(size, size);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = Math.floor(90 + Math.random() * 120);

    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = value;
    imageData.data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);

  fs.writeFileSync(
    `${outputDir}/noise.png`,
    canvas.toBuffer("image/png")
  );
}

createRectangularGlowTexture();
createNoiseTexture();

console.log("Portal texture pack generated.");