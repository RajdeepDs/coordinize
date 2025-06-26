'use client';

import { Button } from '@coordinize/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@coordinize/ui/components/form';
import { Input } from '@coordinize/ui/components/input';
import { toast } from '@coordinize/ui/components/sonner';
import { Textarea } from '@coordinize/ui/components/textarea';
import { Icons } from '@coordinize/ui/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SettingsCard } from '@/components/settings/settings-card';
import { useTRPC } from '@/trpc/client';

const formSchema = z.object({
  spaceName: z.string().min(3, 'Space name must be at least 3 characters.'),
  spaceIdentifier: z
    .string()
    .min(3, 'Space identifier must be at least 3 characters'),
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
      spaceName: '',
      spaceIdentifier: '',
      about: '',
    },
  });

  const spaceName = form.watch('spaceName');

  useEffect(() => {
    const generated = generateIdentifier(spaceName || '');
    form.setValue('spaceIdentifier', generated);
  }, [spaceName, form]);

  const { mutate, isPending } = useMutation(
    trpc.space.create.mutationOptions({
      onSuccess: ({ workspaceSlug }) => {
        toast.success('Space created successfully.');
        const spacesSettingsPath = `/${workspaceSlug}/settings/spaces`;

        router.push(`${spacesSettingsPath}`);
      },
      onError: () => {
        toast.error('Something went wrong.');
      },
      onSettled: () => {
        form.reset();
      },
    })
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
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
          description="Spaces are dedicated areas within a workspace where team members can collaborate and share posts."
          title="Space Name"
        >
          <FormField
            control={form.control}
            name="spaceName"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Input
                    {...field}
                    className="w-full shadow-none"
                    placeholder="e.g. Engineering"
                    required
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <SettingsCard
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
          description="Used to identify this space. (e.g. ENG)"
          title="Identifier"
        >
          <FormField
            control={form.control}
            name="spaceIdentifier"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Input
                    {...field}
                    className="w-full shadow-none"
                    placeholder="e.g. ENG"
                    required
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <SettingsCard
          className="flex-col items-start lg:flex-row lg:justify-between"
          description="A brief description about this space and its purpose."
          title="About"
        >
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Textarea
                    {...field}
                    className="shadow-none"
                    placeholder="Write something about..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
        <Button
          className="ml-auto flex min-w-[120px] font-normal"
          disabled={isPending}
          size="sm"
          type="submit"
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
