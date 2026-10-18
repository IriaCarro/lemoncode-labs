const showOffersValue = import.meta.env.VITE_SHOW_OFFERS;

if (showOffersValue !== "true" && showOffersValue !== "false") {
  throw new Error(
    `VITE_SHOW_OFFERS debe ser "true" o "false"; se recibió "${showOffersValue}"`,
  );
}

export const env = {
  shopName: import.meta.env.VITE_SHOP_NAME,
  apiBase: import.meta.env.VITE_API_BASE,
  showOffers: showOffersValue === "true",
} as const;