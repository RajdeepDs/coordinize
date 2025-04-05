"use client";

import type { User } from "@coordinize/database/db";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@coordinize/ui/components/form";
import { Input } from "@coordinize/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ProfileProps {
  user: User;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
});

export function Profile({ user }: ProfileProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <>
      {user.image && <Image src={user.image} alt={user.name} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex justify-between">
                <FormLabel className="font-normal">Preferred Name</FormLabel>
                <FormControl>
                  <Input {...field} className="w-fit" />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
