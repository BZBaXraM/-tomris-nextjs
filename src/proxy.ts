import { NextResponse, type NextRequest } from "next/server";
import { isLocale, normalizeLocale } from "@/lib/locale";
export function proxy(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("lang");
  const locale = isLocale(query)
    ? query
    : normalizeLocale(request.cookies.get("tmr-language")?.value);
  const headers = new Headers(request.headers);
  headers.set("x-tomris-language", locale);
  return NextResponse.next({ request: { headers } });
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|assets/|favicon.svg).*)"],
};
