Magic Nebula Engine — Engineering Guidelines

Version: 0.1

⸻

Vision

Magic Nebula Engine is a reusable engine for building spatial experiences.

The goal is not to build individual AR projects.

The goal is to build a reusable runtime capable of powering many different experiences using the same architecture.

Examples include:

* AR Portals
* Product Experiences
* Museum Installations
* Concert Experiences
* AI Characters
* Navigation Systems
* Future XR Experiences

⸻

Core Philosophy

The Engine executes.

Experiences describe.

The Engine should never contain client-specific logic.

⸻

Runtime vs Experience

Runtime

Reusable engine code.

Examples:

* Tracking
* Rendering
* Modules
* Assets
* Event System
* AI Runtime
* Networking
* Geometry
* Utilities

Runtime should be reusable across every project.

⸻

Experience

Experience contains only configuration.

Examples:

* tracking provider
* targets
* modules
* assets
* dimensions
* colors
* texts
* audio
* videos

Experience must never modify Runtime.

⸻

Architecture

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

Scene Philosophy

A Scene describes what should happen.

A Scene never contains logic.

Scene contains only configuration.

⸻

Module Philosophy

Modules implement behaviour.

Every module follows the same lifecycle.

initialize()
attach(parent)
start()
update(delta)
stop()
destroy()

Modules should never communicate directly.

Future communication should happen through the Event System.

⸻

Factory Philosophy

Factories create objects.

Factories never contain runtime logic.

Examples:

* ModuleFactory
* PortalFactory
* TrackingProviderFactory
* TrackingFilterFactory

Future:

* AssetFactory
* MaterialFactory
* ShaderFactory

⸻

Pipeline Philosophy

Whenever data passes through multiple processing stages, use a Pipeline.

Examples:

* TrackingPipeline

Future:

* RenderPipeline
* AssetPipeline
* AudioPipeline

⸻

Provider Philosophy

External technologies should always be hidden behind Providers.

Examples:

* MindARProvider

Future:

* WebXRProvider
* VPSProvider
* EightWallProvider

The Engine should never depend directly on external SDKs.

⸻

Configuration Philosophy

Configuration belongs inside Scene.

Runtime reads configuration.

Runtime never hardcodes client-specific values.

⸻

SDK First

Every new Runtime API should answer one question:

“If this component were used by 100 different projects, would this API still make sense?”

If not, redesign it.

⸻

Engine Principles

1. Runtime is reusable.
2. Experience is declarative.
3. Configuration over hardcoding.
4. Composition over inheritance where possible.
5. Providers isolate third-party technologies.
6. Pipelines process data.
7. Factories create objects.
8. Modules implement behaviour.
9. Runtime never contains client-specific logic.
10. Simplicity beats cleverness.

⸻

Long-Term Vision

Magic Nebula Engine should evolve into a complete spatial engine capable of powering AR, VR and future XR experiences without changing its core architecture.