'use client';

import { toast } from '@coordinize/ui/components/sonner';
import { useCallback } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface UseAutoSaveFormOptions<T extends FieldValues> {
  form: UseFormReturn<T>;
  initialValues: T;
  onSubmit: (values: T) => void;
}

export function useAutoSaveForm<T extends FieldValues>({
  form,
  initialValues,
  onSubmit,
}: UseAutoSaveFormOptions<T>) {
  const handleFieldBlur = useCallback(
    async (fieldName: Path<T>) => {
      const isValid = await form.trigger(fieldName);
      if (!isValid) {
        const error = form.getFieldState(fieldName).error;
        if (error?.message) {
          toast.error(error.message);
        }
        return;
      }

      const currentValue = form.getValues(fieldName);
      const initialValue = initialValues[fieldName];

      if (currentValue !== initialValue) {
        form.handleSubmit(onSubmit)();
      }
    },
    [form, initialValues, onSubmit]
  );

  return { handleFieldBlur };
}
