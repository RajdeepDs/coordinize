"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "@sindresorhus/slugify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useOnboardingStore } from "@/store/onboarding-store";
import { useUploadThing } from "@/utils/uploadthing";
import AvatarUploader from "@coordinize/ui/components/avatar-uploader";
import { Button } from "@coordinize/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@coordinize/ui/components/form";
import { Input } from "@coordinize/ui/components/input";
import { Icons } from "@coordinize/ui/lib/icons";

const formSchema = z.object({
  workspaceName: z
    .string()
    .min(3, "Workspace name must be at least 3 characters")
    .max(32, "Workspace name must be less than 32 characters"),
  workspaceSlug: z.string(),
  workspaceLogo: z.string().url().or(z.string().length(0)),
  workspaceLogoFile: z.any().optional(),
});

interface WorkspaceSetupProps {
  nextStep: () => void;
}

export function WorkspaceSetup({ nextStep }: WorkspaceSetupProps) {
  const { setField } = useOnboardingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: "",
      workspaceSlug: "",
      workspaceLogo: "",
      workspaceLogoFile: null,
    },
  });

  const { startUpload } = useUploadThing("imageUploader");

  const workspaceName = form.watch("workspaceName");

  useEffect(() => {
    const slug = slugify(workspaceName || "");
    form.setValue("workspaceSlug", slug);
  }, [workspaceName, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let workspaceLogoUrl = values.workspaceLogo;

      // If a file is uploaded, upload it and get the URL
      if (values.workspaceLogoFile instanceof File) {
        const uploaded = await startUpload([values.workspaceLogoFile]);
        workspaceLogoUrl = uploaded?.[0]?.ufsUrl || "";
      }

      setField("workspaceName", values.workspaceName);
      setField("workspaceURL", values.workspaceSlug);
      setField("workspaceLogo", workspaceLogoUrl);

      nextStep();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="workspaceLogo"
          render={() => (
            <FormItem>
              <FormLabel>Workspace logo</FormLabel>
              <FormControl>
                <AvatarUploader
                  onChange={(file) =>
                    form.setValue("workspaceLogoFile", file || undefined)
                  }
                  previewUrl={form.getValues("workspaceLogo")}
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

        <Button type="submit" className="w-full">
          Next
          <Icons.arrowRight />
        </Button>
      </form>
    </Form>
  );
}
