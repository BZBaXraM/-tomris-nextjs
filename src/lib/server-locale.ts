import { cookies } from "next/headers";
import { isLocale, normalizeLocale } from "./locale";
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;
export async function getLocale(params: SearchParams) {
  const value = (await params).lang;
  if (isLocale(value)) return value;
  return normalizeLocale((await cookies()).get("tmr-language")?.value);
}
