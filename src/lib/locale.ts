export const locales = ["az", "ru", "en"] as const;
export type Locale = (typeof locales)[number];
export type PageIndex = 0 | 1 | 2 | 3;
export const paths = ["/", "/portfolio", "/services", "/contacts"] as const;
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}
export function normalizeLocale(value: unknown): Locale {
  return isLocale(value) ? value : "az";
}
