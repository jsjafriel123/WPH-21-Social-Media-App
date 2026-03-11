"use client";

import { useRef } from "react";

export default function ImageUploader({
  onFile,
}: {
  onFile: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
      className="text-muted-foreground hover:bg-muted/40 flex h-36 cursor-pointer items-center justify-center rounded-xl border border-dashed text-sm"
    >
      <div className="gap-lg flex size-full flex-col items-center justify-center">
        <img
          src="/assets/icon-Upload.svg"
          alt="Upload photo"
          className="size-10"
        />
        <div className="gap-xs flex flex-col items-center">
          <div>
            <button className="text-primary-200 cursor-pointer bg-transparent text-sm font-bold tracking-[-2%]">
              Click to upload
            </button>{" "}
            <span className="text-sm font-semibold tracking-[-2%] text-neutral-600">
              or drag and drop
            </span>
          </div>
          <p className="text-sm font-semibold tracking-[-2%] text-neutral-600">
            PNG or JPG (max. 5mb)
          </p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </div>
  );
}
