Magic Nebula Engine Roadmap

Version: 0.1

⸻

Current Phase

Phase 1 — Runtime Foundation

Status: ✅ Completed

Completed components:

* MagicNebulaEngine
* SceneLoader
* ModuleFactory
* PortalFactory
* TrackingProviderFactory
* TrackingPipeline
* TrackingFilterFactory
* PoseFilter
* MindARProvider
* Scene configuration
* Module lifecycle

⸻

Current Architecture

App
    ↓
MagicNebulaEngine
    ↓
TrackingProviderFactory
    ↓
TrackingProvider
    ↓
TrackingPipeline
    ↓
TrackingFilterFactory
    ↓
SceneLoader
    ↓
ModuleFactory
    ↓
Modules
    ↓
Factories
    ↓
Geometry

⸻

Development Phases

Phase 2 — Rendering Core

Status: In Progress

Goals:

* AssetManager
* Texture Provider
* Material System
* Shader System
* Resource caching

⸻

Phase 3 — Spatial Core

Status: Planned

Goals:

* World Anchors
* Persistent Anchors
* Calibration
* Coordinate Systems
* Spatial Mapping

⸻

Phase 4 — XR Runtime

Status: Planned

Goals:

* WebXR Provider
* VPS Provider
* Plane Detection
* World Tracking
* Hand Tracking

⸻

Phase 5 — Intelligence

Status: Planned

Goals:

* AI Characters
* Voice Interface
* Conversation Runtime
* Behaviour System

⸻

Phase 6 — Networking

Status: Planned

Goals:

* Shared Sessions
* Multi-user
* Cloud Anchors
* Synchronization

⸻

Technical Debt

Current known technical debt:

* Tracking stabilization can be improved.
* Portal visual effects are placeholders.
* Scene validation does not yet exist.
* Assets system is not implemented.
* Event system is not implemented.

⸻

Current Priorities

1. Finish Runtime cleanup.
2. Build Rendering Core.
3. Introduce AssetManager.
4. Build Material and Shader systems.
5. Improve tracking quality.
6. Begin WebXR research.

⸻

Long-Term Vision

Magic Nebula Engine becomes a reusable engine for building spatial experiences across AR, XR and future immersive platforms.

The Engine should remain technology-agnostic, modular and reusable across different client projects.