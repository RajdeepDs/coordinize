'use client';

import type { Workspace } from '@coordinize/database/db';
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
import { updateWorkspaceAction } from '@/actions/update-workspace-action';
import { useUploadThing } from '@/utils/uploadthing';

const formSchema = z.object({
  workspaceLogo: z.string().url().or(z.string().length(0)),
  workspaceLogoFile: z
    .custom<File>((val) => val instanceof File || val === null)
    .optional(),
});

export function WorkspaceLogo({ workspace }: { workspace: Workspace }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceLogo: '',
      workspaceLogoFile: undefined,
    },
  });

  const { startUpload } = useUploadThing('imageUploader');
  const isSubmitting = useRef(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (workspace) {
      form.reset({
        workspaceLogo: workspace.logo ?? '',
        workspaceLogoFile: undefined,
      });
    }
  }, [workspace, form]);

  const { execute } = useAction(updateWorkspaceAction, {
    onError: ({ error }) => {
      toast.error('Something went wrong.');
      console.log({ error });
    },
    onSuccess: () => toast.success('Workspace updated.'),
  });

  const hasSubmitted = useRef(false);

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      if (isSubmitting.current || hasSubmitted.current) {
        return;
      }

      isSubmitting.current = true;
      hasSubmitted.current = true;

      try {
        let workspaceLogoUrl = values.workspaceLogo;

        if (values.workspaceLogoFile instanceof File) {
          const uploaded = await startUpload([values.workspaceLogoFile]);
          workspaceLogoUrl = (uploaded?.[0]?.ufsUrl || workspace?.logo) ?? '';
        }

        execute({ workspaceLogoURL: workspaceLogoUrl });
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
    [execute, startUpload, workspace?.logo]
  );

  const handleAvatarChange = useCallback(
    (file: File | null) => {
      form.setValue('workspaceLogoFile', file || undefined);
      if (!file) {
        form.setValue('workspaceLogo', '');
        form.handleSubmit(onSubmit)();
        return;
      }

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
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
          name="workspaceLogo"
          render={() => (
            <FormItem>
              <FormControl>
                <AvatarUploader
                  onChange={handleAvatarChange}
                  previewUrl={form.getValues('workspaceLogo') || ''}
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
