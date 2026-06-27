Magic Nebula Engine Architecture

Vision

Magic Nebula Engine is a reusable WebAR/XR runtime for building interactive spatial experiences.

The goal is not to build one specific AR demo, but a flexible engine that can support many different client experiences: portals, product launches, museum installations, avatars, navigation, video layers, Unreal integrations and future spatial tracking systems.

⸻

Core Idea

The engine is divided into two major layers:

Runtime
Experience

Runtime

Reusable engine code.

Runtime contains:

* tracking providers
* scene loading
* module lifecycle
* module factory
* shared portal/components
* future event bus
* future calibration tools
* future simulator provider

Experience

Client/project-specific configuration and assets.

Experience contains:

* scene definitions
* target files
* asset references
* module configuration
* visual style
* copy/text
* tracking provider selection

Client-specific logic should live in Experience configuration, not in Runtime.

⸻

Architecture Layers

App
  ↓
MagicNebulaEngine
  ↓
TrackingProvider
  ↓
SceneLoader
  ↓
ModuleFactory
  ↓
Modules
  ↓
Geometry / Assets / Effects

⸻

Scene

A Scene describes what should be loaded.

A scene can define:

export default {
  tracking: {
    provider: "mindar",
    target: "/assets/targets/doorway-arch-far.mind",
  },
  modules: [
    {
      type: "portal",
      variant: "doorway",
      config: {}
    }
  ]
};

The Engine loads scenes.
The TrackingProvider should not know what modules are inside the scene.

⸻

Modules

Modules are reusable experience building blocks.

Examples:

* PortalModule
* ProductModule
* CharacterModule
* VideoModule
* AudioModule
* NavigationModule

All modules should follow the same lifecycle:

initialize()
attach(parent)
start()
update(delta)
stop()
destroy()

⸻

Providers

Tracking should be replaceable.

Current provider:

* MindARProvider

Future providers:

* EightWallProvider
* VPSProvider
* WebXRProvider
* SimulatorProvider

The Engine should depend on a provider interface, not on one specific tracking technology.

⸻

Current Runtime Components

src/engine/
  SceneLoader.js
  ModuleFactory.js
src/modules/
  Module.js
  PortalModule.js
src/ar/tracking/
  TrackingProvider.js
  MindARProvider.js
src/portal/
  DoorwayPortal.js
  FrameGeometry.js
  TunnelGeometry.js

⸻

Current Experience

src/projects/altum-doorway/
  scene.js

This will likely evolve into:

src/experiences/doorway/
  scene.js

⸻

Architectural Principles

1. Build the Engine as a reusable platform, not as a single demo.
2. Client-specific adaptations belong in Experience configuration.
3. Runtime code should not contain client-specific names or assumptions.
4. Tracking providers must be replaceable.
5. Scenes define what is loaded.
6. Modules define what appears or happens.
7. The Engine coordinates; modules implement.
8. Visual polish comes after architecture is stable.

⸻

Roadmap

v0.1 — Camera + Three.js

Completed.

v0.2 — MindAR Image Tracking

Completed.

v0.3 — Doorway Portal Geometry

Completed / Stabilizing.

v0.4 — Engine Runtime Foundation

In progress.

Goals:

* MagicNebulaEngine
* SceneLoader
* Module lifecycle
* Runtime vs Experience separation

v0.5 — Calibration System

Future.

v0.6 — Portal Visual Effects

Future.

v0.7 — Spatial Tracking Research

Future.

Candidate technologies:

* 8th Wall
* Niantic VPS
* WebXR if cross-device support becomes practical

⸻

Long-Term Goal

The final goal is that a new experience can be created mostly through configuration:

engine.loadScene(scene);
engine.start();

without rewriting the Runtime.

## Portal Runtime

Portal is implemented as a reusable Runtime module.

Current structure:

```text
PortalModule
  ↓
PortalFactory
  ↓
DoorwayPortal
  ↓
PortalFrame
PortalTunnel
PortalSurface
PortalEffects