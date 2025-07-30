'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@coordinize/ui/components/form';
import { Input } from '@coordinize/ui/components/input';
import type { UseFormReturn } from 'react-hook-form';
import type { WorkspaceSetupSchema } from '@/lib/schemas/setup';

interface WorkspaceSetupFormProps {
  form: UseFormReturn<WorkspaceSetupSchema>;
}

export function WorkspaceSetupForm({ form }: WorkspaceSetupFormProps) {
  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="workspaceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Workspace Name</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  {...field}
                  className="h-11 bg-transparent"
                />
              </FormControl>
              <FormMessage className="text-start text-ui-red-800 text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workspaceURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal">Workspace URL</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    autoComplete="off"
                    className="peer h-11 bg-transparent ps-36"
                    type="text"
                    {...field}
                  />
                  <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50">
                    app.coordinize.tech/
                  </span>
                </div>
              </FormControl>
              <FormMessage className="text-start text-ui-red-800 text-xs" />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
