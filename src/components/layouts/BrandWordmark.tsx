import type { CSSProperties } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  SHOP_EMBLEM_SRC,
  SHOP_WORDMARK_SRC,
  shopBoardSizeConfig,
  shopEmblemRenderSize,
  shopWordmarkDimensions,
  type ShopBoardBrandSize,
} from "@/lib/brand/shop-board";
import { ShopBoardPanel } from "./ShopBoardPanel";

export type BrandWordmarkSize = ShopBoardBrandSize;

type Props = {
  className?: string;
  size?: BrandWordmarkSize;
  align?: "left" | "center";
};

function GoldRule({ widthPx }: { widthPx: number }) {
  return (
    <span
      className="brand-board-rule shrink-0"
      style={{ width: widthPx }}
      aria-hidden
    />
  );
}

/** Shop sign lockup — Murugan emblem + red card panel with transparent wordmark. */
export function BrandWordmark({
  className,
  size = "md",
  align = "left",
}: Props) {
  const config = shopBoardSizeConfig[size];
  const emblem = shopEmblemRenderSize(config.emblemPx);
  const wordmark = shopWordmarkDimensions(config.wordmarkHeightPx);

  return (
    <span
      className={cn(
        "brand-board-lockup inline-flex max-w-full items-center",
        size === "nav" && "brand-board-lockup--nav",
        align === "center" && "mx-auto",
        className,
      )}
      aria-label={`${siteConfig.shopBoardName}, ${siteConfig.location}`}
    >
      <span
        className="brand-board-emblem-wrap relative z-[2] shrink-0"
        style={{
          marginLeft: config.emblemOffsetRightPx,
          transform: `translateY(${config.emblemOffsetUpPx}px)`,
        }}
      >
        <Image
          src={SHOP_EMBLEM_SRC}
          alt=""
          width={emblem.intrinsic.width}
          height={emblem.intrinsic.height}
          className="brand-board-emblem h-auto w-auto max-h-[var(--emblem-h)] max-w-[var(--emblem-w)] object-contain object-bottom"
          style={
            {
              "--emblem-h": `${emblem.display.height}px`,
              "--emblem-w": `${emblem.display.width}px`,
            } as CSSProperties
          }
          priority={size === "nav"}
          quality={100}
          unoptimized
          aria-hidden
        />
      </span>

      <ShopBoardPanel
        slantPercent={config.slantPercent}
        minHeight={config.panelMinHeight}
        padX={config.panelPadX}
        padY={config.panelPadY}
        className={cn(`brand-board-panel--${size} relative z-[1]`)}
        style={{ marginLeft: -config.emblemOverlapPx }}
      >
        <Image
          src={SHOP_WORDMARK_SRC}
          alt=""
          width={wordmark.width}
          height={wordmark.height}
          className="brand-board-wordmark block h-auto w-auto max-h-[var(--wordmark-h)] max-w-full shrink-0 object-contain object-center"
          style={
            {
              "--wordmark-h": `${wordmark.height}px`,
            } as CSSProperties
          }
          priority={size === "nav"}
          quality={100}
          unoptimized
          aria-hidden
        />

        <span className="mt-0.5 flex w-full items-center justify-center gap-1 leading-none">
          <GoldRule widthPx={config.lineWidthPx} />
          <span
            className="brand-board-location whitespace-nowrap font-[family-name:var(--font-brand-sans)] font-bold uppercase"
            style={{
              fontSize: config.locationFontPx,
              letterSpacing: config.locationTracking,
              lineHeight: 1.2,
            }}
          >
            {siteConfig.location}
          </span>
          <GoldRule widthPx={config.lineWidthPx} />
        </span>
      </ShopBoardPanel>
    </span>
  );
}

export default BrandWordmark;
