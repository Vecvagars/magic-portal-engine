export const PORTAL_THEMES = {
  energy: {
    frame: {
      color: 0xff8a00,
      opacity: 0.9,
    },

    opening: {
        enabled: true,
        duration: 1.2,
        startScale: {
            x: 0.08,
            y: 1.0,
            z: 1.0,
        }, 
    },


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

    surface: {
        color: 0x050010,
        opacity: 0.68,

        texture: {
            key: "portalNoise",

            repeat: {
            x: 1.6,
            y: 2.4,
            },

            speed: {
            x: 0.012,
            y: 0.018,
            },
        },

        pulse: {
            enabled: true,
            speed: 1.4,
            strength: 0.08,
        },
        },

    tunnel: {
      color: 0x110021,
      opacity: 0.42,
    },
  },
};