"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useOnboardingStore } from "@/store/onboarding-store";
import { useUploadThing } from "@/utils/lib";
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
  profilePicFile: z.any().optional(),
  preferredName: z.string().min(1, {
    message: "Preferred name is required",
  }),
});

export function Welcome() {
  const { setField } = useOnboardingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePic: "",
      preferredName: "",
      profilePicFile: null,
    },
  });

  const { startUpload } = useUploadThing("profilePicUploader");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let profilePicUrl = values.profilePic;

      // If a new image was selected, upload it
      if (values.profilePicFile instanceof File) {
        const uploaded = await startUpload([values.profilePicFile]);
        profilePicUrl = uploaded?.[0]?.ufsUrl || "";
      }

      setField("preferredName", values.preferredName);
      setField("profilePic", profilePicUrl);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="profilePic"
          render={() => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <AvatarUploadField name="profilePic" size="sm" />
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
                <Input {...field} placeholder="Enter your name" />
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
