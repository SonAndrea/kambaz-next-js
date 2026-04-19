import { redirect } from "next/navigation";

export default async function PazzaPage({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  redirect(`/courses/${cid}/pazza/q&a`);
}
