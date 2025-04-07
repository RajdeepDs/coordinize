"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import TimezoneSelect from "@/components/ui/timezone-select";
import { Button } from "@coordinize/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@coordinize/ui/form";
import { Switch } from "@coordinize/ui/switch";

type PreferencesProps = {
  nextStep: () => void;
};

const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  timezone: z.string().min(1),
});

type PreferencesValues = z.infer<typeof preferencesSchema>;

export function Preferences() {
  const form = useForm<PreferencesValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const onSubmit = async (value: PreferencesValues) => {
    console.log(value);
  };

  return (
    <div className="max-w-md space-y-6">
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
                  <TimezoneSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-2 pt-4">
            <Button type="button" variant="ghost" className="flex-1">
              Skip for now
            </Button>
            <Button type="submit" className="flex-1">
              Finish Setup
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
