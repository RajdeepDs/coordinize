"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SettingsCard } from "@/components/settings/settings-card";
import { Button } from "@coordinize/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@coordinize/ui/components/form";
import { Input } from "@coordinize/ui/components/input";

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                    className="w-full shadow-none md:w-64"
                    placeholder="e.g. ENG"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <div className="w-full">
          <Button className="ml-auto flex font-normal" size={"sm"}>
            Create team
          </Button>
        </div>
      </form>
    </Form>
  );
}
