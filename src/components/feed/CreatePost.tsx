"use client";

import { useState, useMemo } from "react";
import { useCreatePost } from "@/hooks/useCreatePost";
import ImageUploader from "./ImageUploader";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const createPost = useCreatePost();
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  const handleSubmit = () => {
    if (!image) return;

    createPost.mutate(
      {
        image,
        caption,
      },
      {
        onSuccess: () => {
          setImage(null);
          setCaption("");
          router.back();
        },
      },
    );
  };

  const preview = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  return (
    <section className="flex min-h-94.25 w-90.25 flex-col gap-6 lg:min-h-111.25 lg:w-113">
      <div className="min-h-43.5 w-full gap-0.5">
        <p className="text-sm font-bold tracking-[-2%]">
          Photo
          {image && (
            <span className="text-primary-200">
              {" "}
              ( Click it to change the Photo )
            </span>
          )}
        </p>
        {!image && <ImageUploader onFile={setImage} />}

        {image && (
          <button
            onClick={() => setImage(null)}
            className="rounded-md bg-black/60"
          >
            <img src={preview!} className="rounded-xl" />
          </button>
        )}
      </div>
      <div className="flex h-32.75 w-full flex-col gap-0.5">
        <label htmlFor="caption" className="text-sm font-bold tracking-[-2%]">
          Caption
        </label>
        <textarea
          id="caption"
          value={caption}
          required
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Create your caption"
          className="h-25.25 w-full rounded-xl border p-2"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-primary-300 h-10 w-full rounded-[100px] p-2 text-sm font-bold tracking-[-1%]"
      >
        Share
      </button>
    </section>
  );
}
