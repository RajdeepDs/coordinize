import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../init";
import { createNewPost, createNewSpace } from "../mutations";

const WELCOME_SPACE = {
  name: "Getting Started",
  identifier: "GET",
  about:
    "Welcome to your first space! This is a good place to explore how Coordinize works, try posting, and get familiar with the async-first flow.",
  icon: "👋",
} as const;

const WELCOME_POST = {
  title: "Welcome to Coordinize",
  content: `<p>Welcome aboard!<br>You've just created your first workspace on <strong>Coordinize</strong> — the async-first communication platform designed for modern, distributed teams.</p><div data-type="horizontalRule"><hr></div><h2>🚀Here's what you can do next:</h2><ol><li><p><strong>Rename this space</strong></p><p>Use it to organize a project, team or topic.<br>Example: <code>Marketing</code>, <code>Product Updates</code>, or <code>Design Discussions</code>.</p></li><li><p><strong>Start a new post</strong></p><p>Posts are the heart of Coordinize. Use them to:</p><ul><li><p>Share ideas, updates or questions</p></li><li><p>Gather feedback from your team</p></li><li><p>Keep everyone in the loop asynchronously</p></li></ul></li><li><p><strong>Invite your teammates</strong><br>Collaboration works best when everyone's here. Invite a few people to get started!</p></li></ol><div data-type="horizontalRule"><hr></div><h2>💡Pro tips</h2><ul><li><p>Use <strong>Markdown</strong> to format your posts beautifully. </p></li><li><p>Posts are <strong>persistent</strong>, so conversations stay organized and searchable.</p></li><li><p>Mark posts as <strong>resolved</strong> once discussions are complete — great for tracking progress.</p></li></ul><blockquote><p><strong>Note:</strong> Features like @mentions, attachments, and polls are coming soon!</p></blockquote><div data-type="horizontalRule"><hr></div><p>Thanks again for trying Coordinize. We're building this for people like you — async-first, thoughtful, and focused.</p><p></p><p>Let's make communication calm again. ☁️</p>`,
} as const;

export const seedRouter = createTRPCRouter({
  seed: protectedProcedure.mutation(
    async ({
      ctx: {
        session: { user },
        workspaceId,
        db,
      },
    }) => {
      try {
        const result = await db.$transaction(async (tx) => {
          const existingSpaces = await tx.space.count({
            where: { workspaceId },
          });

          if (existingSpaces > 0) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Workspace has already been seeded",
            });
          }

          const workspace = await tx.workspace.findFirst({
            where: {
              id: workspaceId,
              WorkspaceMember: {
                some: {
                  userId: user.id,
                },
              },
            },
          });

          if (!workspace) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Workspace not found or access denied",
            });
          }

          const space = await createNewSpace(tx, {
            name: WELCOME_SPACE.name,
            identifier: WELCOME_SPACE.identifier,
            about: WELCOME_SPACE.about,
            icon: WELCOME_SPACE.icon,
            workspaceId,
            userId: user.id,
          });

          const post = await createNewPost(tx, {
            title: WELCOME_POST.title,
            description: WELCOME_POST.content,
            spaceId: space.id,
            userId: user.id,
            workspaceId,
          });

          await tx.favorite.create({
            data: {
              userId: user.id,
              spaceId: space.id,
            },
          });

          await tx.favorite.create({
            data: {
              userId: user.id,
              postId: post.id,
            },
          });

          return {
            space,
            post,
            success: true,
            message: "Workspace seeded successfully",
          };
        });

        return result;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to seed workspace. Please try again.",
          cause: error,
        });
      }
    }
  ),
});
