"use client";

import { ImagePlus, X } from "lucide-react";
import React from "react";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../lib/utils";

interface AvatarUploadFieldProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AvatarUploadField({
  name,
  className,
  size = "md",
}: AvatarUploadFieldProps) {
  const { setValue, watch } = useFormContext();
  const currentUrl = watch(name);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected?.type.startsWith("image/")) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    setValue(name, "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // This stores file temporarily in form state for use on submit
  React.useEffect(() => {
    setValue(`${name}File`, file);
  }, [file, name, setValue]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-lg border-2 bg-muted transition-colors",
          sizeClasses[size],
        )}
        onClick={handleClick}
      >
        {preview || currentUrl ? (
          <img
            src={preview || currentUrl}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImagePlus className="size-5" />
          </div>
        )}

        {(preview || currentUrl) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeImage();
            }}
            className="absolute top-0 right-0 m-1 rounded-full bg-background p-0.5 shadow-md hover:bg-muted"
          >
            <X className="size-3 text-red-500" />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
