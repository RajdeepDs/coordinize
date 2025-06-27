'use client';

import { Button } from '@coordinize/ui/button';
import { toast } from '@coordinize/ui/components/sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@coordinize/ui/form';
import { Input } from '@coordinize/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod/v4';
import { joinWaitlistSchema } from '@/lib/schemas';
import { useTRPC } from '@/trpc/client';

export const JoinWaitlist = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof joinWaitlistSchema>>({
    resolver: zodResolver(joinWaitlistSchema),
    defaultValues: { name: '', email: '' },
  });

  const resetForm = () => {
    setTimeout(() => {
      form.reset();
      setSubmitted(false);
    }, 5000);
  };

  const trpc = useTRPC();

  const { mutate, status } = useMutation(
    trpc.auth.joinWaitlist.mutationOptions({
      onSuccess: () => {
        setSubmitted(true);
        toast.success("You're on the list.", {
          description: "We'll let you know when we're ready!",
        });
      },
      onError: () => {
        toast.error('Something went wrong.', {
          description: 'Please try again later.',
        });
      },
      onSettled: () => {
        resetForm();
      },
    })
  );

  function onSubmit(values: z.infer<typeof joinWaitlistSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col space-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={submitted} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  disabled={submitted}
                  placeholder="johndoe@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={status === 'pending' || submitted} type="submit">
          {(() => {
            if (status === 'pending') {
              return 'Joining...';
            }
            if (submitted) {
              return 'Joined 🎉';
            }
            return 'Join Waitlist';
          })()}
        </Button>
      </form>
    </Form>
  );
};
