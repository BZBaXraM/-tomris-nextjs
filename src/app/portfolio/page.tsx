import {
  pageMetadata,
  renderStudioPage,
  type StudioPageProps,
} from "@/lib/pages";
export async function generateMetadata({ searchParams }: StudioPageProps) {
  return pageMetadata(1, searchParams);
}
export default async function Page({ searchParams }: StudioPageProps) {
  return renderStudioPage(1, searchParams);
}
