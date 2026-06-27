import fs from "fs";
import { createCanvas } from "canvas";

fs.mkdirSync("public/assets/textures/portal", { recursive: true });

function createGlowTexture() {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  const center = size / 2;

  const gradient = ctx.createRadialGradient(
    center,
    center,
    size * 0.18,
    center,
    center,
    size * 0.5
  );

  gradient.addColorStop(0.0, "rgba(255,255,255,0)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.08)");
  gradient.addColorStop(0.68, "rgba(255,255,255,0.7)");
  gradient.addColorStop(0.86, "rgba(255,255,255,0.22)");
  gradient.addColorStop(1.0, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  fs.writeFileSync(
    "public/assets/textures/portal/glow.png",
    canvas.toBuffer("image/png")
  );
}

function createNoiseTexture() {
  const size = 512;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(size, size);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = Math.floor(Math.random() * 255);

    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = value;
    imageData.data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);

  fs.writeFileSync(
    "public/assets/textures/portal/noise.png",
    canvas.toBuffer("image/png")
  );
}

createGlowTexture();
createNoiseTexture();

console.log("Portal textures generated.");