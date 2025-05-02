"use client";

import { CircleUserRoundIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

import { useFileUpload } from "../hooks/use-file-upload";
import { Button } from "./button";

interface AvatarUploaderProps {
  onChange: (file: File | null) => void;
  previewUrl?: string;
}

export default function AvatarUploader({
  onChange,
  previewUrl,
}: AvatarUploaderProps) {
  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({ accept: "image/*" });

  useEffect(() => {
    if (files[0]?.file) {
      onChange(files[0].file as File);
    }
  }, [files, onChange]);

  const showPreview = files[0]?.preview || previewUrl || null;

  const handleRemove = () => {
    if (files[0]?.id) removeFile(files[0].id);
    onChange(null);
  };

  return (
    <div className=" flex w-fit flex-col gap-2">
      <div className="group relative inline-flex">
        <div
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="button"
          tabIndex={0}
          className="relative flex size-16 items-center justify-center overflow-hidden rounded-lg border border-input border-dashed transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-[input:focus]:border-ring has-[img]:border-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          aria-label={showPreview ? "Change image" : "Upload image"}
        >
          {showPreview ? (
            <img
              src={showPreview}
              alt="Avatar preview"
              width={64}
              height={64}
              className="size-full object-cover"
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-4 opacity-60" />
            </div>
          )}
        </div>

        {showPreview && (
          <Button
            onClick={handleRemove}
            size="icon"
            type="button"
            className="-top-1 -right-1 absolute size-6 rounded-full border-2 border-background opacity-0 shadow-none transition-opacity duration-150 ease-in-out focus-visible:border-background group-hover:opacity-100"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}

        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  );
}
