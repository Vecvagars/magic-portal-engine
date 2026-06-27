export default {
  tracking: {
    provider: "mindar",

    config: {
      target: "/assets/targets/doorway-arch-far.mind",
    },

    pipeline: {
      filters: [
        {
          type: "pose",
          config: {
            smoothing: 0.18,
          },
        },
      ],
    },
  },

  assets: {
    textures: {
      portalGlow: "/assets/textures/portal/glow.png",
      portalNoise: "/assets/textures/portal/noise.png",
    },
  },

  modules: [
    {
      type: "portal",

      config: {
        variant: "doorway",
        theme: "energy",

        width: 1.5,
        height: 2.1,
        depth: 0.4,

        frameInset: 0.1,
        frameThickness: 0.035,
        tunnelInset: 0.16,

        scale: 1,

        offset: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    },
  ],
};