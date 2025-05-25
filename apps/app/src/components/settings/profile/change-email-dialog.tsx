"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@coordinize/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@coordinize/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@coordinize/ui/components/form";
import { Input } from "@coordinize/ui/components/input";
import { Icons } from "@coordinize/ui/lib/icons";

const formSchema = (currentEmail: string) =>
  z.object({
    email: z
      .string()
      .email()
      .refine((val) => val !== currentEmail, {
        message: "Please enter a different email address.",
      }),
  });

export function ChangeEmailDialog({ currentEmail }: { currentEmail: string }) {
  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(currentEmail)),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="font-normal">
          Change email
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <div className="mb-2 flex flex-col items-center gap-2">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <Icons.mail
              size={20}
              aria-hidden="true"
              className="text-muted-foreground"
            />
          </div>
          <DialogHeader>
            <DialogTitle className="font-medium sm:text-center">
              Update Your Email Address
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              We'll email you a link to confirm the new address.
            </DialogDescription>
          </DialogHeader>
        </div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="*:not-first:mt-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          id="dialog-subscribe"
                          className="peer ps-9"
                          placeholder="email@example.com"
                          type="email"
                          aria-label="Email"
                          {...field}
                        />
                      </FormControl>
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <Icons.mail size={16} aria-hidden="true" />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Update email
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
