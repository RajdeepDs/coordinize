'use client';

import { toast } from '@coordinize/ui/components/sonner';
import { Form, FormControl, FormField, FormItem } from '@coordinize/ui/form';
import { Input } from '@coordinize/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useForm, useFormState } from 'react-hook-form';
import { z } from 'zod';
import { updateProfileAction } from '@/actions/update-user-action';

const formSchema = z.object({
  preferredName: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' }),
});

interface PreferredNameFormProps {
  name: string;
}

export function PreferredNameForm({ name }: PreferredNameFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { preferredName: name ?? '' },
  });

  const { execute } = useAction(updateProfileAction, {
    onError: () => {
      toast.error('Something went wrong.');
    },
    onSuccess: () => {
      toast.success('Your preferred name has been updated.');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute({ ...values });
  }

  const { isDirty } = useFormState({ control: form.control });

  return (
    <Form {...form}>
      <form className="w-full sm:w-auto" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="preferredName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className={name && 'bg-muted'}
                  onBlur={async () => {
                    field.onBlur();
                    const isValid = await form.trigger('preferredName');
                    if (!isValid) {
                      const error = form.getFieldState('preferredName').error;
                      if (error?.message) {
                        toast.error(error.message);
                      }
                      return;
                    }
                    if (isDirty) {
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  placeholder="Enter your name"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
