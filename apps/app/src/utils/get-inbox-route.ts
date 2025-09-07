import type { Notification } from "@coordinize/database/db";

export const getInboxItemRoutePath = (
  item: Notification & { workspace: { slug: string } }
) => {
  const workspaceSlug = item.workspace.slug;
  return `/${workspaceSlug}/posts/${item.subjectId}`;
};
