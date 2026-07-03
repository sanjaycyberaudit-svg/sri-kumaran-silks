import { shopMediaBaseUrl } from "@/lib/supabase/project";

/** Original SSR Tex / Sri Kumaran Silks Tamil Nadu saree model photos (Supabase Storage). */
const SHOP_MEDIA_BASE = shopMediaBaseUrl();

export const SAREE_SHOP_MODEL_IMAGES = [
  `${SHOP_MEDIA_BASE}saree-R-tapgdDCDppiSQlGdkRl.webp`,
  `${SHOP_MEDIA_BASE}saree-pdIkXPnfznIDPsDJ4k4PE.webp`,
  `${SHOP_MEDIA_BASE}saree-U0Rtn9BZSywuxw19vrXla.webp`,
  `${SHOP_MEDIA_BASE}saree-N2Osq4mnOsiSNYN62fSbu.webp`,
  `${SHOP_MEDIA_BASE}upload-yMQI_X4Up0VTMyFXk9ZU7.webp`,
  `${SHOP_MEDIA_BASE}upload-RzPrdVNd6zAdsxUqjC0WD.webp`,
  `${SHOP_MEDIA_BASE}upload-TYcLFtrenilsOJUUynu8U.webp`,
  `${SHOP_MEDIA_BASE}upload-jYVtTkgJ_e2FyiDDUc9Jg.webp`,
] as const;

/** Best-fit saree model photo per category label */
const COLLECTION_IMAGE_BY_LABEL: Record<string, string> = {
  "Softie Sarees": SAREE_SHOP_MODEL_IMAGES[3],
  "Kanjivaram Wedding Sarees": SAREE_SHOP_MODEL_IMAGES[0],
  "Soft Silk Sarees": SAREE_SHOP_MODEL_IMAGES[3],
  "Banaras Tissue Silk Sarees": SAREE_SHOP_MODEL_IMAGES[5],
  "Traditional Silk Sarees": SAREE_SHOP_MODEL_IMAGES[0],
  "Kubera Pattu Sarees": SAREE_SHOP_MODEL_IMAGES[2],
  "Wedding Collections": SAREE_SHOP_MODEL_IMAGES[2],
  "Cotton Sarees": SAREE_SHOP_MODEL_IMAGES[1],
  "Silk Cotton Sarees": SAREE_SHOP_MODEL_IMAGES[1],
  "Fancy Silk Sarees": SAREE_SHOP_MODEL_IMAGES[4],
  "Mysore Silk": SAREE_SHOP_MODEL_IMAGES[6],
  "Mysore silk": SAREE_SHOP_MODEL_IMAGES[6],
  "Space Silk Saree": SAREE_SHOP_MODEL_IMAGES[5],
  "Space silk saree": SAREE_SHOP_MODEL_IMAGES[5],
  "Fancy Sarees": SAREE_SHOP_MODEL_IMAGES[7],
  "Fancy sarees": SAREE_SHOP_MODEL_IMAGES[7],
  "Celebrity Inspired Saree": SAREE_SHOP_MODEL_IMAGES[4],
  "celebrity inspired saree": SAREE_SHOP_MODEL_IMAGES[4],
  "Silk Sarees": SAREE_SHOP_MODEL_IMAGES[0],
  "Kanchi Sarees": SAREE_SHOP_MODEL_IMAGES[0],
  "Designer Sarees": SAREE_SHOP_MODEL_IMAGES[4],
};

export const COLLECTION_PLACEHOLDER_IMAGES = [...SAREE_SHOP_MODEL_IMAGES];

export function collectionPlaceholderImage(index: number): string {
  const list = COLLECTION_PLACEHOLDER_IMAGES;
  return list[index % list.length] ?? list[0];
}

export function collectionImageForLabel(label: string, index = 0): string {
  return COLLECTION_IMAGE_BY_LABEL[label] ?? collectionPlaceholderImage(index);
}

export const DEFAULT_SAREE_PLACEHOLDER = COLLECTION_PLACEHOLDER_IMAGES[0];

export const HERO_BANNER_IMAGES = {
  festiveSilk: SAREE_SHOP_MODEL_IMAGES[0],
  summerWeaves: SAREE_SHOP_MODEL_IMAGES[1],
  weddingEdit: SAREE_SHOP_MODEL_IMAGES[2],
  dailyElegance: SAREE_SHOP_MODEL_IMAGES[3],
} as const;

export function heroBannerImage(key: keyof typeof HERO_BANNER_IMAGES): string {
  return HERO_BANNER_IMAGES[key];
}
