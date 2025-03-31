"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { joinWaitlistAction } from "@/actions/join-waitlist-action";
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
import { Input } from "@coordinize/ui/input";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
});

export const JoinWaitlist = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  });

  const { execute, status } = useAction(joinWaitlistAction, {
    onError: ({ error }) => {
      toast.warning(error.serverError as string);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success("You're on the list.", {
        description: "We'll let you know when we're ready!",
      });
    },
    onSettled: () => {
      form.reset();
      setSubmitted(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={submitted} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} disabled={submitted} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={status === "executing" || submitted}>
          {status === "executing"
            ? "Joining..."
            : submitted
              ? "Joined 🎉"
              : "Join Waitlist!"}
        </Button>
      </form>
    </Form>
  );
};
