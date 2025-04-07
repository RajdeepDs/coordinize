"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { AvatarUploadField } from "@coordinize/ui/avatar-upload";
import { Button } from "@coordinize/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@coordinize/ui/components/form";
import { Input } from "@coordinize/ui/components/input";

const formSchema = z.object({
  profilePic: z.string().url().or(z.string().length(0)),
  preferredName: z.string().min(1, {
    message: "Preferred name is required",
  }),
});

export function PreferredName() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePic: "",
      preferredName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      console.log("Form values:", values);

      // Here you would save the values to your Neon DB
      // Example:
      // await saveToDatabase(values);

      // Reset form state
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  }

  const handleImageUpload = async (file: File) => {
    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", file);

    // Upload using the server action
    const url = "https://www.coordinize.app";
    // Set the URL in the form state
    form.setValue("profilePic", url);
    return url;
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="profilePic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <AvatarUploadField
                    name="profilePic"
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
            name="preferredName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter you name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
