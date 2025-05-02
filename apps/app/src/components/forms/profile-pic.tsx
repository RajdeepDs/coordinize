"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateProfileAction } from "@/actions/update-user-action";
import { useUploadThing } from "@/utils/uploadthing";
import type { User } from "@coordinize/database/db";
import AvatarUploader from "@coordinize/ui/components/avatar-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@coordinize/ui/components/form";
import { toast } from "@coordinize/ui/components/sonner";
import { useEffect } from "react";

const formSchema = z.object({
  profilePic: z.string().url().or(z.string().length(0)),
  profilePicFile: z
    .custom<File>((val) => val instanceof File || val === null)
    .optional(),
});
export function ProfilePic({ user }: { user: User }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profilePic: "",
      profilePicFile: undefined,
    },
  });
  const { startUpload } = useUploadThing("imageUploader");

  useEffect(() => {
    if (user) {
      form.reset({
        profilePic: user.image ?? "",
        profilePicFile: undefined,
      });
    }
  }, [user, form]);

  const { execute } = useAction(updateProfileAction, {
    onError: () => {
      toast.error("Something went wrong.");
    },
    onSuccess: () => {
      toast.success("Profile updated.");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let profilePicUrl = values.profilePic;

      // If a file is uploaded, upload it and get the URL
      if (values.profilePicFile instanceof File) {
        const uploaded = await startUpload([values.profilePicFile]);
        profilePicUrl = (uploaded?.[0]?.ufsUrl || user?.image) ?? "";
      }

      execute({ image: profilePicUrl });
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
              <FormControl>
                <AvatarUploader
                  onChange={(file) => {
                    form.setValue("profilePicFile", file || undefined);
                    if (!file) {
                      form.setValue("profilePic", "");
                    }
                  }}
                  previewUrl={form.getValues("profilePic") || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
