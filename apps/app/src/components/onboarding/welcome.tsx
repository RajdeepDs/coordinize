'use client';

import type { User } from '@coordinize/database/db';
import { Button } from '@coordinize/ui/button';
import AvatarUploader from '@coordinize/ui/components/avatar-uploader';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@coordinize/ui/components/form';
import { Input } from '@coordinize/ui/components/input';
import { Icons } from '@coordinize/ui/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTRPC } from '@/trpc/client';
import { useUploadThing } from '@/utils/uploadthing';

const formSchema = z.object({
  profilePic: z.string().url().or(z.string().length(0)),
  profilePicFile: z
    .custom<File>((val) => val instanceof File || val === null)
    .optional(),
  preferredName: z.string().min(1, {
    message: 'Preferred name is required',
  }),
});

interface WelcomeProps {
  nextStep: () => void;
}

export function Welcome({ nextStep }: WelcomeProps) {
  const trpc = useTRPC();
  const [user, setUser] = useState<User | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePic: '',
      preferredName: '',
      profilePicFile: undefined,
    },
  });

  const { startUpload } = useUploadThing('imageUploader');

  // Fetch user data using useQuery
  const { data: userData, isFetched } = useSuspenseQuery(
    trpc.user.me.queryOptions()
  );

  // Use useEffect to handle user data and form reset
  useEffect(() => {
    if (userData && isFetched) {
      setUser(userData);
      form.reset({
        profilePic: userData.image ?? '',
        profilePicFile: undefined,
        preferredName: userData.name,
      });
    }
  }, [userData, isFetched, form]);

  const { mutate } = useMutation(
    trpc.onboarding.welcome.mutationOptions({
      onSettled: () => {
        nextStep();
      },
    })
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsExecuting(true);
    try {
      let profilePicUrl = values.profilePic;

      // If a file is uploaded, upload it and get the URL
      if (values.profilePicFile instanceof File) {
        const uploaded = await startUpload([values.profilePicFile]);
        profilePicUrl = (uploaded?.[0]?.ufsUrl || user?.image) ?? '';
      }

      mutate({
        preferredName: values.preferredName,
        profilePicURL: profilePicUrl,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setIsExecuting(false);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="profilePic"
          render={() => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <AvatarUploader
                  onChange={(file) => {
                    form.setValue('profilePicFile', file || undefined);
                    if (!file) {
                      form.setValue('profilePic', '');
                    }
                  }}
                  previewUrl={form.getValues('profilePic') || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={user ? 'bg-muted' : ''}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isExecuting} type="submit">
          {isExecuting ? (
            <Icons.loader className="animate-spin" />
          ) : (
            <>
              Next
              <Icons.arrowRight />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
