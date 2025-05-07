"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createNewTeamAction } from "@/actions/create-new-team-action";
import { SettingsCard } from "@/components/settings/settings-card";
import { Button } from "@coordinize/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@coordinize/ui/components/form";
import { Input } from "@coordinize/ui/components/input";
import { toast } from "@coordinize/ui/components/sonner";
import { Icons } from "@coordinize/ui/lib/icons";

const formSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  teamIdentifier: z
    .string()
    .min(3, "Team identifier must be at least 3 characters"),
});

function generateIdentifier(name: string) {
  return name.toUpperCase().slice(0, 3);
}

export function CreateNewTeamForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      teamIdentifier: "",
    },
  });

  const teamName = form.watch("teamName");

  useEffect(() => {
    const generated = generateIdentifier(teamName || "");
    form.setValue("teamIdentifier", generated);
  }, [teamName, form]);

  const { execute, isExecuting } = useAction(createNewTeamAction, {
    onSuccess: () => {
      toast.success("Team created successfully.");
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
    onSettled: () => {
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute({
      teamName: values.teamName,
      teamIdentifier: values.teamIdentifier,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <SettingsCard
          title="Team Name"
          description="Teams are dedicated spaces within a workspace where members collaborate through posts."
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
        >
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem className="w-full lg:w-auto">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    required
                    className="w-full shadow-none md:w-64"
                    placeholder="e.g. Engineering"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <SettingsCard
          title="Identifier"
          description="Used to identify this team. (e.g. ENG)"
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
        >
          <FormField
            control={form.control}
            name="teamIdentifier"
            render={({ field }) => (
              <FormItem className="w-full lg:w-auto">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    required
                    className="w-full shadow-none md:w-64"
                    placeholder="e.g. ENG"
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
          disabled={isExecuting}
        >
          {isExecuting ? (
            <Icons.loader className="mx-auto animate-spin" />
          ) : (
            <>Create team</>
          )}
        </Button>
      </form>
    </Form>
  );
}
