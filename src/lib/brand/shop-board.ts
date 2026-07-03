/** Sri Kumaran Silks shop-board — SVG panel with forward-slanted right edge */
export type ShopBoardBrandSize = "nav" | "md" | "footer";

/** Transparent Murugan emblem (420×500 source) — left of shop board */
export const SHOP_EMBLEM_SRC = "/images/sri-kumaran-silks-emblem.png";
export const SHOP_EMBLEM_ASPECT = 420 / 500;

/** Transparent gold wordmark (removebg, 713×228 cropped) */
export const SHOP_WORDMARK_SRC = "/images/sri-kumaran-silks-wordmark.png";
export const SHOP_WORDMARK_ASPECT = 713 / 228;

export function shopEmblemDimensions(heightPx: number) {
  return {
    height: heightPx,
    width: Math.round(heightPx * SHOP_EMBLEM_ASPECT),
  };
}

/** 2× intrinsic size for retina — display size unchanged (emblem only) */
export const EMBLEM_RENDER_DPR = 2;

export function shopEmblemRenderSize(displayHeightPx: number) {
  const display = shopEmblemDimensions(displayHeightPx);
  const dpr = EMBLEM_RENDER_DPR;
  return {
    display,
    intrinsic: {
      height: display.height * dpr,
      width: display.width * dpr,
    },
  };
}

export function shopWordmarkDimensions(heightPx: number) {
  return {
    height: heightPx,
    width: Math.round(heightPx * SHOP_WORDMARK_ASPECT),
  };
}

type SizeConfig = {
  panelMinHeight: number;
  /** Transparent medallion — matches sign height */
  emblemPx: number;
  /** Panel tucks under emblem right edge (px) */
  emblemOverlapPx: number;
  /** Shift emblem right (px) — logo position only */
  emblemOffsetRightPx: number;
  /** Lift emblem slightly above panel center (px, negative = up) */
  emblemOffsetUpPx: number;
  wordmarkHeightPx: number;
  locationFontPx: number;
  locationTracking: string;
  panelPadX: number;
  panelPadY: number;
  /** Forward slant: top-right extends past bottom-right (% of panel width) */
  slantPercent: number;
  lineWidthPx: number;
};

export const shopBoardSizeConfig: Record<ShopBoardBrandSize, SizeConfig> = {
  nav: {
    panelMinHeight: 52,
    emblemPx: 56,
    emblemOverlapPx: 14,
    emblemOffsetRightPx: 10,
    emblemOffsetUpPx: -3,
    wordmarkHeightPx: 33,
    locationFontPx: 8,
    locationTracking: "0.18em",
    panelPadX: 12,
    panelPadY: 2,
    slantPercent: 11,
    lineWidthPx: 20,
  },
  md: {
    panelMinHeight: 58,
    emblemPx: 62,
    emblemOverlapPx: 16,
    emblemOffsetRightPx: 10,
    emblemOffsetUpPx: -3,
    wordmarkHeightPx: 37,
    locationFontPx: 10,
    locationTracking: "0.2em",
    panelPadX: 14,
    panelPadY: 3,
    slantPercent: 12,
    lineWidthPx: 24,
  },
  footer: {
    panelMinHeight: 72,
    emblemPx: 76,
    emblemOverlapPx: 18,
    emblemOffsetRightPx: 8,
    emblemOffsetUpPx: -4,
    wordmarkHeightPx: 47,
    locationFontPx: 11,
    locationTracking: "0.22em",
    panelPadX: 16,
    panelPadY: 5,
    slantPercent: 12,
    lineWidthPx: 28,
  },
};
