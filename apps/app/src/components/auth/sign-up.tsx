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
import type { z } from 'zod/v4';
import { signUpSchema } from '@/lib/schemas';

export const SignUp = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const { error } = await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setSubmitted(true);
        },
        onSuccess: () => {
          setSubmitted(false);
          form.reset();
          redirect('/private-beta');
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
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" type="name" {...field} />
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
                  placeholder="Enter password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm your password"
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
            'Sign up'
          )}
        </Button>
      </form>
    </Form>
  );
};
