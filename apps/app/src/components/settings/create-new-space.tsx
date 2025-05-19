"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SettingsCard } from "@/components/settings/settings-card";
import { useTRPC } from "@/trpc/client";
import { Button } from "@coordinize/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@coordinize/ui/components/form";
import { Input } from "@coordinize/ui/components/input";
import { toast } from "@coordinize/ui/components/sonner";
import { Textarea } from "@coordinize/ui/components/textarea";
import { Icons } from "@coordinize/ui/lib/icons";

const formSchema = z.object({
  spaceName: z.string().min(3, "Space name must be at least 3 characters."),
  spaceIdentifier: z
    .string()
    .min(3, "Space identifier must be at least 3 characters"),
  about: z.string(),
});

function generateIdentifier(name: string) {
  return name.toUpperCase().slice(0, 3);
}

export function CreateNewSpaceForm() {
  const trpc = useTRPC();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spaceName: "",
      spaceIdentifier: "",
      about: "",
    },
  });

  const spaceName = form.watch("spaceName");

  useEffect(() => {
    const generated = generateIdentifier(spaceName || "");
    form.setValue("spaceIdentifier", generated);
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
    }),
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      name: values.spaceName,
      identifier: values.spaceIdentifier,
      about: values.about,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* TODO: Space icon field */}
        <SettingsCard
          title="Space Name"
          description="Spaces are dedicated areas within a workspace where team members can collaborate and share posts."
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
        >
          <FormField
            control={form.control}
            name="spaceName"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    required
                    className="w-full shadow-none"
                    placeholder="e.g. Engineering"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <SettingsCard
          title="Identifier"
          description="Used to identify this space. (e.g. ENG)"
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
        >
          <FormField
            control={form.control}
            name="spaceIdentifier"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    required
                    className="w-full shadow-none"
                    placeholder="e.g. ENG"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <SettingsCard
          title="About"
          description="A brief description about this space and its purpose."
          className="flex-col items-start lg:flex-row lg:justify-between"
        >
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write something about..."
                    className="shadow-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <Button
          type="submit"
          className="ml-auto flex min-w-[120px] font-normal"
          size="sm"
          disabled={isPending}
        >
          {isPending ? (
            <Icons.loader className="mx-auto animate-spin" />
          ) : (
            <>Create space</>
          )}
        </Button>
      </form>
    </Form>
  );
}
