"use client";
import CreatePost from "@/components/feed/CreatePost";
import { useRouter } from "next/navigation";
export default function newPost() {
  const router = useRouter();
  return (
    <section className="flex min-h-94.25 w-full flex-col lg:min-h-111.25 lg:w-113">
      <div className="flex gap-2 lg:gap-3">
        <button className="flex size-6 cursor-pointer items-center justify-center rounded-full lg:size-8">
          <img
            src="/assets/icon-ArrowLeft.svg"
            alt="Back"
            onClick={() => router.back()}
            className="size-3.5 lg:size-[18.67px]"
          />
        </button>
        <p className="text-md lg:text-display-xs flex items-center font-bold tracking-[-2%] lg:tracking-normal">
          Add Post
        </p>
      </div>
      <div className="flex w-full justify-center">
        <CreatePost />
      </div>
    </section>
  );
}
