import { contactActionHref, whatsAppHrefFromPhone } from "@/lib/contact/links";

describe("contact links", () => {
  it("builds WhatsApp href from tel link", () => {
    expect(whatsAppHrefFromPhone("tel:+919442946229")).toBe(
      "https://wa.me/919442946229",
    );
  });

  it("returns call or WhatsApp href by mode", () => {
    const contact = {
      name: "Mobile",
      phone: "+91 94429 46229",
      phoneHref: "tel:+919442946229",
    };

    expect(contactActionHref(contact, "call")).toBe("tel:+919442946229");
    expect(contactActionHref(contact, "whatsapp")).toBe(
      "https://wa.me/919442946229",
    );
  });
});
