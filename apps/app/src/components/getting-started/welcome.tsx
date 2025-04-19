"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getCurrentUser } from "@/queries/cached-queries";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useUploadThing } from "@/utils/uploadthing";
import type { User } from "@coordinize/database/db";
import { Button } from "@coordinize/ui/button";
import AvatarUploader from "@coordinize/ui/components/avatar-uploader";
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
  profilePicFile: z
    .custom<File>((val) => val instanceof File || val === null)
    .optional(),
  preferredName: z.string().min(1, {
    message: "Preferred name is required",
  }),
});

interface WelcomeProps {
  nextStep: () => void;
}

export function Welcome({ nextStep }: WelcomeProps) {
  const [user, setUser] = useState<User | null>(null);

  const { setField } = useOnboardingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePic: "",
      preferredName: "",
      profilePicFile: undefined,
    },
  });

  const { startUpload } = useUploadThing("imageUploader");

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();

      setUser(userData);

      if (userData) {
        form.reset({
          profilePic: userData.image ?? "",
          preferredName: userData.name,
        });
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let profilePicUrl = values.profilePic;

      // If a file is uploaded, upload it and get the URL
      if (values.profilePicFile instanceof File) {
        const uploaded = await startUpload([values.profilePicFile]);
        profilePicUrl = (uploaded?.[0]?.ufsUrl || user?.image) ?? "";
      }

      setField("preferredName", values.preferredName);
      setField("profilePic", profilePicUrl);

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
          name="profilePic"
          render={() => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <AvatarUploader
                  onChange={(file) =>
                    form.setValue("profilePicFile", file || undefined)
                  }
                  previewUrl={form.getValues("profilePic")}
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
                <Input
                  {...field}
                  placeholder="Enter your name"
                  className={user && "bg-muted"}
                />
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
