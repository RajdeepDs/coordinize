"use client";

import { ImagePlus, Loader2, X } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../lib/utils";

interface AvatarUploadFieldProps {
  name: string;
  onUpload: (file: File) => Promise<string>;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AvatarUploadField({
  name,
  onUpload,
  className,
  size = "md",
}: AvatarUploadFieldProps) {
  const { setValue, watch } = useFormContext();
  const currentValue = watch(name);

  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      setIsUploading(true);
      const url = await onUpload(file);
      setValue(name, url, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setValue(name, "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-lg border-2 bg-muted transition-colors",
          sizeClasses[size],
          isDragging && "border-primary bg-primary/10",
        )}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {currentValue ? (
          <img
            src={currentValue}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImagePlus className="size-5" />
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {currentValue && !isUploading && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeImage();
            }}
            className="absolute top-0 right-0 m-1 rounded-full bg-background p-1 shadow-md hover:bg-muted"
          >
            <X className="h-4 w-4 text-red-500" />
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
