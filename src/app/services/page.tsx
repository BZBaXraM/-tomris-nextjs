import {
  pageMetadata,
  renderStudioPage,
  type StudioPageProps,
} from "@/lib/pages";
export async function generateMetadata({ searchParams }: StudioPageProps) {
  return pageMetadata(2, searchParams);
}
export default async function Page({ searchParams }: StudioPageProps) {
  return renderStudioPage(2, searchParams);
}
