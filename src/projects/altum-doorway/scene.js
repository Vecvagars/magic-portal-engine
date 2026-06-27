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

  modules: [
    {
      type: "portal",

      config: {
        variant: "doorway",

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

        effects: {
          glow: {
            enabled: true,
            color: 0xff8a00,
            opacity: 0.32,
            width: 1.42,
            height: 1.98,
            thickness: 0.085,
            z: 0.018,
          },

          particles: {
            enabled: true,
            count: 220,
            width: 1.4,
            height: 1.9,
            color: 0xff8a00,
            size: 0.015,
            opacity: 0.75,
          },
        },
      },
    },
  ],
};