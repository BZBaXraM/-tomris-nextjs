import {
  pageMetadata,
  renderStudioPage,
  type StudioPageProps,
} from "@/lib/pages";
export async function generateMetadata({ searchParams }: StudioPageProps) {
  return pageMetadata(0, searchParams);
}
export default async function Page({ searchParams }: StudioPageProps) {
  return renderStudioPage(0, searchParams);
}
