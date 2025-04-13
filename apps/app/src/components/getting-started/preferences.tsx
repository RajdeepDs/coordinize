"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { onboardingAction } from "@/actions/onboarding-action";
import TimezoneSelect from "@/components/ui/timezone-select";
import { useOnboardingStore } from "@/store/onboarding-store";
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
  const {
    reset: storeReset,
    setField,
    preferredName,
    profilePic,
    workspaceName,
    workspaceURL,
    workspaceLogo,
    emailNotifications,
    pushNotifications,
    timezone,
  } = useOnboardingStore();

  const form = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const { execute, isExecuting } = useAction(onboardingAction, {
    onError: ({ error }) => {
      toast.error(error.serverError as string);
    },
    onSuccess: () => {
      toast.success("Welcome aboard!", {
        description: "Your workspace is all set up and ready to go 🚀",
      });
    },
    onSettled: () => {
      form.reset();
      storeReset();
      redirect("/"); // TODO: Redirect to the workspace home page once it's created. - '/{workspaceId}/'
    },
  });

  const onSubmit = async (values: z.infer<typeof preferencesSchema>) => {
    setField("emailNotifications", values.emailNotifications);
    setField("pushNotifications", values.pushNotifications);
    setField("timezone", values.timezone);

    execute({
      preferredName,
      profilePicURL: profilePic,
      workspaceName,
      workspaceURL,
      workspaceLogoURL: workspaceLogo,
      emailNotifications,
      pushNotifications,
      timezone,
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

        <Button type="submit" className="w-full" disabled={isExecuting}>
          {isExecuting ? (
            <Icons.loader className="animate-spin" />
          ) : (
            "Get Started"
          )}
        </Button>
      </form>
    </Form>
  );
}
