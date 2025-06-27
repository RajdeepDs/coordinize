'use client';

import { authClient } from '@coordinize/auth/auth-client';
import { Button } from '@coordinize/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@coordinize/ui/components/form';
import { Input } from '@coordinize/ui/components/input';
import { toast } from '@coordinize/ui/components/sonner';
import { Icons } from '@coordinize/ui/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod/v4';
import { privateBetaSchema } from '@/lib/schemas';

export const PrivateBeta = () => {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof privateBetaSchema>>({
    resolver: zodResolver(privateBetaSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof privateBetaSchema>) {
    const { error } = await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setSubmitted(true);
        },
        onSuccess: () => {
          setSubmitted(false);
          redirect('/getting-started/welcome');
        },
        onError: () => {
          setSubmitted(false);
          form.reset();
        },
      }
    );

    if (error) {
      toast.error(error.message);
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={submitted} type="submit">
          {submitted ? (
            <Icons.loader className="size-4 animate-spin" />
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </Form>
  );
};
