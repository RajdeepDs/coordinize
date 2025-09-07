import { redirect } from "next/navigation";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ slug: string; identifier: string }>;
}) {
  const { slug, identifier } = await params;

  redirect(`/${slug}/settings/spaces/${identifier}/general`);
}
