"use client";

import { AvatarUploadField } from "@coordinize/ui/components/avatar-upload";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import slugify from "@sindresorhus/slugify";
import { useEffect } from "react";

const formSchema = z.object({
  workspaceName: z
    .string()
    .min(3, "Workspace name must be at least 3 characters")
    .max(32, "Workspace name must be less than 32 characters"),
  workspaceSlug: z.string(),
  workspaceLogo: z.string(),
});

export function WorkspaceSetup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: "",
      workspaceSlug: "",
      workspaceLogo: "",
    },
  });

  const workspaceName = form.watch("workspaceName");

  useEffect(() => {
    const slug = slugify(workspaceName || "");
    form.setValue("workspaceSlug", slug);
  }, [workspaceName, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // setIsSubmitting(true);
      console.log("Form values:", values);

      // Here you would save the values to your Neon DB
      // Example:
      // await saveToDatabase(values);

      // Reset form state
      // setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // setIsSubmitting(false);
    }
  }

  const handleImageUpload = async (file: File) => {
    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", file);

    // Upload using the server action
    const url = "https://app.coordinize.tech";
    // Set the URL in the form state
    form.setValue("workspaceLogo", url);
    return url;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="workspaceLogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace logo</FormLabel>
              <FormControl>
                <AvatarUploadField
                  name="workspaceLogo"
                  onUpload={handleImageUpload}
                  size="sm"
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
        </Button>
      </form>
    </Form>
  );
}
