/**
 * =============================================================================
 * 🎨 PAYTRACK THEME CONFIGURATION
 * =============================================================================
 * To change the theme colors across the ENTIRE platform, edit:
 * 👉 `src/styles/theme.css`
 *
 * This file provides TypeScript metadata, presets, and token references.
 */

export interface ThemePalette {
  name: string;
  primary: string;
  hover: string;
  soft: string;
  border: string;
  glow: string;
  textOnPrimary: string;
}

export const THEME_PRESETS: Record<string, ThemePalette> = {
  sunflowerGold: {
    name: "Sunflower Gold",
    primary: "#FFD758",
    hover: "#F2C842",
    soft: "rgba(255, 215, 88, 0.15)",
    border: "rgba(255, 215, 88, 0.45)",
    glow: "rgba(255, 215, 88, 0.28)",
    textOnPrimary: "#15121A",
  },
  amethystLavender: {
    name: "Amethyst Lavender",
    primary: "#9E7EB5",
    hover: "#8C6BA5",
    soft: "rgba(158, 126, 181, 0.15)",
    border: "rgba(158, 126, 181, 0.45)",
    glow: "rgba(158, 126, 181, 0.28)",
    textOnPrimary: "#15121A",
  },
  emeraldMint: {
    name: "Emerald Mint",
    primary: "#0D9488",
    hover: "#0F766E",
    soft: "rgba(13, 148, 136, 0.15)",
    border: "rgba(13, 148, 136, 0.45)",
    glow: "rgba(13, 148, 136, 0.28)",
    textOnPrimary: "#FFFFFF",
  },
  royalBlue: {
    name: "Royal Blue",
    primary: "#3B82F6",
    hover: "#2563EB",
    soft: "rgba(59, 130, 246, 0.15)",
    border: "rgba(59, 130, 246, 0.45)",
    glow: "rgba(59, 130, 246, 0.28)",
    textOnPrimary: "#FFFFFF",
  },
};

export const CURRENT_THEME = THEME_PRESETS.sunflowerGold;
