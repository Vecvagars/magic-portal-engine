export default {
  tracking: {
    provider: "mindar",
    target: "/assets/targets/doorway-arch-far.mind",
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
      },
    },
  ],
};