import { heroBannerImage } from "@/lib/supabase/seedData/collectionPlaceholders";

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  /** Show photo only — no title overlay (storefront / signboard slides). */
  photoOnly?: boolean;
  /** Tailwind object-position classes for the slide image. */
  imageObjectClass?: string;
};

/** Homepage hero carousel — real Tamil saree model photography until Admin → Home Banner uploads. */
export const heroSlides: HeroSlide[] = [
  {
    id: "storefront",
    title: "Sri Kumaran Silks",
    subtitle: "Wholesale & retail silk sarees — Elampillai, Salem",
    href: "/contact",
    cta: "Visit us",
    image: "/images/sri-kumaran-silks-storefront-banner.png",
    imageAlt:
      "SRI KUMARAN SILKS storefront at Elampillai — silk saree shop entrance",
    photoOnly: true,
    imageObjectClass:
      "object-cover object-[center_18%] sm:object-[center_28%] md:object-[center_32%]",
  },
  {
    id: "festive-silk",
    title: "Festive Silk",
    subtitle:
      "Kanjivaram, soft silk, and wedding weaves — curated for every celebration",
    href: "/collections/kanjivaram-wedding-sarees",
    cta: "Shop now",
    image: heroBannerImage("festiveSilk"),
    imageAlt: "Model in Kanjivaram silk saree — SRI KUMARAN SILKS, Salem",
  },
  {
    id: "summer-weaves",
    title: "Summer Weaves",
    subtitle:
      "Light cotton, silk cotton, and soft silks for comfort and elegance",
    href: "/collections/cotton-sarees",
    cta: "Shop now",
    image: heroBannerImage("summerWeaves"),
    imageAlt: "Model in cotton saree — SRI KUMARAN SILKS, Tamil Nadu",
  },
  {
    id: "wedding-edit",
    title: "Wedding Edit",
    subtitle:
      "Traditional silks, Kubera pattu, and celebrity-inspired bridal looks",
    href: "/collections/wedding-collections",
    cta: "Shop now",
    image: heroBannerImage("weddingEdit"),
    imageAlt: "Model in wedding silk saree — SRI KUMARAN SILKS, Salem",
  },
  {
    id: "daily-elegance",
    title: "Daily Elegance",
    subtitle: "Softie sarees and fancy silks — premium quality, trusted weave",
    href: "/shop",
    cta: "Shop now",
    image: heroBannerImage("dailyElegance"),
    imageAlt: "Model in soft silk saree — SRI KUMARAN SILKS, Tamil Nadu",
  },
];
