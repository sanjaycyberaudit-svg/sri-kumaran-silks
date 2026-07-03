"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buildForwardSlantPaths } from "@/lib/brand/shop-board-paths";

type Props = {
  slantPercent: number;
  minHeight: number;
  padX: number;
  padY: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Forward-slanted shop-board frame — SVG trapezoid + gold border (reference sign). */
export function ShopBoardPanel({
  slantPercent,
  minHeight,
  padX,
  padY,
  className,
  style,
  children,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const purple = `sb-purple-${uid}`;
  const purpleSheen = `sb-sheen-${uid}`;
  const silk = `sb-silk-${uid}`;
  const goldDeep = `sb-gold-deep-${uid}`;

  const paths = buildForwardSlantPaths(slantPercent);

  return (
    <span
      className={cn(
        "brand-board-frame relative inline-flex max-w-full",
        className,
      )}
      style={{ minHeight, height: minHeight, ...style }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        shapeRendering="geometricPrecision"
        aria-hidden
      >
        <defs>
          <linearGradient id={purple} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6E1212" />
            <stop offset="30%" stopColor="#A82020" />
            <stop offset="50%" stopColor="#C82828" />
            <stop offset="70%" stopColor="#A82020" />
            <stop offset="100%" stopColor="#8B1818" />
          </linearGradient>
          <linearGradient id={purpleSheen} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.09" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id={silk} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="18%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="38%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="58%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="78%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
          </linearGradient>
          <linearGradient id={goldDeep} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff8e7" />
            <stop offset="50%" stopColor="#F0C020" />
            <stop offset="100%" stopColor="#D4A812" />
          </linearGradient>
        </defs>

        <g>
          <path d={paths.fill} fill={`url(#${purple})`} />
          <path d={paths.fill} fill={`url(#${purpleSheen})`} />
          <path d={paths.fill} fill={`url(#${silk})`} />
        </g>

        {/* Single gold frame — one clean line (no double border) */}
        <path
          d={paths.outer}
          fill="none"
          stroke={`url(#${goldDeep})`}
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="miter"
        />
      </svg>

      <span
        className="relative z-[1] flex w-full min-w-0 flex-col items-center justify-center text-center"
        style={{
          padding: `${padY}px ${padX + paths.slantPadExtra}px ${padY}px ${padX}px`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default ShopBoardPanel;
