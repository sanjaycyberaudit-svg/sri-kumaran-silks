import { SAREE_SHOP_MODEL_IMAGES } from "@/lib/supabase/seedData/collectionPlaceholders";

/** Fallback homepage testimonials when Supabase has none yet. */
export const defaultHomeTestimonials = [
  {
    node: {
      id: "default-t1",
      kind: "text" as const,
      customer_name: "Priya S.",
      location: "Salem, Tamil Nadu",
      quote:
        "Kanjivaram and soft silk quality is excellent. Honest Salem pricing — my favourite shop for Pongal and Diwali.",
      rating: 5,
      video_url: null,
      featuredImage: {
        key: SAREE_SHOP_MODEL_IMAGES[0],
        alt: "SRI KUMARAN SILKS customer — Salem",
      },
    },
  },
  {
    node: {
      id: "default-t2",
      kind: "text" as const,
      customer_name: "Lakshmi R.",
      location: "Coimbatore, Tamil Nadu",
      quote:
        "Ordered cotton sarees online — colours matched the photos and delivery to Coimbatore was quick. Very happy!",
      rating: 5,
      video_url: null,
      featuredImage: {
        key: SAREE_SHOP_MODEL_IMAGES[1],
        alt: "SRI KUMARAN SILKS customer — Coimbatore",
      },
    },
  },
  {
    node: {
      id: "default-t3",
      kind: "text" as const,
      customer_name: "Meena K.",
      location: "Chennai, Tamil Nadu",
      quote:
        "They helped me pick the perfect wedding saree. Wholesale rates are fair and the collection is huge.",
      rating: 5,
      video_url: null,
      featuredImage: {
        key: SAREE_SHOP_MODEL_IMAGES[2],
        alt: "SRI KUMARAN SILKS customer — Chennai",
      },
    },
  },
  {
    node: {
      id: "default-t-v1",
      kind: "video" as const,
      customer_name: "Anitha R.",
      location: "Erode, Tamil Nadu",
      quote:
        "In-store saree shopping at SRI KUMARAN SILKS — beautiful silks and friendly staff.",
      rating: 5,
      video_url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
      featuredImage: {
        key: SAREE_SHOP_MODEL_IMAGES[3],
        alt: "SRI KUMARAN SILKS customer — Erode",
      },
    },
  },
  {
    node: {
      id: "default-t4",
      kind: "text" as const,
      customer_name: "Divya M.",
      location: "Madurai, Tamil Nadu",
      quote:
        "Kubera pattu and fancy silk range is outstanding. Saree was packed carefully for courier — reached safely.",
      rating: 5,
      video_url: null,
      featuredImage: {
        key: SAREE_SHOP_MODEL_IMAGES[4],
        alt: "SRI KUMARAN SILKS customer — Madurai",
      },
    },
  },
];
