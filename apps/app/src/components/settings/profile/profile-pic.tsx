'use client';

import type { User } from '@coordinize/database/db';
import AvatarUploader from '@coordinize/ui/components/avatar-uploader';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@coordinize/ui/components/form';
import { toast } from '@coordinize/ui/components/sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateProfileAction } from '@/actions/update-user-action';
import { useUploadThing } from '@/utils/uploadthing';

const formSchema = z.object({
  profilePic: z.string().url().or(z.string().length(0)),
  profilePicFile: z
    .custom<File>((val) => val instanceof File || val === null)
    .optional(),
});

export function ProfilePic({ user }: { user: User }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePic: '',
      profilePicFile: undefined,
    },
  });

  const { startUpload } = useUploadThing('imageUploader');
  const isSubmitting = useRef(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (user) {
      form.reset({
        profilePic: user.image ?? '',
        profilePicFile: undefined,
      });
    }
  }, [user, form]);

  const { execute } = useAction(updateProfileAction, {
    onError: ({ error }) => {
      toast.error('Something went wrong.');
      console.log({ error });
    },
    onSuccess: () => toast.success('Profile updated.'),
  });

  const hasSubmitted = useRef(false);

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      if (isSubmitting.current || hasSubmitted.current) return;

      isSubmitting.current = true;
      hasSubmitted.current = true;

      try {
        let profilePicUrl = values.profilePic;

        if (values.profilePicFile instanceof File) {
          const uploaded = await startUpload([values.profilePicFile]);
          profilePicUrl = (uploaded?.[0]?.ufsUrl || user?.image) ?? '';
        }

        execute({ image: profilePicUrl });
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        isSubmitting.current = false;

        // Reset guard after small delay to avoid repeated calls on rerenders
        setTimeout(() => {
          hasSubmitted.current = false;
        }, 1000);
      }
    },
    [execute, startUpload, user?.image]
  );

  const handleAvatarChange = useCallback(
    (file: File | null) => {
      form.setValue('profilePicFile', file || undefined);
      if (!file) {
        form.setValue('profilePic', '');
        form.handleSubmit(onSubmit)();
        return;
      }

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        form.handleSubmit(onSubmit)();
      }, 400);
    },
    [form, onSubmit]
  );

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="profilePic"
          render={() => (
            <FormItem>
              <FormControl>
                <AvatarUploader
                  onChange={handleAvatarChange}
                  previewUrl={form.getValues('profilePic') || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
