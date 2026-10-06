import {
  pageMetadata,
  renderStudioPage,
  type StudioPageProps,
} from "@/lib/pages";
export async function generateMetadata({ searchParams }: StudioPageProps) {
  return pageMetadata(3, searchParams);
}
export default async function Page({ searchParams }: StudioPageProps) {
  return renderStudioPage(3, searchParams);
}
