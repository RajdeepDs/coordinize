'use client';

import AvatarUploader from '@coordinize/ui/components/avatar-uploader';
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
import { Icons } from '@coordinize/ui/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import slugify from '@sindresorhus/slugify';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { useTRPC } from '@/trpc/client';
import { useUploadThing } from '@/utils/uploadthing';

const workspaceSetupSchema = z.object({
  workspaceName: z
    .string()
    .min(3, 'Workspace name must be at least 3 characters')
    .max(32, 'Workspace name must be less than 32 characters'),
  workspaceSlug: z.string(),
  workspaceLogo: z.url().or(z.string().length(0)),
  workspaceLogoFile: z.any().optional(),
});

interface WorkspaceSetupProps {
  nextStep: () => void;
}

export function WorkspaceSetup({ nextStep }: WorkspaceSetupProps) {
  const trpc = useTRPC();
  const [isExecuting, setIsExecuting] = useState(false);

  const form = useForm<z.infer<typeof workspaceSetupSchema>>({
    resolver: zodResolver(workspaceSetupSchema),
    defaultValues: {
      workspaceName: '',
      workspaceSlug: '',
      workspaceLogo: '',
      workspaceLogoFile: null,
    },
  });

  const { startUpload } = useUploadThing('imageUploader');

  const workspaceName = form.watch('workspaceName');

  useEffect(() => {
    const slug = slugify(workspaceName || '');
    form.setValue('workspaceSlug', slug);
  }, [workspaceName, form]);

  const { mutate } = useMutation(
    trpc.onboarding.workspaceSetup.mutationOptions({
      onSettled: () => {
        nextStep();
      },
    })
  );

  async function onSubmit(values: z.infer<typeof workspaceSetupSchema>) {
    setIsExecuting(true);
    try {
      let workspaceLogoUrl = values.workspaceLogo;

      // If a file is uploaded, upload it and get the URL
      if (values.workspaceLogoFile instanceof File) {
        const uploaded = await startUpload([values.workspaceLogoFile]);
        workspaceLogoUrl = uploaded?.[0]?.ufsUrl || '';
      }

      mutate({
        workspaceName: values.workspaceName,
        workspaceSlug: values.workspaceSlug,
        workspaceLogoURL: workspaceLogoUrl,
      });
    } catch (error) {
      return error instanceof Error
        ? error.message
        : 'An unexpected error occurred while uploading your workspace logo.';
    }
    setIsExecuting(false);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="workspaceLogo"
          render={() => (
            <FormItem>
              <FormLabel>Workspace logo</FormLabel>
              <FormControl>
                <AvatarUploader
                  onChange={(file) => {
                    form.setValue('workspaceLogoFile', file || undefined);
                    if (!file) {
                      form.setValue('workspaceLogo', '');
                    }
                  }}
                  previewUrl={form.getValues('workspaceLogo') || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workspaceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter workspace name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workspaceSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter workspace slug" />
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
