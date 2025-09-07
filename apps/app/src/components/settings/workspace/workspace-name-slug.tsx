"use client";

import { toast } from "@coordinize/ui/components/sonner";
import { Form, FormControl, FormField, FormItem } from "@coordinize/ui/form";
import { Input } from "@coordinize/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@sindresorhus/slugify";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAutoSaveForm } from "@/components/forms/auto-save-form";
import { SettingsCard } from "@/components/settings/settings-card";
import { useTRPC } from "@/trpc/client";

const formSchema = z.object({
  workspaceName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters." }),
  workspaceSlug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters." }),
});

type WorkspaceNameSlugProps = {
  workspace: {
    name: string;
    slug: string;
  };
};

export function WorkspaceNameSlug({ workspace }: WorkspaceNameSlugProps) {
  const trpc = useTRPC();

  const initialValues = useMemo(
    () => ({
      workspaceName: workspace.name || "",
      workspaceSlug: slugify(workspace.name || ""),
    }),
    [workspace.name]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const workspaceName = form.watch("workspaceName");

  useEffect(() => {
    const newSlug = slugify(workspaceName || "");
    form.setValue("workspaceSlug", newSlug);
  }, [workspaceName, form]);

  const { mutate: updateWorkspace } = useMutation(
    trpc.workspace.update.mutationOptions({
      onError: () => {
        toast.error("Something went wrong!");
      },
      onSuccess: () => {
        toast.success("Workspace updated.");
      },
    })
  );

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      updateWorkspace({
        workspaceName: values.workspaceName,
        workspaceURL: values.workspaceSlug,
      });
    },
    [updateWorkspace]
  );

  const { handleFieldBlur } = useAutoSaveForm({
    form,
    initialValues,
    onSubmit,
  });

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
                        form.getValues("workspaceName") ? "bg-input" : ""
                      }`}
                      onBlur={() => handleFieldBlur("workspaceName")}
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
                        form.getValues("workspaceSlug") ? "bg-input" : ""
                      }`}
                      onBlur={() => handleFieldBlur("workspaceSlug")}
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
