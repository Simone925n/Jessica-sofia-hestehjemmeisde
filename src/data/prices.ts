// Kun eksempler, ingen af priserne er offentliggjorte tilbud.
export const prices: Record<string, number> = {
  intro: 350,
  nature: 550,
  extended: 750,
};
export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  }).format(amount);
