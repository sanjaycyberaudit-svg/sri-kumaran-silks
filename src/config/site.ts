import type { NavItemWithOptionalChildren } from "@/types";

export type SiteConfig = typeof siteConfig;

/** Business card — Sri Kumaran Silks Wholesale */
const ADDRESS_LINES = [
  "Salem Main Road",
  "Elampillai, Salem – 637 502",
] as const;

/** Phone numbers from the business card */
const CONTACTS = [
  {
    name: "Office",
    phone: "+91 86374 35696",
    phoneHref: "tel:+918637435696",
  },
  {
    name: "Mobile",
    phone: "+91 94429 46229",
    phoneHref: "tel:+919442946229",
  },
] as const;

const PHONE = CONTACTS[0].phone;
const PHONE_HREF = CONTACTS[0].phoneHref;
const MOBILE_PHONE = CONTACTS[1].phone;
const MOBILE_PHONE_HREF = CONTACTS[1].phoneHref;
const EMAIL = "";
const GSTIN = "33BMCPV3652G1Z1";

const SOCIAL = {
  instagram: "",
  youtube: "",
  facebook: "",
  whatsapp: "https://wa.me/919442946229",
} as const;

export const siteConfig = {
  /** Title-case shop board line (navbar/footer wordmark) */
  shopBoardName: "Sri Kumaran Silks",
  name: "SRI KUMARAN SILKS®",
  shortName: "Sri Kumaran Silks",
  tagline: "Sarees Wholesale & Retail Merchant",
  /** Town shown on shop board / navbar */
  location: "ELAMPILLAI",
  description: "Sarees wholesale & retail merchant — silk and cotton sarees",
  searchPlaceholder: "Search silk & cotton sarees, collections…",
  url: "https://sairaghavendratex.com",
  addressLines: ADDRESS_LINES,
  /** Single-line address for compact UI */
  address: ADDRESS_LINES.join(", "),
  phone: PHONE,
  /** `tel:` href (digits only, with country code) */
  phoneHref: PHONE_HREF,
  mobilePhone: MOBILE_PHONE,
  mobilePhoneHref: MOBILE_PHONE_HREF,
  /** Contact numbers from the business card */
  contacts: CONTACTS,
  email: EMAIL,
  gstin: GSTIN,
  currency: "INR",
  currencySymbol: "₹",
  /** Update with your real profile URLs */
  social: SOCIAL,
  /** Top offer ribbon — rotates on the storefront */
  announcements: [
    {
      text: "Premium silk & cotton sarees — wholesale & retail at SRI KUMARAN SILKS",
      href: "/shop",
      cta: "Shop now",
    },
    {
      text: "Visit us at Salem Main Road, Elampillai · Call for orders & enquiries",
      href: MOBILE_PHONE_HREF,
      cta: "Call us",
    },
    {
      text: "Explore Kanjivaram, wedding & festive collections",
      href: "/collections",
      cta: "View all",
    },
  ],
  mainNav: [
    {
      title: "Collections",
      href: "/collections",
      description: "Browse saree collections.",
      items: [],
    },
    {
      title: "Featured",
      href: "/featured",
      description: "Handpicked sarees.",
      items: [],
    },
    {
      title: "Orders",
      href: "/orders",
      description: "Your orders.",
      items: [],
    },
  ] satisfies NavItemWithOptionalChildren[],

  /** Storefront footer columns */
  footerNav: [
    {
      title: "Shop",
      items: [
        { title: "All sarees", href: "/shop", items: [] },
        { title: "Featured sarees", href: "/featured", items: [] },
        { title: "All categories", href: "/collections", items: [] },
        { title: "Wishlist", href: "/wish-list", items: [] },
        { title: "Cart", href: "/cart", items: [] },
      ],
    },
    {
      title: "Collections",
      items: [
        {
          title: "Kanjivaram Wedding",
          href: "/collections/kanjivaram-wedding-sarees",
          items: [],
        },
        {
          title: "Cotton Sarees",
          href: "/collections/cotton-sarees",
          items: [],
        },
        {
          title: "Soft Silk Sarees",
          href: "/collections/soft-silk-sarees",
          items: [],
        },
        {
          title: "Wedding Collections",
          href: "/collections/wedding-collections",
          items: [],
        },
        {
          title: "Traditional Silk",
          href: "/collections/traditional-silk-sarees",
          items: [],
        },
        { title: "View all categories", href: "/collections", items: [] },
      ],
    },
    {
      title: "Customer Service",
      items: [
        { title: "Shipping & Returns", href: "/shipping-returns", items: [] },
        { title: "Store Policy", href: "/store-policy", items: [] },
        { title: "Payment Methods", href: "/payment-methods", items: [] },
        { title: "FAQ", href: "/faq", items: [] },
        { title: "My orders", href: "/orders", items: [] },
      ],
    },
    {
      title: "About SRI KUMARAN SILKS",
      items: [
        { title: "Our Story", href: "/about", items: [] },
        { title: "Our Collections", href: "/collections", items: [] },
        { title: "Visit our store", href: "/contact#store", items: [] },
        { title: "Contact", href: "/contact", items: [] },
      ],
    },
  ] satisfies NavItemWithOptionalChildren[],
};

/** Brand name without ® — for page titles and metadata templates */
export const brandTitleName = siteConfig.name.replace("®", "").trim();
