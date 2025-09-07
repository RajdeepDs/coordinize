"use client";

import { createSpaceSchema } from "@coordinize/api/schemas";
import { Button } from "@coordinize/ui/components/button";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from "@coordinize/ui/components/emoji-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@coordinize/ui/components/form";
import { Input } from "@coordinize/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@coordinize/ui/components/popover";
import { toast } from "@coordinize/ui/components/sonner";
import { Textarea } from "@coordinize/ui/components/textarea";
import { Icons } from "@coordinize/ui/lib/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod/v4";
import { SettingsCard } from "@/components/settings/settings-card";
import { useTRPC } from "@/trpc/client";

function generateIdentifier(name: string) {
  return name.toUpperCase().slice(0, 3);
}

export function CreateNewSpaceForm() {
  const trpc = useTRPC();
  const router = useRouter();

  const form = useForm<z.infer<typeof createSpaceSchema>>({
    resolver: zodResolver(createSpaceSchema),
    defaultValues: {
      name: "",
      identifier: "",
      about: "",
      icon: "",
    },
  });

  const spaceName = form.watch("name");

  useEffect(() => {
    const generated = generateIdentifier(spaceName || "");
    form.setValue("identifier", generated);
  }, [spaceName, form]);

  const { mutate, isPending } = useMutation(
    trpc.space.create.mutationOptions({
      onSuccess: ({ workspaceSlug }) => {
        toast.success("Space created successfully.");
        const spacesSettingsPath = `/${workspaceSlug}/settings/spaces`;

        router.push(`${spacesSettingsPath}`);
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
      onSettled: () => {
        form.reset();
      },
    })
  );

  function onSubmit(values: z.infer<typeof createSpaceSchema>) {
    mutate({
      name: values.name,
      identifier: values.identifier,
      about: values.about,
      icon: values.icon,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <SettingsCard
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
          description="Choose an emoji to represent your space."
          title="Space Icon"
        >
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="shadow-none"
                        size={"icon"}
                        type="button"
                        variant="outline"
                      >
                        {field.value || <Icons.emojiPlus className="h-5 w-5" />}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-fit p-0">
                      <EmojiPicker
                        className="h-[342px]"
                        onEmojiSelect={({ emoji }) => {
                          field.onChange(emoji);
                        }}
                      >
                        <EmojiPickerSearch />
                        <EmojiPickerContent />
                      </EmojiPicker>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <SettingsCard
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
          description="Spaces are dedicated areas within a workspace where team members can collaborate and share posts."
          title="Space Name"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Input
                    {...field}
                    className="w-full shadow-none"
                    placeholder="e.g. Engineering"
                    required
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <SettingsCard
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
          description="Used to identify this space. (e.g. ENG)"
          title="Identifier"
        >
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Input
                    {...field}
                    className="w-full shadow-none"
                    placeholder="e.g. ENG"
                    required
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <SettingsCard
          className="flex-col items-start lg:flex-row lg:justify-between"
          description="A brief description about this space and its purpose."
          title="About"
        >
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Textarea
                    {...field}
                    className="shadow-none"
                    placeholder="Write something about..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <Button
          className="ml-auto flex min-w-[120px] font-normal"
          disabled={isPending}
          size="sm"
          type="submit"
        >
          {isPending ? (
            <Icons.loader className="mx-auto animate-spin" />
          ) : (
            "Create space"
          )}
        </Button>
      </form>
    </Form>
  );
}
