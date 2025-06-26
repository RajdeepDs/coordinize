'use client';

import { toast } from '@coordinize/ui/components/sonner';
import { Form, FormControl, FormField, FormItem } from '@coordinize/ui/form';
import { Input } from '@coordinize/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import slugify from '@sindresorhus/slugify';
import { useAction } from 'next-safe-action/hooks';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateWorkspaceAction } from '@/actions/update-workspace-action';
import { SettingsCard } from '@/components/settings/settings-card';

const formSchema = z.object({
  workspaceName: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' }),
  workspaceSlug: z
    .string()
    .min(3, { message: 'Slug must be at least 3 characters.' }),
});

interface WorkspaceNameSlugProps {
  workspace: {
    name: string;
    slug: string;
  };
}

export function WorkspaceNameSlug({ workspace }: WorkspaceNameSlugProps) {
  const initialValues = useMemo(
    () => ({
      workspaceName: workspace.name || '',
      workspaceSlug: slugify(workspace.name || ''),
    }),
    [workspace.name]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const workspaceName = form.watch('workspaceName');

  useEffect(() => {
    const newSlug = slugify(workspaceName || '');
    form.setValue('workspaceSlug', newSlug);
  }, [workspaceName, form]);

  const { execute } = useAction(updateWorkspaceAction, {
    onError: () => {
      toast.error('Something went wrong!');
    },
    onSuccess: () => {
      toast.success('Workspace updated.');
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    execute({
      workspaceName: values.workspaceName,
      workspaceURL: values.workspaceSlug,
    });
  }, []);

  const handleFieldBlur = useCallback(
    async (fieldName: keyof z.infer<typeof formSchema>) => {
      const isValid = await form.trigger(fieldName);
      if (!isValid) {
        const error = form.getFieldState(fieldName).error;
        if (error?.message) {
          toast.error(error.message);
        }
        return;
      }

      const currentValue = form.getValues(fieldName);
      const initialValue = initialValues[fieldName];

      if (currentValue !== initialValue) {
        form.handleSubmit(onSubmit)();
      }
    },
    [form, initialValues, onSubmit]
  );

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <SettingsCard
          className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
          description="You can use your organization or company name here. Keep it simple."
          title="Name"
        >
          <FormField
            control={form.control}
            name="workspaceName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className={`peer min-w-87.5 ${
                        form.getValues('workspaceName') ? 'bg-muted' : ''
                      }`}
                      onBlur={() => handleFieldBlur('workspaceName')}
                      placeholder="Enter your workspace name"
                      type="text"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>

        <SettingsCard
          className="flex-col items-start sm:flex-row sm:items-center sm:justify-between"
          description="This is your workspace's unique URL that members will use to access it."
          title="URL"
        >
          <FormField
            control={form.control}
            name="workspaceSlug"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className={`peer min-w-87.5 ps-36 ${
                        form.getValues('workspaceSlug') ? 'bg-muted' : ''
                      }`}
                      onBlur={() => handleFieldBlur('workspaceSlug')}
                      type="text"
                    />
                    <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                      app.coordinize.com/
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
      </form>
    </Form>
  );
}
