import { OnboardingStep } from '@coordinize/database/db';
import { z } from 'zod';
import type { OnboardingStepId } from '@/config/onboarding-steps';
import { getUserQuery } from '@/lib/queries';
import {
  authenticatedProcedure,
  createTRPCRouter,
  protectedProcedure,
} from '../init';

// Map frontend step IDs to database enum values
const stepIdToEnum = (stepId: OnboardingStepId): OnboardingStep => {
  const mapping: Record<OnboardingStepId, OnboardingStep> = {
    welcome: OnboardingStep.WELCOME,
    'choose-style': OnboardingStep.CHOOSE_STYLE,
    invite: OnboardingStep.INVITE,
    ready: OnboardingStep.READY,
  };
  return mapping[stepId];
};

export const userRouter = createTRPCRouter({
  me: authenticatedProcedure.query(async ({ ctx: { session } }) => {
    return await getUserQuery(session.user.id);
  }),
  updateStatusEmoji: protectedProcedure
    .input(
      z.object({
        statusEmoji: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { statusEmoji } = input;

      const user = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          statusEmoji,
        },
      });

      return user;
    }),

  updateOnboardingStep: protectedProcedure
    .input(
      z.object({
        step: z
          .string()
          .refine((val): val is OnboardingStepId =>
            ['welcome', 'choose-style', 'invite', 'ready'].includes(val)
          ),
        markAsOnboarded: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx: { db, session } }) => {
      const { step, markAsOnboarded } = input;
      const dbStep = stepIdToEnum(step);

      const updateData: {
        onboardingStep: OnboardingStep;
        onboarded?: boolean;
      } = {
        onboardingStep: dbStep,
      };

      if (markAsOnboarded) {
        updateData.onboarded = true;
      }

      const user = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: updateData,
      });

      return user;
    }),
});
