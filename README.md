# Magic Portal Engine v0.2

Camera passthrough prototype.

## Run locally

```bash
npm install
npm run dev
```

Open from computer:

```text
http://localhost:5173/
```

Open from phone using the Network address shown in terminal.

## Important

Camera access on mobile browsers usually requires HTTPS, except localhost.
If camera does not start from a local network HTTP address, use a temporary tunnel such as ngrok or deploy to Vercel/Cloudflare Pages.

## Current version

- Three.js animated portal
- Camera video background
- Transparent WebGL canvas over camera
- Start Camera button

## Next

- HTTPS test/deploy
- Poster image tracking
- Portal anchored to poster
