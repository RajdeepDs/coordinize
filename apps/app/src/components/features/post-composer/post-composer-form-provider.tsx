import {
  type PostSchema,
  postDefaultValues,
  postSchema,
} from "@coordinize/api/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocalStoragePost } from "@/hooks/use-local-storage-post";

export type PostComposerFormRef = {
  isDirty: boolean;
  reset: () => void;
  clearLocalStorage: () => void;
  getValues: () => PostSchema;
};

export const PostComposerFormProvider = forwardRef<
  PostComposerFormRef,
  React.PropsWithChildren
>(function PostComposerFormProviderComponent({ children }, ref) {
  const { loadFromLocalStorage, saveToLocalStorage, clearLocalStorage } =
    useLocalStoragePost();

  // Try to load from localStorage, fallback to default values
  const getInitialValues = (): PostSchema => {
    const savedData = loadFromLocalStorage();
    return savedData || postDefaultValues;
  };

  const methods = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: getInitialValues(),
  });

  const isDirty = methods.formState.isDirty;

  // Auto-save to localStorage when form values change
  useEffect(() => {
    const subscription = methods.watch((value) => {
      const hasContent = value.title?.trim() || value.description?.trim();

      if (hasContent) {
        saveToLocalStorage(value as PostSchema);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods, saveToLocalStorage]);

  useEffect(() => {
    const originalReset = methods.reset;
    methods.reset = (...args) => {
      clearLocalStorage();
      return originalReset(...args);
    };
  }, [methods, clearLocalStorage]);

  useImperativeHandle(
    ref,
    () => ({
      isDirty,
      clearLocalStorage,
      getValues: () => methods.getValues(),
      reset: () => {
        methods.reset();
        clearLocalStorage();
      },
    }),
    [isDirty, clearLocalStorage, methods.reset, methods.getValues]
  );

  return <FormProvider {...methods}>{children}</FormProvider>;
});
