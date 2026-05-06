"use client";

import { ImageUp, Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldDescription, FieldLabel } from "@/components/ui/field";

export default function CloudinaryUpload() {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setError("Add Cloudinary cloud name and unsigned upload preset env vars.");
      return;
    }

    setIsUploading(true);
    setError("");

    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body,
        },
      );
      const result = (await response.json()) as { secure_url?: string; error?: { message?: string } };

      if (!response.ok || !result.secure_url) {
        throw new Error(result.error?.message ?? "Upload failed.");
      }

      setImageUrl(result.secure_url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Could not upload the image.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <FieldLabel htmlFor="photo">Book Photo</FieldLabel>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="sm:flex-1"
        />
        <Button type="button" variant="outline" disabled={isUploading}>
          {isUploading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ImageUp />
          )}
          {isUploading ? "Uploading" : "Cloudinary"}
        </Button>
      </div>
      <Input
        name="imageUrl"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
        placeholder="Or paste an image URL"
        required
      />
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Uploaded book"
          className="h-40 w-full rounded-lg border object-cover"
        />
      ) : null}
      {error ? (
        <FieldDescription className="text-destructive">{error}</FieldDescription>
      ) : (
        <FieldDescription>
          Uses an unsigned Cloudinary upload preset for browser uploads.
        </FieldDescription>
      )}
    </div>
  );
}
