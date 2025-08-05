'use client';

import { Button } from '@coordinize/ui/components/button';
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from '@coordinize/ui/components/emoji-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@coordinize/ui/components/form';
import { Input } from '@coordinize/ui/components/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@coordinize/ui/components/popover';
import { toast } from '@coordinize/ui/components/sonner';
import { Textarea } from '@coordinize/ui/components/textarea';
import { Icons } from '@coordinize/ui/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAutoSaveForm } from '@/components/forms/auto-save-form';
import { SettingsCard } from '@/components/settings/settings-card';
import { useTRPC } from '@/trpc/client';

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  identifier: z
    .string()
    .min(3, { message: 'Identifier must be at least 3 characters.' }),
  about: z.string().optional(),
  icon: z.string().optional(),
});

export function SpaceDetailsForm({ identifier }: { identifier: string }) {
  const trpc = useTRPC();

  const { data: space } = useQuery(
    trpc.space.getById.queryOptions({ id: identifier })
  );

  const initialValues = useMemo(
    () => ({
      id: space?.id || '',
      name: space?.name || '',
      identifier: space?.identifier || '',
      about: space?.about || '',
      icon: space?.icon || '',
    }),
    [space?.id, space?.name, space?.identifier, space?.about, space?.icon]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (space) {
      form.reset({
        id: space.id,
        name: space.name || '',
        identifier: space.identifier || '',
        about: space.about || '',
        icon: space.icon || '',
      });
    }
  }, [space, form]);

  const { mutate: updateSpace } = useMutation(
    trpc.space.update.mutationOptions({
      onError: () => {
        toast.error('Something went wrong!');
      },
      onSuccess: () => {
        toast.success('Space updated.');
      },
    })
  );

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      updateSpace(values);
    },
    [updateSpace]
  );

  const { handleFieldBlur } = useAutoSaveForm({
    form,
    initialValues,
    onSubmit,
  });

  if (!space) {
    return <div className="text-ui-gray-900">Loading...</div>;
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <SettingsCard
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
          description="Choose an emoji to represent your space."
          title="Space Icon"
        >
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className="shadow-none"
                        onBlur={() => handleFieldBlur('icon')}
                        size={'icon'}
                        type="button"
                        variant="outline"
                      >
                        {field.value || <Icons.emojiPlus className="h-5 w-5" />}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-fit p-0">
                      <EmojiPicker
                        className="h-[342px]"
                        onEmojiSelect={({ emoji }) => {
                          field.onChange(emoji);
                          // Trigger blur after emoji selection
                          setTimeout(() => handleFieldBlur('icon'), 100);
                        }}
                      >
                        <EmojiPickerSearch />
                        <EmojiPickerContent />
                      </EmojiPicker>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>

        <SettingsCard
          className="flex-col items-start lg:flex-row lg:items-center lg:justify-between"
          description="Spaces are dedicated areas within a workspace where team members can collaborate and share posts."
          title="Space Name"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Input
                    {...field}
                    className={`w-full shadow-none ${
                      form.getValues('name') ? 'bg-input' : ''
                    }`}
                    onBlur={() => handleFieldBlur('name')}
                    placeholder="e.g. Engineering"
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
            name="identifier"
            render={({ field }) => (
              <FormItem className="w-full md:w-96">
                <FormControl>
                  <Input
                    {...field}
                    className={`w-full shadow-none ${
                      form.getValues('identifier') ? 'bg-input' : ''
                    }`}
                    onBlur={() => handleFieldBlur('identifier')}
                    placeholder="e.g. ENG"
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
                    className={`shadow-none ${
                      form.getValues('about') ? 'bg-input' : ''
                    }`}
                    onBlur={() => handleFieldBlur('about')}
                    placeholder="Write something about..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </SettingsCard>
      </form>
    </Form>
  );
}
