import { redirect } from "next/navigation";

export default async function CoursesPage({
  params,
}: {
  params: { cid: string };
}) {
  redirect(`/courses/${params.cid}/home`);
}
