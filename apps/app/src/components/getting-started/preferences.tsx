"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import TimezoneSelect from "@/components/ui/timezone-select";
import { useTRPC } from "@/trpc/client";
import { Button } from "@coordinize/ui/button";
import { toast } from "@coordinize/ui/components/sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@coordinize/ui/form";
import { Icons } from "@coordinize/ui/lib/icons";
import { Switch } from "@coordinize/ui/switch";

const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  timezone: z.string().min(1),
});

export function Preferences() {
  const trpc = useTRPC();
  const router = useRouter();

  const form = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const { mutate, isPending } = useMutation(
    trpc.onboarding.preferences.mutationOptions({
      onSuccess: ({ workspaceSlug }) => {
        toast.success("Welcome aboard!", {
          description: "Your workspace is all set up and ready to go.",
        });
        router.push(`/${workspaceSlug}`);
      },
      onSettled: () => {
        form.reset();
      },
    }),
  );

  const onSubmit = async (values: z.infer<typeof preferencesSchema>) => {
    mutate({
      ...values,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="emailNotifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Email Notifications</FormLabel>
              <FormControl>
                <Switch
                  id="emailNotifications"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pushNotifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Push Notifications</FormLabel>
              <FormControl>
                <Switch
                  id="pushNotifications"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <FormControl>
                <TimezoneSelect value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Icons.loader className="animate-spin" />
          ) : (
            "Get Started"
          )}
        </Button>
      </form>
    </Form>
  );
}
