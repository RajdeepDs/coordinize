"use client";

import { updateUserNameAction } from "@/actions/update-user-name-action";
import type { User } from "@coordinize/database/db";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@coordinize/ui/components/form";
import { Input } from "@coordinize/ui/components/input";
import { toast } from "@coordinize/ui/components/sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

interface ProfileProps {
  user: User;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
});

export function PreferredNameForm({ user }: ProfileProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name ?? "",
    },
  });

  const { isDirty } = useFormState({ control: form.control });

  const { execute } = useAction(updateUserNameAction, {
    onError: ({ error }) => {
      toast.warning(error.serverError as string);
    },
    onSuccess: () => {
      toast.success("Profile updated.");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-fit bg-accent shadow-none"
                  onBlur={async () => {
                    if (isDirty) {
                      const isValid = await form.trigger("name");
                      if (isValid) {
                        form.handleSubmit(onSubmit)();
                      }
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
