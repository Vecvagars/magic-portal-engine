import { PORTAL_THEMES } from "./PortalThemes.js";

export class PortalThemeResolver {
  resolve(config) {
    const themeName = config.theme || "energy";
    const theme = PORTAL_THEMES[themeName];

    if (!theme) {
      throw new Error(`Unknown portal theme: ${themeName}`);
    }

    return {
      ...config,
      theme: themeName,
      appearance: theme,
      effects: {
        glow: theme.glow,
        particles: theme.particles,
        ...(config.effects || {}),
      },
    };
  }
}