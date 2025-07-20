import { TRPCError } from '@trpc/server';
import { z } from 'zod/v4';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../init';

export const inviteRouter = createTRPCRouter({
  getCurrentToken: protectedProcedure.query(
    async ({ ctx: { db, session, workspaceId } }) => {
      const existingToken = await db.inviteToken.findFirst({
        where: {
          workspaceId,
          createdBy: session.user.id,
          expiresAt: { gt: new Date() }, // Not expired
          usesLeft: { gt: 0 }, // Has uses remaining
        },
        orderBy: { createdAt: 'desc' }, // Get the latest token
      });

      return existingToken
        ? { token: existingToken.token, usesLeft: existingToken.usesLeft }
        : null;
    }
  ),

  generateToken: protectedProcedure.mutation(
    async ({ ctx: { db, session, workspaceId } }) => {
      // Check if user already has a valid token
      const existingToken = await db.inviteToken.findFirst({
        where: {
          workspaceId,
          createdBy: session.user.id,
          expiresAt: { gt: new Date() },
          usesLeft: { gt: 0 },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (existingToken) {
        return { token: existingToken.token, usesLeft: existingToken.usesLeft };
      }

      const workspace = await db.workspace.findUnique({
        where: { id: workspaceId },
        include: { WorkspaceMember: true },
      });

      if (!workspace) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Workspace not found.',
        });
      }

      const token = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const inviteToken = await db.inviteToken.create({
        data: {
          token,
          workspaceId,
          createdBy: session.user.id,
          expiresAt,
          usesLeft: 2,
          maxUses: 2,
        },
      });

      return { token: inviteToken.token, usesLeft: inviteToken.usesLeft };
    }
  ),

  getTokenInfo: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input, ctx: { db } }) => {
      const inviteToken = await db.inviteToken.findUnique({
        where: { token: input.token },
        include: {
          workspace: { select: { name: true, slug: true } },
          creator: { select: { name: true } },
        },
      });

      if (
        !inviteToken ||
        inviteToken.expiresAt < new Date() ||
        inviteToken.usesLeft <= 0
      ) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invalid or expired invite link.',
        });
      }

      return {
        workspace: inviteToken.workspace,
        creator: inviteToken.creator,
        usesLeft: inviteToken.usesLeft,
      };
    }),

  acceptInvite: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input, ctx: { db, session } }) => {
      const inviteToken = await db.inviteToken.findUnique({
        where: { token: input.token },
        include: { workspace: true },
      });

      if (
        !inviteToken ||
        inviteToken.expiresAt < new Date() ||
        inviteToken.usesLeft <= 0
      ) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invalid or expired invite link.',
        });
      }

      // Check if user is already a member of the workspace
      const existingMember = await db.workspaceMember.findFirst({
        where: {
          AND: [
            { userId: session.user.id },
            { workspaceId: inviteToken.workspaceId },
          ],
        },
      });

      if (existingMember) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You are already a member of this workspace.',
        });
      }

      // Add user to workspace and decrement uses
      await db.$transaction([
        db.workspaceMember.create({
          data: {
            userId: session.user.id,
            workspaceId: inviteToken.workspaceId,
            role: 'MEMBER',
          },
        }),
        db.inviteToken.update({
          where: { id: inviteToken.id },
          data: { usesLeft: { decrement: 1 } },
        }),
      ]);

      return { workspaceSlug: inviteToken.workspace.slug };
    }),

  resetToken: protectedProcedure.mutation(
    async ({ ctx: { db, session, workspaceId } }) => {
      // Invalidate old token and create new one
      await db.inviteToken.deleteMany({
        where: {
          workspaceId,
          createdBy: session.user.id,
        },
      });

      const newToken = await db.inviteToken.create({
        data: {
          token: crypto.randomUUID(),
          workspaceId,
          createdBy: session.user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          usesLeft: 2,
          maxUses: 2,
        },
      });

      return { token: newToken.token };
    }
  ),
});
