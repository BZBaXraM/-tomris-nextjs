import type { Metadata } from "next";
import { content } from "@/data/translations";
import type { PageIndex } from "./locale";
import { getLocale, type SearchParams } from "./server-locale";
import { StudioShell } from "@/components/studio-shell";
import { HomeView } from "@/components/home-view";
import { PortfolioView } from "@/components/portfolio-view";
import { ServicesView } from "@/components/services-view";
import { ContactsView } from "@/components/contacts-view";
export type StudioPageProps = { searchParams: SearchParams };
export async function pageMetadata(
  page: PageIndex,
  params: SearchParams,
): Promise<Metadata> {
  const c = content[await getLocale(params)];
  return {
    title: `${page ? c.nav[page] + " — " : ""}${c.title}`,
    description:
      page === 1
        ? c.portfolioIntro
        : page === 2
          ? c.serviceIntro
          : page === 3
            ? c.contactIntro
            : c.intro,
  };
}
export async function renderStudioPage(page: PageIndex, params: SearchParams) {
  const locale = await getLocale(params);
  const View = [HomeView, PortfolioView, ServicesView, ContactsView][page];
  return (
    <StudioShell initialLocale={locale} page={page}>
      <View />
    </StudioShell>
  );
}
