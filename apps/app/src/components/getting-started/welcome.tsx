"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Icons } from "@coordinize/ui/lib/icons";

const formSchema = z.object({
  profilePic: z.string().url().or(z.string().length(0)),
  preferredName: z.string().min(1, {
    message: "Preferred name is required",
  }),
});

export function Welcome() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePic: "",
      preferredName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Form values:", values);

      // Here you would save the values to your Neon DB
      // Example:
      // await saveToDatabase(values);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const handleImageUpload = async (file: File) => {
    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", file);

    // Upload using the server action
    const url = "https://app.coordinize.tech";
    // Set the URL in the form state
    form.setValue("profilePic", url);
    return url;
  };

  return (
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

        <Button type="submit" className="w-full">
          Next
          <Icons.arrowRight />
        </Button>
      </form>
    </Form>
  );
}
