'use client';

import { Button } from '@coordinize/ui/components/button';
import { toast } from '@coordinize/ui/components/sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import slugify from '@sindresorhus/slugify';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion as m } from 'motion/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  type WorkspaceSetupSchema,
  workspaceSetupSchema,
} from '@/lib/schemas/setup';
import { useTRPC } from '@/trpc/client';
import { WorkspaceSetupForm } from './workspace-setup-form';

export function WorkspaceSetup() {
  const trpc = useTRPC();
  const form = useForm<WorkspaceSetupSchema>({
    resolver: zodResolver(workspaceSetupSchema),
    defaultValues: {
      workspaceName: '',
      workspaceURL: '',
    },
  });

  const workspaceName = form.watch('workspaceName');

  useEffect(() => {
    const slug = slugify(workspaceName || '');
    form.setValue('workspaceURL', slug);
  }, [workspaceName, form]);

  const { mutate: workspaceMutation } = useMutation(
    trpc.workspace.workspaceSetup.mutationOptions({
      onSuccess: () => {
        toast.success('Workspace created successfully!');
        // TODO: Redirect to the onboarding page.
      },
      onError: () => {
        toast.error('Error creating workspace.');
      },
    })
  );

  const onSubmit = (_data: WorkspaceSetupSchema) => {
    workspaceMutation({
      workspaceName: form.getValues('workspaceName'),
      workspaceURL: form.getValues('workspaceURL'),
    });
  };

  return (
    <m.div
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      className="w-full max-w-sm px-3 text-center sm:max-w-md"
      initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
      transition={{ duration: 0.3, ease: 'linear' }}
    >
      <div className="flex flex-col items-center space-y-9 text-center">
        <AnimatePresence mode="wait">
          <m.div
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className="w-full"
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="space-y-8">
              <div className="mx-auto max-w-sm space-y-6">
                <h1 className="font-medium text-lg">Create your workspace</h1>
                <p className="text-sm text-ui-gray-900">
                  Workspaces are shared environments where you can collaborate
                  with your team.
                </p>
              </div>
              <div className="w-full rounded-md bg-white px-5 py-6 shadow-xl ring-1 ring-ui-gray-400">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <WorkspaceSetupForm form={form} />
                </form>
              </div>
              <Button
                className="h-11 w-full sm:w-sm"
                onClick={form.handleSubmit(onSubmit)}
                size={'lg'}
              >
                Continue
              </Button>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </m.div>
  );
}
