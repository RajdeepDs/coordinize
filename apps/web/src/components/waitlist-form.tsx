'use client';

import { Button } from '@coordinize/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@coordinize/ui/components/form';
import { Input } from '@coordinize/ui/components/input';
import { Icons } from '@coordinize/ui/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod/v4';
import { useJoinWaitlist } from '@/hooks/use-waitlist';
import { useTRPC } from '@/trpc/client';

const waitlistFormSchema = z.object({
  email: z.email('Invalid email.'),
});

type waitlistForm = z.infer<typeof waitlistFormSchema>;

export function WaitlistForm() {
  const trpc = useTRPC();

  const { data: waitlistCount } = useSuspenseQuery(
    trpc.earlyAccess.getWaitlistCount.queryOptions()
  );

  const form = useForm<z.infer<typeof waitlistFormSchema>>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: { email: '' },
  });

  const joinWaitlistMutation = useJoinWaitlist();

  function joinWaitlist({ email }: waitlistForm) {
    joinWaitlistMutation.mutate({ email });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-lg flex-col items-center gap-3 sm:flex-row"
        onSubmit={form.handleSubmit(joinWaitlist)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  disabled={joinWaitlistMutation.isPending}
                  placeholder="johndoe@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={joinWaitlistMutation.isPending} size={'sm'}>
          {joinWaitlistMutation.isPending ? (
            <>
              <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Join waitlist <Icons.ChevronRight />
            </>
          )}
        </Button>
      </form>
      <div className="relative mx-auto flex w-fit flex-row items-center gap-2 sm:mx-0">
        <div className="size-2 rounded-full bg-ui-green-700" />
        <div className="absolute inset-x-0 size-2 rounded-full bg-green-600 blur-xs sm:left-0 dark:bg-green-400" />
        <span className="font-normal text-sm text-ui-green-900 sm:text-start">
          {waitlistCount} people already joined
        </span>
      </div>
    </Form>
  );
}
